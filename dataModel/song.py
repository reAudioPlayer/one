# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
from __future__ import annotations
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

from typing import Any, Dict, List, Optional, Tuple
import math

from helper.dictTool import DictEx
from dataModel.track import ITrack


class Song(ITrack):
    def __init__(self,
                 name: str = "N/A",
                 artist: str = "N/A",
                 spotify: Optional[str] = None,
                 source: Optional[str] = None,
                 id: int = -1,
                 album: str = "N/A",
                 cover: str = "/assets/img/music_placeholder.png",
                 duration: int = -1,
                 favourite: bool = False) -> None:
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
        return self._artists or [ ]

    @property
    def title(self) -> str:
        return self._title

    @property
    def cover(self) -> str:
        return self._cover

    @property
    def url(self) -> str:
        return f"/track/{self._id}"

    def sql(self) -> Tuple[str, str, str, str, int, int, Optional[str], Optional[str]]:
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
    def FromSql(row: Tuple[int, str, str, str, str, int, int, str, Optional[str]]) -> Song:
        id, name, artist, album, cover, favourite, duration, spotify, source = row
        return Song(name, artist, spotify, source, id, album, cover, duration, bool(favourite))

    def __repr__(self) -> str:
        return f"(DataModel.Song) id=[{self._id}] name=[{self._name}] artist=[{self._artist}] album=[{self._album}] cover=[{self._cover}] duration=[{self._duration}] favourite=[{self._favourite}] spotify=[{self._spotify}] source=[{self._source}]"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Song):
            return False
        return self._id == other.id

    def __hash__(self) -> int:
        return hash((self._id, self._source, self._album, self._artist, self._name))

    @property
    def source(self) -> Optional[str]:
        return self._source

    @property
    def album(self) -> str:
        return self._album

    @property
    def id(self) -> int:
        return self._id

    def toDict(self) -> Dict[str, Any]:
        return {
            "album": self._album,
            "artist": self._artist,
            "cover": self.cover,
            "duration": f"{math.floor(self._duration / 60)}:{str(self._duration % 60).zfill(2)}",
            "favourite": self._favourite,
            "id": self._id,
            "source": self.source,
            "title": self.title
        }

    @staticmethod
    def FromDict(data: Dict[str, Any]) -> Song:
        def castDuration(string: Optional[Any]) -> int:
            if not isinstance(string, str):
                return -1
            try:
                return int(string.split(":")[0]) * 60 + int(string.split(":")[1])
            except:
                return -1
        ed = DictEx(data)
        return Song(ed.ensureString("title"),
                    ed.ensureString("artist"),
                    ed.ensureString("spotify"),
                    ed.ensureString("source"),
                    album = ed.ensureString("album"),
                    cover = ed.ensureString("cover"),
                    duration = castDuration(ed.ensureInt("duration")),
                    favourite = ed.ensureBool("favourite"))

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
