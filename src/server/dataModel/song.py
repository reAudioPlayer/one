# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
from __future__ import annotations
__copyright__ = "Copyright (c) 2022 https://github.com/reAudioPlayer"

from typing import Any, Dict, List, Optional, Tuple
import math
from hashids import Hashids # type: ignore

from pyaddict import JDict

from dataModel.track import ITrack


hashids = Hashids(salt="reapOne.track", min_length=22)


def _castDuration(value: Optional[Any]) -> int:
    if isinstance(value, (float, int)):
        return int(value)
    if not isinstance(value, str):
        return -1
    try:
        return int(value.split(":")[0]) * 60 + int(value.split(":")[1])
    except: # pylint: disable=bare-except
        return -1


class Song(ITrack):
    """song model"""
    __slots__ = ("_id", "_name", "_artist", "_spotify", "_source", "_album", "_cover",
                 "_duration", "_favourite", "_artists", "_title", "_preview" )

    def __init__(self,
                 name: str = "N/A",
                 artist: str = "N/A",
                 spotify: Optional[str] = None,
                 source: Optional[str] = None,
                 id_: int = -1,
                 album: str = "N/A",
                 cover: str = "/assets/img/placeholders/underground.png",
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
        return f"/track/{hashids.encode(self.id)}"

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

    def sqlUpdate(self, keys: Optional[List[str]] = None) -> str:
        """return sql update values"""
        def _toSetter(string: str) -> str:
            return string.replace("'", "''")

        available = [ "name", "artist", "album", "cover", "duration", "favourite", "source" ]

        if not keys:
            keys = available

        for key in keys:
            if key not in available:
                keys.remove(key)

        assert len(keys) > 0, "keys must not be empty"

        query = ""

        if "name" in keys:
            query += f"name='{_toSetter(self._name)}', "
        if "artist" in keys:
            query += f"artist='{_toSetter(self._artist)}', "
        if "album" in keys:
            query += f"album='{_toSetter(self._album)}', "
        if "cover" in keys:
            query += f"cover='{self._cover}', "
        if "duration" in keys:
            query += f"duration={self._duration}, "
        if "favourite" in keys:
            query += f"favourite={1 if self._favourite else 0}, "
        if "source" in keys:
            query += f"source='{self._source}', "

        return query[:-2]

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
        dex = JDict(data)
        return Song(dex.ensure("title", str),
                    dex.ensure("artist", str),
                    dex.ensure("spotify", str),
                    dex.ensure("source", str),
                    album = dex.ensure("album", str),
                    cover = dex.ensure("cover", str),
                    duration = _castDuration(dex.ensure("duration", str)),
                    favourite = dex.ensure("favourite", bool))

    @property
    def duration(self) -> int:
        """return duration"""
        return self._duration

    @duration.setter
    def duration(self, value: int) -> None:
        self._duration = value

    def update(self, newSong: Song) -> Song:
        """update song"""
        self._album = newSong.album
        self._artist = newSong.artist
        self._name = newSong.title
        self._title = newSong.title
        self._duration = newSong.duration
        self._cover = newSong.cover
        self._favourite = newSong.favourite
        self._source = newSong.source
        return self

    def updateFromDict(self, data: Dict[str, Any]) -> Song:
        """update song from dict"""
        if "album" in data:
            self._album = data["album"]
        if "artist" in data:
            self._artist = data["artist"]
        if "title" in data:
            self._name = data["title"]
        if "name" in data:
            self._name = data["name"]
        if "duration" in data:
            self._duration = _castDuration(data["duration"])
        if "cover" in data:
            self._cover = data["cover"]
        if "favourite" in data:
            self._favourite = data["favourite"]
        if "source" in data:
            self._source = data["source"]
        return self
