from __future__ import annotations

from typing import Tuple


class Song:
    def __init__(self,
                 name,
                 artist,
                 spotify = None,
                 source = None,
                 id = None) -> None:
        self._id = id
        self._name = name
        self._artist = artist
        self._spotify = spotify
        self._source = source

    def sql(self) -> Tuple:
        return ( self._name,
                 self._artist,
                 self._spotify,
                 self._source )

    @staticmethod
    def FromSql(row: Tuple) -> Song:
        id, name, artist, spotify, source = row
        return Song(name, artist, spotify, source, id)

    def __repr__(self) -> str:
        return f"(DataModel.Song) id=[{self._id}] name=[{self._name}] artist=[{self._artist}] spotify=[{self._spotify}] source=[{self._source}]"
