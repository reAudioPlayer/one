from __future__ import annotations
from abc import ABC, abstractmethod
import asyncio
from typing import Any, List, Generic, TypeVar, Tuple, Type, Set, Callable, Coroutine, cast
import aiosqlite


class IModel(ABC):
    __slots__ = ("_onChanged", )
    COLUMNS: List[str] = []

    def __init__(self) -> None:
        self._onChanged: Set[Callable[[IModel], Coroutine[Any, Any, None]]] = set()

    @property
    def onChanged(self) -> Set[Callable[[IModel], Coroutine[Any, Any, None]]]:
        return self._onChanged

    def _fireChanged(self) -> None:
        for callback in self._onChanged:
            asyncio.create_task(callback(self))

    @classmethod
    @abstractmethod
    def fromTuple(cls, row: aiosqlite.Row) -> IModel:
        ...

    @abstractmethod
    def toTuple(self) -> Tuple[Any, ...]:
        ...

    @property
    @abstractmethod
    def insertStatement(self) -> str:
        ...

    @property
    @abstractmethod
    def updateStatement(self) -> str:
        ...

    @property
    @abstractmethod
    def eq(self) -> str:
        ...

    def __repr__(self) -> str:
        return f"{self.__class__.__name__}({', '.join([str(x) for x in self.toTuple()])})"

    def __str__(self) -> str:
        return self.__repr__()


_T = TypeVar("_T", bound=IModel)


class ITable(ABC, Generic[_T]):
    __slots__ = ("_db", )
    NAME = ""
    DESCRIPTION = ""

    def __init__(self, db: aiosqlite.Connection) -> None:
        self._db = db

    @abstractmethod
    def _model(self) -> Type[_T]:
        ...

    def cast(self, row: aiosqlite.Row) -> _T:
        item = self._model().fromTuple(row)
        item.onChanged.add(self.update)
        return cast(_T, item)

    async def all(self) -> List[_T]:
        async with self._db.execute(f"SELECT * FROM {self.NAME}") as cursor:
            return [self.cast(row) for row in await cursor.fetchall()]

    async def insert(self, item: _T) -> None:
        await self._db.execute(f"INSERT INTO {self.NAME} {item.insertStatement}", item.toTuple())
        item.onChanged.add(self.update)

    async def delete(self, item: _T) -> None:
        await self._db.execute(f"DELETE FROM {self.NAME} WHERE {item.eq}")
        item.onChanged.remove(self.update)

    async def update(self, item: IModel) -> None:
        await self._db.execute(f"UPDATE {self.NAME} SET {item.updateStatement} WHERE {item.eq}", item.toTuple())

    async def create(self) -> None:
        await self._db.execute(f"CREATE TABLE IF NOT EXISTS {self.NAME} ({self.DESCRIPTION})")
        await self._alter()

    async def select(self, select: str = "*", append: str = "") -> List[_T]:
        async with self._db.execute(f"SELECT {select} FROM {self.NAME} {append}") as cursor:
            return [self.cast(row) for row in await cursor.fetchall()]

    async def _alter(self) -> None:
        # get columns
        async with self._db.execute(f"PRAGMA table_info({self.NAME})") as cursor:
            columns = [row[1] for row in await cursor.fetchall()]
        # get model columns
        model = self._model()
        modelColumns = [x for x in model.COLUMNS]
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
        await self._db.execute(f"DROP TABLE IF EXISTS {self.NAME}")
