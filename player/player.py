from typing import Awaitable, Callable, Optional
import pygame
from pymitter import EventEmitter
from dataModels.song import Song
from db.dbManager import DbManager
from player.playerPlaylist import PlayerPlaylist
import os
from downloader.downloader import Downloader
from player.playlistManager import PlaylistManager


class Player:
    def __init__(self, ee: EventEmitter, dbManager: DbManager, downloader: Downloader, playlistManager: PlaylistManager) -> None:
        pygame.init()
        pygame.mixer.init()
        self._dbManager = dbManager
        self._playlistManager = playlistManager
        self._playing: bool = False
        self._ee = ee
        self._downloader = downloader
        self._playerPlaylist: Optional[PlayerPlaylist] = None
        self._song: Optional[Song] = None
        self._preloaded: Optional[str] = None

        self._songChangeCallback: Optional[Callable[[Song], Awaitable[None]]] = None

    async def _onSongChange(self, newSong: Song):
        if not self._songChangeCallback:
            return
        await self._songChangeCallback(newSong)

    async def loadPlaylist(self, playlist: PlayerPlaylist) -> None:
        self._playerPlaylist = playlist
        await self.next()

    def playPause(self) -> None:
        if self._playing:
            pygame.mixer.music.pause()
        else:
            pygame.mixer.music.unpause()
        self._playing = not self._playing

    def pause(self) -> None:
        self._playing = False
        pygame.mixer.music.pause()

    def play(self) -> None:
        self._playing = True
        pygame.mixer.music.unpause()

    def unload(self) -> None:
        pygame.mixer.music.unload()
        if os.path.exists("./_cache/upNow.mp3"):
            os.remove("./_cache/upNow.mp3")

    async def last(self) -> None:
        self.unload()
        await self._preloadSong(self._playerPlaylist.last(True))
        await self._loadSong(self._playerPlaylist.last())

    async def next(self) -> None:
        self.unload()
        await self._preloadSong(self._playerPlaylist.next(True))
        await self._loadSong(self._playerPlaylist.next())

    async def at(self, index: int) -> None:
        self.unload()
        await self._preloadSong(self._playerPlaylist.at(index))
        await self._loadSong(self._playerPlaylist.at(index))

    async def _preloadSong(self, song: Song) -> None:
        self._preloaded = song.source
        await self._downloader.downloadSong(song.source)

    def updateSongMetadata(self, id: int, song: Song) -> None:
        #self._playerPlaylist.at(index)._favourite = 1 if favourite else 0
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
            self._playing = True
            await self._onSongChange(self._song)
