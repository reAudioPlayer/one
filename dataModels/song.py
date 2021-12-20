from __future__ import annotations

from typing import Tuple
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

    def sql(self) -> Tuple:
        return ( self._name,
                 self._artist,
                 self._album,
                 self._cover,
                 self._duration,
                 1 if self._favourite else 0,
                 self._spotify,
                 self._source )

    @staticmethod
    def FromSql(row: Tuple) -> Song:
        id, name, artist, album, cover, favourite, duration, spotify, source = row
        return Song(name, artist, spotify, source, id, album, cover, duration, favourite)

    def __repr__(self) -> str:
        return f"(DataModel.Song) id=[{self._id}] name=[{self._name}] artist=[{self._artist}] album=[{self._album}] cover=[{self._cover}] duration=[{self._duration}] favourite=[{self._favourite}] spotify=[{self._spotify}] source=[{self._source}]"

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
            "duration": f"{math.floor(self._duration / 60)}:{self._duration % 60}",
            "cover": self._cover,
            "favourite": self._favourite
        }

    @staticmethod
    def FromDict(data: dict) -> Song:
        return Song(data.get("title"), data.get("artist"), data.get("spotify"), data.get("source"), album = data.get("album"), cover = data.get("cover"), duration = data.get("duration"), favourite = data.get("favourite"))

    @property
    def duration(self) -> int:
        return self._duration

    @duration.setter
    def duration(self, value: int) -> None:
        self._duration = value
