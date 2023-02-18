from __future__ import annotations
from typing import Type, Tuple, Optional, Union, List, Any, Dict
from hashids import Hashids # type: ignore
import aiosqlite
from db.table.table import ITable, IModel


hashids = Hashids(salt="reapOne.track", min_length=22)


class SongModel(IModel):
    __slots__ = ("_id",
                 "_name",
                 "_artist",
                 "_album",
                 "_cover",
                 "_favourite",
                 "_duration",
                 "_source",
                 "_plays",
                 "_spotify")
    _SQLType = Tuple[int, str, str, str, str, int, int, str, str, int]
    _SQLInsertType = Tuple[str, str, str, str, int, int, str, str, int]
    COLUMNS = ["id",
               "name",
               "artist",
               "album",
               "cover",
               "favourite",
               "duration",
               "spotify",
               "source",
               "plays",
               ]

    def __init__(self,
                 name: str,
                 artist: str,
                 album: str,
                 cover: str,
                 favourite: Union[bool, int],
                 duration: int,
                 spotify: str,
                 source: str,
                 plays: int,
                 id_: Optional[int] = None) -> None:
        self._id = id_
        self._name = name or ""
        self._artist = artist or ""
        self._album = album or ""
        self._cover = cover or ""
        self._favourite = int(favourite)
        self._duration = duration or 0
        self._source = source or ""
        self._plays = plays or 0
        self._spotify = spotify or ""
        super().__init__()

    @classmethod
    def fromTuple(cls, row: aiosqlite.Row) -> SongModel:
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
            self._artist,
            self._album,
            self._cover,
            self._favourite,
            self._duration,
            self._spotify,
            self._source,
            self._plays,
        )

    @property
    def eq(self) -> str:
        return f"id = {self._id}"

    @property
    def id(self) -> int:
        assert self._id is not None
        return self._id

    @property
    def name(self) -> str:
        return self._name

    @name.setter
    def name(self, value: str) -> None:
        if value == self._name:
            return
        self._name = value
        self._fireChanged()

    @property
    def artist(self) -> str:
        return self._artist

    @artist.setter
    def artist(self, value: str) -> None:
        if value == self._artist:
            return
        self._artist = value
        self._fireChanged()

    @property
    def artists(self) -> List[str]:
        return self._artist.split(", ")

    @property
    def album(self) -> str:
        return self._album

    @album.setter
    def album(self, value: str) -> None:
        if value == self._album:
            return
        self._album = value
        self._fireChanged()

    @property
    def cover(self) -> str:
        return self._cover

    @cover.setter
    def cover(self, value: str) -> None:
        if value == self._cover:
            return
        self._cover = value
        self._fireChanged()

    @property
    def favourite(self) -> bool:
        return bool(self._favourite)

    @favourite.setter
    def favourite(self, value: bool) -> None:
        if value == self._favourite:
            return
        self._favourite = int(value)
        self._fireChanged()

    @property
    def duration(self) -> int:
        return self._duration

    @duration.setter
    def duration(self, value: int) -> None:
        if value == self._duration:
            return
        self._duration = value
        self._fireChanged()

    @property
    def source(self) -> str:
        return self._source

    @source.setter
    def source(self, value: str) -> None:
        if value == self._source:
            return
        self._source = value
        self._fireChanged()

    @property
    def plays(self) -> int:
        return self._plays

    @plays.setter
    def plays(self, value: int) -> None:
        if value == self._plays:
            return
        self._plays = value
        self._fireChanged()

    @property
    def spotify(self) -> str:
        return self._spotify

    @spotify.setter
    def spotify(self, value: str) -> None:
        if value == self._spotify:
            return
        self._spotify = value
        self._fireChanged()

    @property
    def url(self) -> str:
        """return url"""
        return f"/track/{hashids.encode(self.id)}"

    def downloadPath(self, forExport: bool = False) -> str:
        """return download path"""
        if forExport:
            return f"{self.id}.dl"
        return str(self.id)

    def toDict(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "name": self.name,
            "title": self.name,
            "artist": self.artist,
            "album": self.album,
            "cover": self.cover,
            "favourite": self.favourite,
            "duration": self.duration,
            "source": self.source,
            "plays": self.plays,
            "spotify": self.spotify,
            "url": self.url
        }


class SongsTable(ITable[SongModel]):
    NAME = "Songs"
    DESCRIPTION = """
                  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                  name TEXT,
                  artist TEXT,
                  album TEXT,
                  cover TEXT,
                  favourite INTEGER,
                  duration INTEGER,
                  source TEXT,
                  plays INTEGER,
                  spotify TEXT
                  """

    def _model(self) -> Type[SongModel]:
        return SongModel

    async def byId(self, id_: int) -> Optional[SongModel]:
        where = f"id = {id_}"
        rows = await self.select(append = f"WHERE {where}")
        if len(rows) != 1:
            return None
        return rows[0]

    async def allByIds(self, ids: List[int]) -> List[SongModel]:
        where = " OR ".join([f"id = {id_}" for id_ in ids])
        return await self.select(append = f"WHERE {where}")

    async def search(self, query: str) -> List[SongModel]:
        """get songs by (non-sql) query (for the search function)"""

        filters = query.split(";")
        filter_ = ""

        def createLike(word: str) -> str:
            return f"(name LIKE '%{word}%' OR artist LIKE '%{word}%' OR album LIKE '%{word}%')"

        ands: List[str] = [ ]
        for x in filters:
            tagAndQuery = x.replace("title", "name").split(":")
            if len(tagAndQuery) == 1:
                ands.extend([ createLike(x) for x in tagAndQuery[0].split(" ") ])
            else:
                ands.append(f"{tagAndQuery[0]} LIKE '%{tagAndQuery[1]}%'")
        filter_ = " AND ".join(ands)
        return await self.select(append = f"WHERE {filter_}")
