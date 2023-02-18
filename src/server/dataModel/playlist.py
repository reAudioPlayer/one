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
