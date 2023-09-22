# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
from __future__ import annotations

__copyright__ = "Copyright (c) 2023 https://github.com/reAudioPlayer"

from typing import Type, Tuple, Optional, List, Any, Dict
import json
from hashids import Hashids  # type: ignore
import aiosqlite
from db.table.table import ITable, IModel
from db.table.iPlaylistModel import IPlaylistModel


hashids = Hashids(salt="reapOne.smartPlaylist", min_length=22)


class SmartPlaylistModel(IModel, IPlaylistModel):
    """smart playlist model"""

    __slots__ = ("_id", "_name", "_description", "_definition", "_cover", "_plays")
    _SQLType = Tuple[int, str, str, str, str, int]
    _SQLInsertType = Tuple[str, str, str, str, int]
    COLUMNS = [
        "id",
        "name",
        "description",
        "cover",
        "definition",
        "plays",
    ]

    def __init__(
        self,
        name: str,
        description: Optional[str] = None,
        cover: Optional[str] = None,
        definition: Optional[str] = None,
        plays: Optional[int] = None,
        id_: Optional[int] = None,
    ) -> None:
        self._id = id_
        self._name = name or ""
        self._description = description or ""
        self._cover = cover or ""
        self._definition = definition or "{}"
        self._plays = plays or 0
        super().__init__()

    @classmethod
    def fromTuple(cls, row: aiosqlite.Row) -> SmartPlaylistModel:
        id_, others = row[0], row[1:]
        return cls(*others, id_)  # type: ignore

    @classmethod
    def empty(cls) -> SmartPlaylistModel:
        return cls("", "", "", "", 0)

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
            self._definition,
            self._plays,
        )

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, SmartPlaylistModel):
            return False
        if self._id != other._id:
            return False
        if self._name != other._name:
            return False
        if self._description != other._description:
            return False
        if self._cover != other._cover:
            return False
        if self._definition != other._definition:
            return False
        if self._plays != other._plays:
            return False
        return True

    @property
    def eq(self) -> str:
        return f"id = {self._id}"

    @property
    def id(self) -> int:
        """return id"""
        assert self._id is not None
        return self._id

    @property
    def name(self) -> str:
        """return name"""
        return self._name

    @name.setter
    def name(self, value: str) -> None:
        if value == self._name:
            return
        self._name = value
        self._fireChanged()

    @property
    def definition(self) -> str:
        """return definition"""
        return self._definition

    @definition.setter
    def definition(self, value: str) -> None:
        if value == self._definition:
            return
        self._definition = value
        self._fireChanged()

    @property
    def definitionDict(self) -> Dict[str, Any]:
        """return artists"""
        try:
            return json.loads(self.definition)  # type: ignore
        except:
            return {}

    @definitionDict.setter
    def definitionDict(self, value: Dict[str, Any]) -> None:
        if value == self.definitionDict:
            return
        self._definition = json.dumps(value)
        self._fireChanged()

    @property
    def plays(self) -> int:
        """return plays"""
        return self._plays

    @plays.setter
    def plays(self, value: int) -> None:
        if value == self._plays:
            return
        self._plays = value
        self._fireChanged()

    @property
    def description(self) -> str:
        """return description"""
        return self._description

    @description.setter
    def description(self, value: str) -> None:
        if value == self._description:
            return
        self._description = value
        self._fireChanged()

    @property
    def cover(self) -> str:
        """return cover"""
        return self._cover

    @cover.setter
    def cover(self, value: str) -> None:
        if value == self._cover:
            return
        self._cover = value
        self._fireChanged()

    @property
    def url(self) -> str:
        """return url"""
        return f"/playlist/smart/{hashids.encode(self.id)}"

    def toDict(self) -> Dict[str, Any]:
        """return dict"""
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "cover": self.cover,
            "definition": self.definitionDict,
            "plays": self.plays,
            "href": self.url,
        }


class SmartPlaylistTable(ITable[SmartPlaylistModel]):
    """Songs table"""

    NAME = "SmartPlaylists"
    DESCRIPTION = """
                  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                  name TEXT,
                  description TEXT,
                  cover TEXT,
                  definition TEXT,
                  plays INTEGER
                  """

    def _model(self) -> Type[SmartPlaylistModel]:
        return SmartPlaylistModel

    async def byId(self, id_: int) -> Optional[SmartPlaylistModel]:
        """get playlist by id"""
        return await self.selectOne(append=f"WHERE id = {id_}")

    async def deleteById(self, id_: int) -> None:
        """delete playlist by id"""
        await self._db.execute(f"DELETE FROM {self.NAME} WHERE id={id_}")
