# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
from __future__ import annotations
__copyright__ = "Copyright (c) 2023 https://github.com/reAudioPlayer"

from typing import Type, Tuple, Optional, Dict, Any
import aiosqlite
from db.table.table import ITable, IModel


class PlaylistModel(IModel):
    """playlist model"""
    __slots__ = ("_id", "_name", "_songs", "_description", "_cover", "_plays")
    _SQLType = Tuple[int, str, str, str, str, int]
    _SQLInsertType = Tuple[str, str, str, str, int]
    COLUMNS = ["id", "name", "description", "cover", "songs", "plays"]

    def __init__(self,
                 name: str,
                 description: Optional[str] = None,
                 cover: Optional[str] = None,
                 songs: str = "[]",
                 plays: Optional[int] = None,
                 id_: Optional[int] = None) -> None:
        self._id = id_
        self._name = name or ""
        self._songs = songs or "[]"
        self._description = description or ""
        self._cover = cover or ""
        self._plays = plays or 0
        super().__init__()

    @classmethod
    def fromTuple(cls, row: aiosqlite.Row) -> PlaylistModel:
        id_, others = row[0], row[1:]
        return cls(*others, id_) # type: ignore

    @property
    def insertStatement(self) -> str:
        items = [*self.COLUMNS]
        items.remove("id")
        return f"({', '.join(items)}) VALUES ({', '.join(['?' for _ in items])})"

    @property
    def updateStatement(self) -> str:
        items = [*self.COLUMNS]
        items.remove("id")
        return f"{', '.join([f'{item}=?' for item in items])}"

    def toTuple(self) -> _SQLInsertType:
        return (
            self._name,
            self._description,
            self._cover,
            self._songs,
            self._plays
        )

    @property
    def eq(self) -> str:
        return f"id = {self._id}"

    @property
    def name(self) -> str:
        """name of the playlist"""
        return self._name

    @name.setter
    def name(self, name: str) -> None:
        if name == self._name:
            return
        self._name = name
        self._fireChanged()

    @property
    def description(self) -> str:
        """description of the playlist"""
        return self._description

    @description.setter
    def description(self, description: str) -> None:
        if description == self._description:
            return
        self._description = description
        self._fireChanged()

    @property
    def cover(self) -> str:
        """cover of the playlist"""
        return self._cover

    @cover.setter
    def cover(self, cover: str) -> None:
        if cover == self._cover:
            return
        self._cover = cover
        self._fireChanged()

    @property
    def songs(self) -> str:
        """songs of the playlist"""
        return self._songs

    @songs.setter
    def songs(self, songs: str) -> None:
        if songs == self._songs:
            return
        self._songs = songs
        self._fireChanged()

    @property
    def plays(self) -> int:
        """plays of the playlist"""
        return self._plays

    @plays.setter
    def plays(self, plays: int) -> None:
        if plays == self._plays:
            return
        self._plays = plays
        self._fireChanged()

    @property
    def id(self) -> int:
        """id of the playlist"""
        assert self._id is not None
        return self._id

    def toDict(self) -> Dict[str, Any]:
        """return dict"""
        return {
            "id": self._id,
            "name": self._name,
            "description": self._description,
            "cover": self._cover,
            "songs": self._songs,
            "plays": self._plays
        }


class PlaylistsTable(ITable[PlaylistModel]):
    """playlist table"""
    NAME = "Playlists"
    DESCRIPTION = """
                  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                  name TEXT,
                  description TEXT,
                  cover TEXT,
                  songs TEXT,
                  plays INTEGER
                  """

    def _model(self) -> Type[PlaylistModel]:
        return PlaylistModel

    async def byId(self, id_: int) -> Optional[PlaylistModel]:
        """get playlist by id"""
        async with self._db.execute(f"SELECT * FROM {self.NAME} WHERE id=?", str(id_)) as cursor: # pylint: disable=line-too-long
            row = await cursor.fetchone()
            if row is None:
                return None
            return self.cast(row)

    async def deleteById(self, id_: int) -> None:
        """delete playlist by id"""
        await self._db.execute(f"DELETE FROM {self.NAME} WHERE id=?", str(id_))
