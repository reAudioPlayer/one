# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

import os
from os import environ as env

import asyncio
from asyncio.tasks import Task

from typing import Any, Awaitable, Callable, Optional

import pygame

from dataModel.song import Song
from db.dbManager import DbManager

from config.config import PersistentConfig
from player.playerPlaylist import PlayerPlaylist
from player.playlistManager import PlaylistManager

from downloader.downloader import Downloader


class Player:
    """Player"""
    def __init__(self,
                 dbManager: DbManager,
                 downloader: Downloader,
                 playlistManager: PlaylistManager,
                 config: PersistentConfig) -> None:
        pygame.init() # pylint: disable=no-member
        self._dbManager = dbManager
        self._config = config
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

        if not env.get("TEST_MODE"):
            pygame.mixer.init()
            pygame.mixer.music.set_volume(config.volume)

    async def _updatePosition(self) -> None:
        while True:
            await asyncio.sleep(5)
            if self._positionSyncCallback:
                await self._positionSyncCallback(self.position) # pylint: disable=not-callable

    @property
    def volume(self) -> int:
        """volume (0 - 100)"""
        if env.get("TEST_MODE"):
            return 0
        return round(pygame.mixer.music.get_volume() * 100)

    @volume.setter
    def volume(self, value: int) -> None:
        if env.get("TEST_MODE"):
            return
        vol = value / 100
        self._config.volume = vol
        pygame.mixer.music.set_volume(vol)

    @property
    def position(self) -> float:
        """gets the position"""
        if env.get("TEST_MODE"):
            return 0.0
        return pygame.mixer.music.get_pos() / 1000.0 + self._offset

    @position.setter
    def position(self, posInS: float) -> None:
        """sets the position"""
        if env.get("TEST_MODE"):
            return
        self._offset = posInS - (pygame.mixer.music.get_pos() / 1000.0)
        pygame.mixer.music.set_pos(posInS)

    async def _onSongChange(self, newSong: Song) -> None:
        if self._songChangeCallback:
            await self._songChangeCallback(newSong) # pylint: disable=not-callable

    async def _onPlayStateChange(self) -> None:
        if self._playStateChangeCallback:
            await self._playStateChangeCallback(self._playing) # pylint: disable=not-callable

    async def loadPlaylist(self,
                           playlist: Optional[PlayerPlaylist],
                           atIndex: Optional[int] = None) -> bool:
        """loads a playlist"""
        print(playlist, self._playerPlaylist)
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
        """toggle play state"""
        if self._playing:
            pygame.mixer.music.pause()
        else:
            pygame.mixer.music.unpause()
        self._playing = not self._playing
        await self._onPlayStateChange()

    async def pause(self) -> None:
        """pause"""
        self._playing = False
        await self._onPlayStateChange()
        pygame.mixer.music.pause()

    async def play(self) -> None:
        """play"""
        self._playing = True
        await self._onPlayStateChange()
        pygame.mixer.music.unpause()

    async def unload(self) -> None:
        """unload and unbind song file"""
        pygame.mixer.music.unload()
        self._playing = False
        await self._onPlayStateChange()
        if not self._playerPlaylist:
            return
        current = self._playerPlaylist.current()
        cId = current.id if current else 0
        print(f"unload {cId}")
        if os.path.exists(f"./_cache/{cId}.mp3"):
            os.remove(f"./_cache/{cId}.mp3")

    async def last(self) -> None:
        """last"""
        if not self._playerPlaylist:
            return
        await self.unload()
        await self._preloadSong(self._playerPlaylist.last())
        await self._loadSong()

    async def next(self) -> None:
        """next/skip"""
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
        """on song end event"""
        if self._loopSong:
            await self._loadSong(self._song)
            return

        await self.next()

    async def at(self, index: int) -> None:
        """play at"""
        if not self._playerPlaylist:
            return
        if index == self._playerPlaylist.cursor:
            self.position = 0
            return
        await self.unload()
        await self._preloadSong(self._playerPlaylist.at(index))
        await self._loadSong()

    async def _preloadSong(self, song: Optional[Song]) -> None:
        if not self._playerPlaylist or not song:
            return
        initial = self._playerPlaylist.cursor
        while not await self._downloader.downloadSong(song.source, str(song.id)):
            print("invalid, preload next")
            song = self._playerPlaylist.next()
            if initial == self._playerPlaylist.cursor:
                raise Exception("no valid song")
        self._preloaded = song.source
        nextSong = self._playerPlaylist.next(True)
        asyncio.create_task(self._downloader.downloadSong(nextSong.source,
                                                          str(nextSong.id)))

    @property
    def shuffle(self) -> bool:
        """shuffle mode"""
        return self._shuffle

    @shuffle.setter
    def shuffle(self, value: bool) -> None:
        self._shuffle = value

    @property
    def loopSong(self) -> bool:
        """repeat song"""
        return self._loopSong

    @loopSong.setter
    def loopSong(self, value: bool) -> None:
        self._loopSong = value

    def updateSongMetadata(self, id_: int, song: Song) -> None: # TODO why here?
        """updates the metadata"""
        self._dbManager.updateSongMetadata(id_, song.sqlUpdate())
        self._playlistManager.updateSong(id_, lambda _: song)

    async def _loadSong(self, song: Optional[Song] = None) -> None:
        if not self._playerPlaylist:
            return
        song = song or self._playerPlaylist.current()
        if not song:
            return
        print(f"load {song.id}")
        if self._preloaded == song.source:
            self._song = song
            if not env.get("TEST_MODE"):
                pygame.mixer.music.load(f"./_cache/{song.id}.mp3")
                pygame.mixer.music.play()
            sound = pygame.mixer.Sound(f"./_cache/{song.id}.mp3")
            song.duration = int(sound.get_length())
            self._dbManager.updateSongMetadata(song.id, f"duration='{int(song.duration)}'")
            if not self._updatePositionTask:
                self._updatePositionTask = asyncio.create_task(self._updatePosition())
            self._playing = True
            await self._onPlayStateChange()
            await self._onSongChange(self._song)

            self._offset = 0

    @property
    def playing(self) -> bool:
        """play state"""
        return self._playing

    @property
    def currentSong(self) -> Song:
        """currently playing song"""
        return self._song or Song()

    @property
    def currentPlaylist(self) -> PlayerPlaylist:
        """currently loaded playlist"""
        return self._playerPlaylist or PlayerPlaylist(self._dbManager)
