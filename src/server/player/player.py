# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
from __future__ import annotations

__copyright__ = "Copyright (c) 2022 https://github.com/reAudioPlayer"

import logging
import asyncio

from typing import Awaitable, Callable, Optional, TYPE_CHECKING

from config.runtime import Runtime
from config.cacheStrategy import ICacheStrategy

from helper.singleton import Singleton

from dataModel.song import Song

from db.database import Database

from player.iPlayerPlaylist import IPlayerPlaylist
from player.playlistManager import PlaylistManager
from player.playerQueue import PlayerQueue

from downloader.downloader import Downloader

if TYPE_CHECKING:
    from config.runtime import CacheStrategy


class Player(metaclass=Singleton):  # pylint: disable=too-many-instance-attributes
    """Player"""

    __slots__ = (
        "_dbManager",
        "_config",
        "_playlistManager",
        "_downloader",
        "_queue",
        "_song",
        "_preloaded",
        "_shuffle",
        "_logger",
        "_playlistChangeCallback",
        "_songChangeCallback",
        "_queueChangeCallback",
        "_strategy",
        "_incrementPlayCountTask",
    )
    _INSTANCE: Optional[Player] = None

    def __init__(self, downloader: Downloader, playlistManager: PlaylistManager) -> None:
        self._dbManager = Database()
        self._playlistManager = playlistManager
        self._downloader = downloader
        self._queue = PlayerQueue()
        self._song: Optional[Song] = None
        self._preloaded: Optional[str] = None
        self._logger = logging.getLogger("player")
        self._shuffle = False

        self._playlistChangeCallback: Optional[Callable[[IPlayerPlaylist], Awaitable[None]]] = None
        self._songChangeCallback: Optional[Callable[[Song], Awaitable[None]]] = None
        self._queueChangeCallback: Optional[Callable[[PlayerQueue], Awaitable[None]]] = None
        Player._INSTANCE = self  # pylint: disable=protected-access
        self._strategy: Optional[ICacheStrategy] = None
        Runtime.cache.onStrategyChange.add(self._onStrategyChange)
        self._incrementPlayCountTask: Optional[asyncio.Task[None]] = None

    @classmethod
    def getInstance(cls) -> Player:
        """get instance"""
        assert cls._INSTANCE is not None
        return cls._INSTANCE

    async def _onStrategyChange(self, newStrategy: CacheStrategy) -> None:
        self._strategy = ICacheStrategy.get(newStrategy, self)

    async def _onPlaylistChange(self, playlist: IPlayerPlaylist) -> None:
        if self._strategy:
            await self._strategy.onPlaylistLoad(playlist)
        if self._playlistChangeCallback:
            await self._playlistChangeCallback(playlist)  # pylint: disable=not-callable

    async def _onSongChange(self, newSong: Song) -> None:
        if self._strategy:
            await self._strategy.onSongLoad(newSong)
        if self._songChangeCallback:
            await self._songChangeCallback(newSong)  # pylint: disable=not-callable

        if self._incrementPlayCountTask:
            self._incrementPlayCountTask.cancel()

        async def _incrementPlayCount() -> None:
            await asyncio.sleep(30)
            newSong.model.plays += 1

        self._incrementPlayCountTask = asyncio.create_task(_incrementPlayCount())

    async def loadPlaylist(
        self, playlist: Optional[IPlayerPlaylist], atIndex: Optional[int] = None
    ) -> bool:
        """loads a playlist"""
        self._logger.debug("loadPlaylist [%s] (at %s)", playlist, atIndex)
        if not playlist:
            return False
        if self._queue.playlist and self._queue.playlist == playlist:
            if atIndex is not None:
                await self.at(atIndex)
                return True
            return False

        self._queue.load(playlist)
        asyncio.create_task(self._onPlaylistChange(playlist))

        if atIndex is not None:
            await self.at(atIndex)
        else:
            await self.next()
        return True

    async def unload(self) -> None:
        """unload and unbind song file"""
        current = self._queue.current
        cId = current.model.id if current else 0
        self._logger.debug("unload %d", cId)

    async def last(self) -> None:
        """last"""
        await self.unload()
        await self._preloadSong(self._queue.last())
        await self._loadSong()

    async def next(self) -> None:
        """next/skip"""
        await self.unload()

        await self._preloadSong(self._queue.next())
        await self._loadSong()

    async def at(self, index: int) -> bool:
        """play at"""
        if index < 0 or index >= len(self._queue):
            return False
        if index == self._queue.cursor:
            return True
        await self.unload()
        await self._preloadSong(self._queue.at(index))
        self._queue.jumpTo(index)
        await self._loadSong()
        return True

    async def _preloadSong(self, song: Optional[Song]) -> None:
        if not self._queue or not song:
            return
        initial = self._queue.cursor
        while not await self._downloader.downloadSong(song.model):
            self._logger.debug("invalid [%s], preload next", song)
            song = self._queue.next()
            assert initial != self._queue.cursor, "no valid song"
        self._preloaded = song.model.source

    @property
    def playlistManager(self) -> PlaylistManager:
        """playlist manager"""
        return self._playlistManager

    @property
    def shuffle(self) -> bool:
        """shuffle mode"""
        return self._shuffle

    @shuffle.setter
    def shuffle(self, value: bool) -> None:
        self._shuffle = value
        if value:
            self._queue.shuffle()
        else:
            self._queue.unshuffle()

    async def _loadSong(self, song: Optional[Song] = None) -> None:
        song = song or self._queue.current
        if not song:
            return
        self._logger.debug("load src=%s, preloaded=%s", song.model.source, self._preloaded)
        if self._preloaded == song.model.source:
            self._song = song
            await self._onSongChange(self._song)

    @property
    def currentSong(self) -> Optional[Song]:
        """currently playing song"""
        return self._song

    @property
    def currentPlaylist(self) -> Optional[IPlayerPlaylist]:
        """currently loaded playlist"""
        return self._queue.playlist

    @property
    def queue(self) -> PlayerQueue:
        """queue"""
        return self._queue
