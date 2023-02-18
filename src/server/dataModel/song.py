# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
from __future__ import annotations
__copyright__ = "Copyright (c) 2022 https://github.com/reAudioPlayer"

from typing import Any, Dict, List, Optional
from hashids import Hashids # type: ignore

from pyaddict import JDict

from dataModel.metadata import SongMetadata

from db.table.songs import SongModel


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


class Song:
    """song model"""
    __slots__ = ("_metadata", "_model" )

    def __init__(self,
                 model: SongModel) -> None:
        self._model = model
        self._metadata = SongMetadata(model.id, model.spotify, model.plays)

    @property
    def model(self) -> SongModel:
        """return model"""
        return self._model

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Song):
            return False
        return self._model.id == other._model.id

    def __hash__(self) -> int:
        return hash(self._model.id)

    @property
    def metadata(self) -> SongMetadata:
        """return metadata"""
        return self._metadata

    def toDict(self) -> Dict[str, Any]:
        """return as dict"""
        result = self._model.toDict()
        result["metadata"] = self.metadata.toDict()
        return result

    def downloadPath(self, forExport: bool = False) -> str:
        """return download path"""
        if forExport:
            return f"{self.model.id}.dl"
        return str(self.model.id)

    @classmethod
    def list(cls, rows: List[SongModel]) -> List[Song]:
        """return list of songs"""
        return [cls(row) for row in rows]

    @classmethod
    def fromDict(cls, data: Dict[str, Any]) -> Song:
        """return from dict"""
        dex = JDict(data)
        name = dex.ensure("name", str)
        artist = dex.ensure("artist", str)
        album = dex.ensure("album", str)
        cover = dex.ensure("cover", str)
        favourite = dex.ensure("favourite", bool)
        duration = _castDuration(dex.get("duration"))
        source = dex.ensure("source", str)
        model = SongModel(name, artist, album, cover, favourite, duration, "", source, 0)
        return cls(model)

    def update(self, other: Song) -> None:
        """update from other"""
        self._model = other.model
