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

from db.dbManager import DbManager

from player.playerPlaylist import PlayerPlaylist
from player.playlistManager import PlaylistManager

from downloader.downloader import Downloader

if TYPE_CHECKING:
    from config.runtime import CacheStrategy



class Player(metaclass = Singleton): # pylint: disable=too-many-instance-attributes
    """Player"""
    __slots__ = (
        "_dbManager",
        "_config",
        "_playlistManager",
        "_downloader",
        "_playerPlaylist",
        "_song",
        "_preloaded",
        "_shuffle",
        "_logger",
        "_playlistChangeCallback",
        "_songChangeCallback",
        "_strategy",
        "_incrementPlayCountTask"
    )
    _INSTANCE: Optional[Player] = None

    def __init__(self,
                 dbManager: DbManager,
                 downloader: Downloader,
                 playlistManager: PlaylistManager) -> None:
        self._dbManager = dbManager
        self._playlistManager = playlistManager
        self._downloader = downloader
        self._playerPlaylist: Optional[PlayerPlaylist] = None
        self._song: Optional[Song] = None
        self._preloaded: Optional[str] = None
        self._logger = logging.getLogger("player")
        self._shuffle = False

        self._playlistChangeCallback: Optional[Callable[[PlayerPlaylist], Awaitable[None]]] = None
        self._songChangeCallback: Optional[Callable[[Song], Awaitable[None]]] = None
        Player._INSTANCE = self # pylint: disable=protected-access
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

    async def _onPlaylistChange(self, playlist: PlayerPlaylist) -> None:
        if self._strategy:
            await self._strategy.onPlaylistLoad(playlist)
        if self._playlistChangeCallback:
            await self._playlistChangeCallback(playlist) # pylint: disable=not-callable

    async def _onSongChange(self, newSong: Song) -> None:
        if self._strategy:
            await self._strategy.onSongLoad(newSong)
        if self._songChangeCallback:
            await self._songChangeCallback(newSong) # pylint: disable=not-callable

        if self._incrementPlayCountTask:
            self._incrementPlayCountTask.cancel()

        async def _incrementPlayCount() -> None:
            await asyncio.sleep(30)
            newSong.ensureMetadata.plays += 1
            self._dbManager.updateMeta(newSong.ensureMetadata)
        self._incrementPlayCountTask = asyncio.create_task(_incrementPlayCount())


    async def loadPlaylist(self,
                           playlist: Optional[PlayerPlaylist],
                           atIndex: Optional[int] = None) -> bool:
        """loads a playlist"""
        self._logger.debug("loadPlaylist [%s] (at %d)", playlist, atIndex)
        if not playlist:
            return False
        if self._playerPlaylist and self._playerPlaylist == playlist:
            return False
        self._playerPlaylist = playlist
        await self._onPlaylistChange(self._playerPlaylist)
        if atIndex is not None:
            await self.at(atIndex)
        else:
            await self.next()
        return True

    async def unload(self) -> None:
        """unload and unbind song file"""
        if not self._playerPlaylist:
            return
        current = self._playerPlaylist.current()
        cId = current.id if current else 0
        self._logger.debug("unload %d", cId)

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

    async def at(self, index: int) -> bool:
        """play at"""
        if not self._playerPlaylist:
            return False
        if index < 0 or index >= len(self._playerPlaylist):
            return False
        if index == self._playerPlaylist.cursor:
            return True
        await self.unload()
        await self._preloadSong(self._playerPlaylist.at(index))
        await self._loadSong()
        return True

    async def _preloadSong(self, song: Optional[Song]) -> None:
        if not self._playerPlaylist or not song:
            return
        initial = self._playerPlaylist.cursor
        while not await self._downloader.downloadSong(song):
            self._logger.debug("invalid [%s], preload next", song)
            song = self._playerPlaylist.next()
            assert initial != self._playerPlaylist.cursor, "no valid song"
        self._preloaded = song.source

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

    def updateSongMetadata(self, id_: int, song: Song) -> None:
        """updates the metadata"""
        self._dbManager.updateSongMetadata(id_, song.sqlUpdate())
        self._playlistManager.updateSong(id_, lambda _: song)

    async def _loadSong(self, song: Optional[Song] = None) -> None:
        if not self._playerPlaylist:
            return
        song = song or self._playerPlaylist.current()
        if not song:
            return
        self._logger.debug("load [%s]", song)
        if self._preloaded == song.source:
            self._song = song
            await self._onSongChange(self._song)

    @property
    def currentSong(self) -> Song:
        """currently playing song"""
        return self._song or Song()

    @property
    def currentPlaylist(self) -> PlayerPlaylist:
        """currently loaded playlist"""
        return self._playerPlaylist or PlayerPlaylist(self._dbManager)
