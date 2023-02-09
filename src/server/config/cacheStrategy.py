# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
from __future__ import annotations
__copyright__ = "Copyright (c) 2023 https://github.com/reAudioPlayer"

from typing import Optional, TYPE_CHECKING
import asyncio

from player.playerPlaylist import PlayerPlaylist
from dataModel.song import Song
from helper.singleton import Singleton
from helper.songCache import SongCache
from downloader.downloader import Downloader
from config.runtime import CacheStrategy

if TYPE_CHECKING:
    from player.player import Player


class ICacheStrategy(metaclass = Singleton):
    """ICacheStrategy"""
    __slots__ = ("_playlist", "_downloader", "_player")
    _STRATEGY: CacheStrategy = CacheStrategy.None_
    _INSTANCE: Optional[ICacheStrategy] = None

    def __init__(self, player: Player) -> None:
        self._playlist: Optional[PlayerPlaylist] = None
        self._downloader = Downloader()
        self._player = player

    @classmethod
    async def get(cls, strategy: CacheStrategy, player: Player) -> ICacheStrategy:
        """get the cache strategy"""
        if cls._STRATEGY == strategy:
            assert cls._INSTANCE is not None
            return cls._INSTANCE

        if strategy == CacheStrategy.All:
            cls._STRATEGY = CacheStrategy.All
            cls._INSTANCE = CacheAllStrategy(player)
        elif strategy == CacheStrategy.Playlist:
            cls._STRATEGY = CacheStrategy.Playlist
            cls._INSTANCE = CachePlaylistStrategy(player)
        elif strategy == CacheStrategy.Current:
            cls._STRATEGY = CacheStrategy.Current
            cls._INSTANCE = CacheCurrentStrategy(player)
        elif strategy == CacheStrategy.CurrentNext:
            cls._STRATEGY = CacheStrategy.CurrentNext
            cls._INSTANCE = CacheCurrentNextStrategy(player)
        else:
            raise NotImplementedError("CacheStrategy not implemented")

        asyncio.create_task(cls._INSTANCE.onStrategyLoad())
        return cls._INSTANCE


    async def onSongLoad(self, song: Song) -> None:
        """on song change"""

    async def onPlaylistLoad(self, playlist: PlayerPlaylist) -> None:
        """on playlist change"""
        self._playlist = playlist

    async def onStrategyLoad(self) -> None:
        """on strategy change"""
        self._playlist = self._player.currentPlaylist


class CacheAllStrategy(ICacheStrategy, metaclass = Singleton):
    """CacheAllStrategy"""
    async def onStrategyLoad(self) -> None:
        await super().onStrategyLoad()
        async def _task() -> None:
            for playlist in self._player.playlistManager.playlists:
                for song in playlist:
                    await self._downloader.downloadSong(song)
        asyncio.create_task(_task())


class CachePlaylistStrategy(ICacheStrategy, metaclass = Singleton):
    """CachePlaylistStrategy"""
    async def onPlaylistLoad(self, playlist: PlayerPlaylist) -> None:
        await super().onPlaylistLoad(playlist)
        assert self._playlist is not None
        SongCache.prune(self._playlist)
        async def _task() -> None:
            for song in self._playlist:
                await self._downloader.downloadSong(song)
        asyncio.create_task(_task())


class CacheCurrentStrategy(ICacheStrategy, metaclass = Singleton):
    """CacheCurrentStrategy"""
    async def onSongLoad(self, song: Song) -> None:
        SongCache.prune([song])


class CacheCurrentNextStrategy(ICacheStrategy, metaclass = Singleton):
    """CacheCurrentNextStrategy"""
    async def onSongLoad(self, song: Song) -> None:
        assert self._playlist is not None
        currentSong, nextSong = song, self._playlist.next(True)
        SongCache.prune([currentSong, nextSong])
        await self._downloader.downloadSong(nextSong)
