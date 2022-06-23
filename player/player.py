# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

import os

import asyncio
from asyncio.tasks import Task

from typing import Any, Awaitable, Callable, Optional

import pygame

from dataModel.song import Song
from db.dbManager import DbManager

from player.playerPlaylist import PlayerPlaylist
from player.playlistManager import PlaylistManager

from downloader.downloader import Downloader


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

        self._updatePositionTask: Optional[Task[Any]] = None

        self._songChangeCallback: Optional[Callable[[Song], Awaitable[None]]] = None
        self._playStateChangeCallback: Optional[Callable[[bool], Awaitable[None]]] = None
        self._positionSyncCallback: Optional[Callable[[float], Awaitable[None]]] = None

    async def _updatePosition(self) -> None:
        while True:
            await asyncio.sleep(5)
            if not self._positionSyncCallback:
                continue
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

    async def loadPlaylist(self, playlist: Optional[PlayerPlaylist], atIndex: Optional[int] = None) -> bool:
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
        if not self._playerPlaylist:
            return
        c = self._playerPlaylist.current()
        cId = c.id if c else 0
        print(f"unload {cId}")
        if os.path.exists(f"./_cache/{cId}.mp3"):
            os.remove(f"./_cache/{cId}.mp3")

    async def last(self) -> None:
        if not self._playerPlaylist:
            return
        await self.unload()
        await self._preloadSong(self._playerPlaylist.last())
        await self._loadSong()

    async def next(self) -> None:
        if not self._playerPlaylist:
            return
        await self.unload()

        if self._shuffle:
            _, song = self._playerPlaylist.random()
            await self._preloadSong(song)
            await self._loadSong(song)
            return

        await self._preloadSong(self._playerPlaylist.next())
        await self._loadSong()

    async def onSongEnd(self) -> None:
        if self._loopSong:
            await self._loadSong(self._song)
            return

        await self.next()

    async def at(self, index: int) -> None:
        if not self._playerPlaylist:
            return
        if index == self._playerPlaylist.index:
            self.setPos(0.0)
            return
        await self.unload()
        await self._preloadSong(self._playerPlaylist.at(index))
        await self._loadSong()

    async def _preloadSong(self, song: Optional[Song]) -> None:
        if not self._playerPlaylist or not song:
            return
        initial = self._playerPlaylist.index
        while not (await self._downloader.downloadSong(song.source, str(song.id))):
            print("invalid, preload next")
            song = self._playerPlaylist.next()
            if initial == self._playerPlaylist.index:
                raise Exception("no valid song")
        self._preloaded = song.source
        n = self._playerPlaylist.next(True)
        asyncio.create_task(self._downloader.downloadSong(n.source, str(n.id)))

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

    async def _loadSong(self, song: Optional[Song] = None) -> None:
        if not self._playerPlaylist:
            return
        song = song or self._playerPlaylist.current()
        if not song:
            return
        print(f"load {song.id}")
        if self._preloaded == song.source:
            pygame.mixer.music.load(f"./_cache/{song.id}.mp3")
            sound = pygame.mixer.Sound(f"./_cache/{song.id}.mp3")
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
    def currentSong(self) -> Optional[Song]:
        return self._song

    @property
    def currentPlaylist(self) -> PlayerPlaylist:
        return self._playerPlaylist or PlayerPlaylist(self._dbManager)
