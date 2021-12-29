from __future__ import annotations

from typing import List, Tuple
import json


class Playlist:
    def __init__(self,
                 name: str,
                 songs: List[int],
                 id: int,
                 description: str) -> None:
        self._name = name
        self._description = description
        self._songs = songs
        self._id = id

    def sql(self) -> Tuple:
        return ( self._name,
                 self._description,
                 json.dumps(self._songs) )

    @staticmethod
    def FromSql(row: Tuple) -> Playlist:
        id, name, description, songs = row
        return Playlist(name, json.loads(songs), id, description)

    def __repr__(self) -> str:
        return f"(DataModel.Playlist) id=[{self._id}] name=[{self._name}] songs={self._songs} description=[{self._description}]"

    @property
    def songs(self) -> List[int]:
        return self._songs

    @property
    def id(self) -> int:
        return self._id

    @property
    def name(self) -> str:
        return self._name

    @property
    def description(self) -> str:
        return self._description
