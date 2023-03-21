# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
from __future__ import annotations
__copyright__ = "Copyright (c) 2022 https://github.com/reAudioPlayer"

from typing import List, Dict, Any
import json
from db.table.playlists import PlaylistModel


class Playlist:
    """playlist model"""
    __slots__ = ("_model", )

    def __init__(self,
                 model: PlaylistModel) -> None:
        self._model = model

    @property
    def model(self) -> PlaylistModel:
        """return model"""
        return self._model

    def toDict(self) -> Dict[str, Any]:
        """return dict"""
        return self._model.toDict()

    @property
    def songs(self) -> List[int]:
        """return songs"""
        songs = json.loads(self._model.songs)
        assert isinstance(songs, list)
        return songs

    @songs.setter
    def songs(self, value: List[int]) -> None:
        self._model.songs = json.dumps(value)

    def addSong(self, song: int) -> None:
        """add song"""
        songs = self.songs
        if song not in songs:
            songs.append(song)
        self.songs = songs

    def swap(self, song1: int, song2: int) -> None:
        """swap songs"""
        songs = self.songs
        index1 = songs.index(song1)
        index2 = songs.index(song2)
        songs[index1] = song2
        songs[index2] = song1
        self.songs = songs
