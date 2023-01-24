# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

import logging
import os

import asyncio

from typing import Awaitable, Callable, Optional

from config.config import PersistentConfig

from dataModel.song import Song
from db.dbManager import DbManager

from player.playerPlaylist import PlayerPlaylist
from player.playlistManager import PlaylistManager

from downloader.downloader import Downloader


class Player: # pylint: disable=too-many-instance-attributes
    """Player"""
    def __init__(self,
                 dbManager: DbManager,
                 downloader: Downloader,
                 playlistManager: PlaylistManager,
                 config: PersistentConfig) -> None:
        self._dbManager = dbManager
        self._config = config
        self._playlistManager = playlistManager
        self._downloader = downloader
        self._playerPlaylist: Optional[PlayerPlaylist] = None
        self._song: Optional[Song] = None
        self._preloaded: Optional[str] = None
        self._logger = logging.getLogger("player")

        self._playlistChangeCallback: Optional[Callable[[PlayerPlaylist], Awaitable[None]]] = None
        self._songChangeCallback: Optional[Callable[[Song], Awaitable[None]]] = None
        self._playStateChangeCallback: Optional[Callable[[bool], Awaitable[None]]] = None

    async def _onPlaylistChange(self, playlist: PlayerPlaylist) -> None:
        if self._playlistChangeCallback:
            await self._playlistChangeCallback(playlist) # pylint: disable=not-callable

    async def _onSongChange(self, newSong: Song) -> None:
        if self._songChangeCallback:
            await self._songChangeCallback(newSong) # pylint: disable=not-callable

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

        #if self._shuffle:
        #    _, song = self._playerPlaylist.random()
        #    await self._preloadSong(song)
        #    await self._loadSong(song)
        #    return

        await self._preloadSong(self._playerPlaylist.next())
        await self._loadSong()

    async def onSongEnd(self) -> None:
        """on song end event"""
        if self._loopSong:
            await self._loadSong(self._song)
            return

        await self.next()

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
        while not await self._downloader.downloadSong(song.source, str(song.id)):
            self._logger.debug("invalid [%s], preload next", song)
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
