# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
from __future__ import annotations
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

from typing import Any, Dict, List, Optional, Tuple
import math

from helper.dictTool import DictEx
from dataModel.track import ITrack


class Song(ITrack):
    """song model"""
    def __init__(self,
                 name: str = "N/A",
                 artist: str = "N/A",
                 spotify: Optional[str] = None,
                 source: Optional[str] = None,
                 id_: int = -1,
                 album: str = "N/A",
                 cover: str = "/assets/img/music_placeholder.png",
                 duration: int = -1,
                 favourite: bool = False) -> None:
        self._id = id_
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
        """return artists"""
        return self._artists or [ ]

    @property
    def title(self) -> str:
        """return title"""
        return self._title

    @property
    def cover(self) -> str:
        """return cover"""
        return self._cover

    @property
    def favourite(self) -> bool:
        """return favourite"""
        return self._favourite

    @property
    def url(self) -> str:
        """return url"""
        return f"/track/{self._id}"

    def sql(self) -> Tuple[str, str, str, str, int, int, Optional[str], Optional[str]]:
        """return sql values"""
        return ( self._name,
                 self._artist,
                 self._album,
                 self._cover,
                 self._duration,
                 1 if self._favourite else 0,
                 self._spotify,
                 self._source )

    def sqlUpdate(self) -> str:
        """return sql update values"""
        def _toSetter(string: str) -> str:
            return string.replace("'", "''")
        return f"name='{_toSetter(self._name)}', artist='{_toSetter(self._artist)}', \
album='{_toSetter(self._album)}', cover='{self._cover}', source='{self._source}', \
duration={self._duration}, favourite={1 if self._favourite else 0}"

    @staticmethod
    def fromSql(row: Tuple[int, str, str, str, str, int, int, str, Optional[str]]) -> Song:
        """create song from sql row"""
        id_, name, artist, album, cover, favourite, duration, spotify, source = row
        return Song(name, artist, spotify, source, id_, album, cover, duration, bool(favourite))

    def __repr__(self) -> str:
        return f"(DataModel.Song) id=[{self._id}] name=[{self._name}] artist=[{self._artist}] \
album=[{self._album}] cover=[{self._cover}] duration=[{self._duration}] favourite=[{self._favourite}] \
spotify=[{self._spotify}] source=[{self._source}]"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Song):
            return False
        return self._id == other.id

    def __hash__(self) -> int:
        return hash((self._id, self._source, self._album, self._artist, self._name))

    @property
    def source(self) -> Optional[str]:
        """return source"""
        return self._source

    @property
    def album(self) -> str:
        """return album"""
        return self._album

    @property
    def artist(self) -> str:
        return self._artist

    @property
    def id(self) -> int:
        """return id"""
        return self._id

    def toDict(self) -> Dict[str, Any]:
        """return as dict"""
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
    def fromDict(data: Dict[str, Any]) -> Song:
        """create song from dict"""
        def _castDuration(string: Optional[Any]) -> int:
            if not isinstance(string, str):
                return -1
            try:
                return int(string.split(":")[0]) * 60 + int(string.split(":")[1])
            except: # pylint: disable=bare-except
                return -1
        dex = DictEx(data)
        return Song(dex.ensureString("title"),
                    dex.ensureString("artist"),
                    dex.ensureString("spotify"),
                    dex.ensureString("source"),
                    album = dex.ensureString("album"),
                    cover = dex.ensureString("cover"),
                    duration = _castDuration(dex.ensureString("duration")),
                    favourite = dex.ensureBool("favourite"))

    @property
    def duration(self) -> int:
        """return duration"""
        return self._duration

    @duration.setter
    def duration(self, value: int) -> None:
        self._duration = value

    def update(self, newSong: Song) -> None:
        """update song"""
        self._album = newSong.album
        self._artist = newSong.artist
        self._name = newSong.title
        self._duration = newSong.duration
        self._cover = newSong.cover
        self._favourite = newSong.favourite
        self._source = newSong.source
