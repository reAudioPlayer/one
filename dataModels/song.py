from __future__ import annotations

from typing import List, Tuple
import math


class Song:
    def __init__(self,
                 name = "N/A",
                 artist = "N/A",
                 spotify = None,
                 source = None,
                 id = None,
                 album = "N/A",
                 cover = None,
                 duration = "N/A",
                 favourite = False) -> None:
        self._id = id
        self._name = name
        self._artist = artist
        self._spotify = spotify
        self._source = source
        self._album = album
        self._cover = cover
        self._duration = duration or -1
        self._favourite = favourite

        self._artists = artist.split(", ") if artist else None
        self._title = name
        self._preview = None

    @property
    def artists(self) -> List[str]:
        return self._artists

    @property
    def title(self) -> str:
        return self._title

    @property
    def url(self) -> str:
        return f"/track/{self._id}"

    def sql(self) -> Tuple:
        return ( self._name,
                 self._artist,
                 self._album,
                 self._cover,
                 self._duration,
                 1 if self._favourite else 0,
                 self._spotify,
                 self._source )

    def sqlUpdate(self) -> str:
        def toSetter(string: str) -> str:
            return string.replace("'", "''")
        return f"name='{toSetter(self._name)}', artist='{toSetter(self._artist)}', album='{toSetter(self._album)}', cover='{self._cover}', source='{self._source}', duration={self._duration}, favourite={1 if self._favourite else 0}"

    @staticmethod
    def FromSql(row: Tuple) -> Song:
        id, name, artist, album, cover, favourite, duration, spotify, source = row
        return Song(name, artist, spotify, source, id, album, cover, duration, favourite)

    def __repr__(self) -> str:
        return f"(DataModel.Song) id=[{self._id}] name=[{self._name}] artist=[{self._artist}] album=[{self._album}] cover=[{self._cover}] duration=[{self._duration}] favourite=[{self._favourite}] spotify=[{self._spotify}] source=[{self._source}]"

    def __eq__(self, other: Song) -> bool:
        return self._id == other.id

    def __hash__(self) -> int:
        return hash((self._id, self._source, self._album, self._artist, self._name))

    @property
    def source(self) -> str:
        return self._source

    @property
    def id(self) -> int:
        return self._id

    def toDict(self) -> dict:
        return {
            "title": self._name,
            "artist": self._artist,
            "album": self._album,
            "duration": f"{math.floor(self._duration / 60)}:{str(self._duration % 60).zfill(2)}",
            "cover": self._cover,
            "favourite": self._favourite,
            "id": self._id,
            "source": self._source
        }

    @staticmethod
    def FromDict(data: dict) -> Song:
        def castDuration(string: str) -> int:
            try:
                return int(string.split(":")[0]) * 60 + int(string.split(":")[1])
            except:
                return -1
        return Song(data.get("title"), data.get("artist"), data.get("spotify"), data.get("source"), album = data.get("album"), cover = data.get("cover"), duration = castDuration(data.get("duration")), favourite = data.get("favourite"))

    @property
    def duration(self) -> int:
        return self._duration

    @duration.setter
    def duration(self, value: int) -> None:
        self._duration = value

    def update(self, newSong: Song) -> None:
        self._album = newSong._album
        self._artist = newSong._artist
        self._name = newSong._name
        self._duration = newSong._duration
        self._cover = newSong._cover
        self._favourite = newSong._favourite
        self._source = newSong._source
