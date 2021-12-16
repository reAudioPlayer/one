from __future__ import annotations

from typing import List, Tuple
import json


class Playlist:
    def __init__(self,
                 name,
                 songs: List) -> None:
        self._name = name
        self._songs = songs

    def sql(self) -> Tuple:
        return ( self._name,
                 json.dumps(self._songs) )

    @staticmethod
    def FromSql(row: Tuple) -> Playlist:
        id, name, songs = row
        return Playlist(name, json.loads(songs))

    def __repr__(self) -> str:
        return f"(DataModel.Playlist) name=[{self._name}] songs={self._songs}"
