# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
from __future__ import annotations
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

from typing import List, Tuple
import json


class Playlist:
    """playlist model"""
    def __init__(self,
                 name: str,
                 songs: List[int],
                 id_: int,
                 description: str,
                 cover: str) -> None:
        self._name = name
        self._description = description
        self._songs = songs
        self._cover = cover
        self._id = id_

    def sql(self) -> Tuple[str, str, str, str]:
        """return sql values"""
        return ( self._name,
                 self._description,
                 json.dumps(self._songs),
                 self._cover )

    @staticmethod
    def fromSql(row: Tuple[int, str, str, str, str]) -> Playlist:
        """create playlist from sql row"""
        id_, name, description, songs, cover = row
        return Playlist(name, json.loads(songs), id_, description, cover)

    def __repr__(self) -> str:
        return f"(DataModel.Playlist) id=[{self._id}] name=[{self._name}] \
songs={self._songs} description=[{self._description}]"

    @property
    def songs(self) -> List[int]:
        """return songs"""
        return self._songs

    @property
    def id(self) -> int:
        """return id"""
        return self._id

    @property
    def name(self) -> str:
        """return name"""
        return self._name

    @property
    def description(self) -> str:
        """return description"""
        return self._description

    @property
    def cover(self) -> str:
        """return cover"""
        return self._cover
