# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
from __future__ import annotations
__copyright__ = "Copyright (c) 2023 https://github.com/reAudioPlayer"

from abc import ABC, abstractmethod
import asyncio
from typing import Optional, Any, List, \
                   Generic, TypeVar, Tuple, \
                   Type, Set, Callable, \
                   Coroutine, cast
import aiosqlite


class IModel(ABC):
    """model interface"""
    __slots__ = ("_onChanged", )
    COLUMNS: List[str] = []

    def __init__(self) -> None:
        self._onChanged: Set[Callable[[IModel], Coroutine[Any, Any, None]]] = set()

    @property
    def onChanged(self) -> Set[Callable[[IModel], Coroutine[Any, Any, None]]]:
        """return onChanged"""
        return self._onChanged

    def _fireChanged(self) -> None:
        print("fire", len(self._onChanged))
        for callback in self._onChanged:
            print(callback)
            asyncio.create_task(callback(self))

    @classmethod
    @abstractmethod
    def fromTuple(cls, row: aiosqlite.Row) -> IModel:
        """create model from tuple"""

    @abstractmethod
    def toTuple(self) -> Tuple[Any, ...]:
        """return tuple"""

    @property
    @abstractmethod
    def insertStatement(self) -> str:
        """return insert statement"""

    @property
    @abstractmethod
    def updateStatement(self) -> str:
        """return update statement"""

    @property
    @abstractmethod
    def eq(self) -> str:
        """return eq statement"""

    def __repr__(self) -> str:
        return f"{self.__class__.__name__}({', '.join([str(x) for x in self.toTuple()])})"

    def __str__(self) -> str:
        return self.__repr__()


_T = TypeVar("_T", bound=IModel)


class ITable(ABC, Generic[_T]):
    """table interface"""
    __slots__ = ("_db", "_onChanged")
    NAME = ""
    DESCRIPTION = ""

    def __init__(self, db: aiosqlite.Connection) -> None:
        self._db = db
        self._onChanged: Set[Callable[[_T], Coroutine[Any, Any, None]]] = set()

    @property
    def onChanged(self) -> Set[Callable[[_T], Coroutine[Any, Any, None]]]:
        """return onChanged"""
        return self._onChanged

    def _fireChanged(self, item: _T) -> None:
        for callback in self._onChanged:
            asyncio.create_task(callback(item))

    @abstractmethod
    def _model(self) -> Type[_T]:
        ...

    def cast(self, row: aiosqlite.Row) -> _T:
        """cast row to model"""
        item = self._model().fromTuple(row)
        item.onChanged.add(self.update)
        return cast(_T, item)

    async def all(self) -> List[_T]:
        """get all items"""
        async with self._db.execute(f"SELECT * FROM {self.NAME}") as cursor:
            return [self.cast(row) for row in await cursor.fetchall()]

    async def insert(self, item: _T) -> None:
        """insert item"""
        await self._db.execute(f"INSERT INTO {self.NAME} {item.insertStatement}", item.toTuple())
        item.onChanged.add(self.update)

    async def delete(self, item: _T) -> None:
        """delete item"""
        await self._db.execute(f"DELETE FROM {self.NAME} WHERE {item.eq}")
        item.onChanged.remove(self.update)

    async def update(self, item: IModel) -> None:
        """update item"""
        await self._db.execute(f"UPDATE {self.NAME} SET {item.updateStatement} WHERE {item.eq}",
                               item.toTuple())
        assert isinstance(item, self._model())
        self._fireChanged(item)

    async def create(self) -> None:
        """create table"""
        await self._db.execute(f"CREATE TABLE IF NOT EXISTS {self.NAME} ({self.DESCRIPTION})")
        await self._alter()

    async def select(self, select: str = "*", append: str = "") -> List[_T]:
        """select items"""
        async with self._db.execute(f"SELECT {select} FROM {self.NAME} {append}") as cursor:
            return [self.cast(row) for row in await cursor.fetchall()]

    async def selectOne(self, select: str = "*", append: str = "") -> Optional[_T]:
        """select one item"""
        async with self._db.execute(f"SELECT {select} FROM {self.NAME} {append}") as cursor:
            row = await cursor.fetchone()
            if row is not None:
                return self.cast(row)
            return None

    async def _alter(self) -> None:
        # get columns
        async with self._db.execute(f"PRAGMA table_info({self.NAME})") as cursor:
            columns = [row[1] for row in await cursor.fetchall()]
        # get model columns
        model = self._model()
        modelColumns = model.COLUMNS
        # get columns to add
        toAdd = [x for x in modelColumns if x not in columns]
        toRemove = [x for x in columns if x not in modelColumns]
        # add columns
        for column in toAdd:
            await self._db.execute(f"ALTER TABLE {self.NAME} ADD COLUMN {column} TEXT")
        # remove columns
        for column in toRemove:
            await self._db.execute(f"ALTER TABLE {self.NAME} DROP COLUMN {column}")

    async def drop(self) -> None:
        """drop table"""
        await self._db.execute(f"DROP TABLE IF EXISTS {self.NAME}")
