from typing import Optional
import asyncio
import logging

import aiosqlite

from helper.singleton import Singleton
from db.table.songs import SongsTable
from db.table.playlists import PlaylistsTable
from config.runtime import Runtime


class Database(metaclass=Singleton):
    __slots__ = ("_db", "_songs", "_playlists", "_autoCommit", "_logger")

    def __init__(self) -> None:
        self._db: Optional[aiosqlite.Connection] = None
        self._songs: Optional[SongsTable] = None
        self._playlists: Optional[PlaylistsTable] = None
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
        path = Runtime.args.db
        self._db = await aiosqlite.connect(path)
        self._songs = SongsTable(self._db)
        self._playlists = PlaylistsTable(self._db)

        await asyncio.gather(
            self._songs.create(),
            self._playlists.create(),
        )

        self._autoCommit = asyncio.create_task(self._autoCommitTask())

    async def close(self) -> None:
        assert self._db is not None
        await self._db.close()

    @property
    def songs(self) -> SongsTable:
        assert self._songs is not None
        return self._songs

    @property
    def playlists(self) -> PlaylistsTable:
        assert self._playlists is not None
        return self._playlists
