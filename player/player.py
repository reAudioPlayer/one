from asyncio.tasks import Task
from typing import Awaitable, Callable, Optional
import pygame
from dataModels.song import Song
from db.dbManager import DbManager
from player.playerPlaylist import PlayerPlaylist
import os
from downloader.downloader import Downloader
from player.playlistManager import PlaylistManager
import asyncio


class Player:
    def __init__(self, dbManager: DbManager, downloader: Downloader, playlistManager: PlaylistManager) -> None:
        pygame.init()
        pygame.mixer.init()
        pygame.mixer.music.set_volume(1.0)
        self._dbManager = dbManager
        self._playlistManager = playlistManager
        self._playing: bool = False
        self._loopSong: bool = False
        self._shuffle: bool = False
        self._downloader = downloader
        self._playerPlaylist: Optional[PlayerPlaylist] = None
        self._song: Optional[Song] = None
        self._preloaded: Optional[str] = None
        self._offset: float = 0 # in s

        self._updatePositionTask: Optional[Task] = None

        self._songChangeCallback: Optional[Callable[[Song], Awaitable[None]]] = None
        self._playStateChangeCallback: Optional[Callable[[bool], Awaitable[None]]] = None
        self._positionSyncCallback: Optional[Callable[[float], Awaitable[None]]] = None

    async def _updatePosition(self) -> None:
        while True:
            await asyncio.sleep(5)
            await self._positionSyncCallback(self.getPos())

    def getPos(self) -> float:
        return pygame.mixer.music.get_pos() / 1000.0 + self._offset

    def setPos(self, posInS: float) -> None:
        self._offset = posInS - (pygame.mixer.music.get_pos() / 1000.0)
        pygame.mixer.music.set_pos(posInS)

    async def _onSongChange(self, newSong: Song) -> None:
        if not self._songChangeCallback:
            return
        await self._songChangeCallback(newSong)

    async def _onPlayStateChange(self) -> None:
        if not self._playStateChangeCallback:
            return
        await self._playStateChangeCallback(self._playing)

    async def loadPlaylist(self, playlist: PlayerPlaylist, atIndex: Optional[int] = None) -> bool:
        if not playlist:
            return False
        if self._playerPlaylist and self._playerPlaylist == playlist:
            return False
        self._playerPlaylist = playlist
        if atIndex is not None:
            await self.at(atIndex)
        else:
            await self.next()
        return True

    async def playPause(self) -> None:
        if self._playing:
            pygame.mixer.music.pause()
        else:
            pygame.mixer.music.unpause()
        self._playing = not self._playing
        await self._onPlayStateChange()

    async def pause(self) -> None:
        self._playing = False
        await self._onPlayStateChange()
        pygame.mixer.music.pause()

    async def play(self) -> None:
        self._playing = True
        await self._onPlayStateChange()
        pygame.mixer.music.unpause()

    async def unload(self) -> None:
        pygame.mixer.music.unload()
        self._playing = False
        await self._onPlayStateChange()
        if os.path.exists("./_cache/upNow.mp3"):
            os.remove("./_cache/upNow.mp3")

    async def last(self) -> None:
        await self.unload()
        await self._preloadSong(self._playerPlaylist.last(True))
        await self._loadSong(self._playerPlaylist.last())

    async def next(self) -> None:
        await self.unload()

        if self._shuffle:
            index, song = self._playerPlaylist.random()
            await self._preloadSong(song)
            await self._loadSong(self._playerPlaylist.at(index))
            return

        await self._preloadSong(self._playerPlaylist.next(True))
        await self._loadSong(self._playerPlaylist.next())

    async def onSongEnd(self) -> None:
        if self._loopSong:
            await self._loadSong(self._song)
            return

        await self.next()

    async def at(self, index: int) -> None:
        await self.unload()
        await self._preloadSong(self._playerPlaylist.at(index))
        await self._loadSong(self._playerPlaylist.at(index))

    async def _preloadSong(self, song: Song) -> None:
        self._preloaded = song.source
        await self._downloader.downloadSong(song.source)

    @property
    def shuffle(self) -> bool:
        return self._shuffle

    @shuffle.setter
    def shuffle(self, value: bool) -> None:
        self._shuffle = value

    @property
    def loopSong(self) -> bool:
        return self._loopSong

    @loopSong.setter
    def loopSong(self, value: bool) -> None:
        self._loopSong = value

    def updateSongMetadata(self, id: int, song: Song) -> None:
        self._dbManager.updateSongMetadata(id, song.sqlUpdate())
        self._playlistManager.updateSong(id, lambda x: song)

    async def _loadSong(self, song: Song) -> None:
        if self._preloaded == song.source:
            pygame.mixer.music.load(f"./_cache/upNow.mp3")
            sound = pygame.mixer.Sound(f"./_cache/upNow.mp3")
            self._song = song
            song.duration = int(sound.get_length())
            self._dbManager.updateSongMetadata(song.id, f"duration='{int(song.duration)}'")
            pygame.mixer.music.play()
            if not self._updatePositionTask:
                self._updatePositionTask = asyncio.create_task(self._updatePosition())
            self._playing = True
            await self._onPlayStateChange()
            await self._onSongChange(self._song)

            self._offset = 0

    @property
    def playing(self) -> bool:
        return self._playing

    @property
    def currentSong(self) -> Song:
        return self._song

    @property
    def currentPlaylist(self) -> PlayerPlaylist:
        return self._playerPlaylist
