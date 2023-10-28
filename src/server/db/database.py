# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
from __future__ import annotations
__copyright__ = "Copyright (c) 2023 https://github.com/reAudioPlayer"

from typing import Optional
import asyncio
import logging

import aiosqlite

from helper.singleton import Singleton
from db.table.songs import SongsTable
from db.table.playlists import PlaylistsTable
from db.table.smartPlaylists import SmartPlaylistTable
from db.table.artists import ArtistsTable
from config.runtime import Runtime


class Database(metaclass=Singleton):
    """Database"""
    __slots__ = ("_db",
                 "_songs",
                 "_playlists",
                 "_artists",
                 "_smartPlaylists",
                 "_autoCommit",
                 "_logger")

    def __init__(self) -> None:
        self._db: Optional[aiosqlite.Connection] = None
        self._songs: Optional[SongsTable] = None
        self._playlists: Optional[PlaylistsTable] = None
        self._smartPlaylists: Optional[SmartPlaylistTable] = None
        self._artists: Optional[ArtistsTable] = None
        self._autoCommit: Optional[asyncio.Task[None]] = None
        self._logger = logging.getLogger("Database")

    async def _autoCommitTask(self) -> None:
        assert self._db is not None
        while True:
            await asyncio.sleep(30)
            if self._db.in_transaction:
                self._logger.debug("Committing transaction")
                await self._db.commit()

    async def init(self) -> None:
        """Initialise database"""
        path = Runtime.args.db
        self._db = await aiosqlite.connect(path)
        self._songs = SongsTable(self._db)
        self._playlists = PlaylistsTable(self._db)
        self._artists = ArtistsTable(self._db)
        self._smartPlaylists = SmartPlaylistTable(self._db)

        await asyncio.gather(
            self._songs.create(),
            self._playlists.create(),
            self._artists.create(),
            self._smartPlaylists.create()
        )

        self._autoCommit = asyncio.create_task(self._autoCommitTask())

    async def close(self) -> None:
        """Close database"""
        assert self._db is not None
        await self._db.close()

    @property
    def songs(self) -> SongsTable:
        """Return songs table"""
        assert self._songs is not None
        return self._songs

    @property
    def playlists(self) -> PlaylistsTable:
        """Return playlists table"""
        assert self._playlists is not None
        return self._playlists

    @property
    def artists(self) -> ArtistsTable:
        """Return artists table"""
        assert self._artists is not None
        return self._artists

    @property
    def smartPlaylists(self) -> SmartPlaylistTable:
        """Return smartPlaylists table"""
        assert self._smartPlaylists is not None
        return self._smartPlaylists

    @property
    def ready(self) -> bool:
        """Return if database is ready"""
        if self._db is None:
            return False
        if self._songs is None:
            return False
        if self._playlists is None:
            return False
        if self._artists is None:
            return False
        if self._smartPlaylists is None:
            return False
        return True
