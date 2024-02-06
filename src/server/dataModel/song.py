# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
from __future__ import annotations

__copyright__ = "Copyright (c) 2022 https://github.com/reAudioPlayer"

from typing import Any, Dict, List, Optional

from hashids import Hashids  # type: ignore
from pyaddict import JDict

from dataModel.metadata import SongMetadata
from dataModel.track import ISimpleTrack
from db.table.songs import SongModel


hashids = Hashids(salt="reapOne.track", min_length=22)


def _castDuration(value: Optional[Any]) -> int:
    if isinstance(value, (float, int)):
        return int(value)
    if not isinstance(value, str):
        return -1
    try:
        return int(value.split(":")[0]) * 60 + int(value.split(":")[1])
    except:  # pylint: disable=bare-except
        return -1


class Song(ISimpleTrack):
    """song model"""

    __slots__ = ("_metadata", "_model", "_onChanged")

    def __init__(self, model: SongModel) -> None:
        self._model = model
        self._metadata = SongMetadata.fromSongModel(model)

    @property
    def model(self) -> SongModel:
        """return model"""
        return self._model

    @model.setter
    def model(self, value: SongModel) -> None:
        self._model = value
        self._metadata = SongMetadata.fromSongModel(value)

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Song):
            return False
        return self._model.id == other._model.id

    def deepEqual(self, other: object) -> bool:
        """deep equal"""
        if not isinstance(other, Song):
            return False
        return self._model == other._model  # pylint: disable=protected-access

    def __hash__(self) -> int:
        return hash(self._model.id)

    @property
    def metadata(self) -> SongMetadata:
        """return metadata"""
        return self._metadata

    @metadata.setter
    def metadata(self, value: SongMetadata) -> None:
        self._metadata = value
        if value.spotify:
            self._model.spotify = value.spotify.toStr()
        if value.plays:
            self._model.plays = value.plays

    @property
    def title(self) -> str:
        return self._model.name

    @property
    def artist(self) -> str:
        return self._model.artist

    @property
    def album(self) -> str:
        return self._model.album

    @property
    def albumInDb(self) -> bool:
        """return if album is in db"""
        return bool(self._model.albumHash)

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

        name = dex.optionalGet("title", str)
        if not name:
            name = dex.ensure("name", str)

        artist = dex.ensure("artist", str)
        album = dex.ensure("album", str)
        cover = dex.ensure("cover", str)
        favourite = dex.ensure("favourite", bool)
        duration = _castDuration(dex.get("duration"))
        source = dex.ensure("source", str)
        spotify = dex.ensure("spotify", str)
        id_ = dex.optionalGet("id", int)
        model = SongModel(
            name, artist, album, cover, favourite, duration, spotify, source, 0, "", id_
        )
        return cls(model)

    @staticmethod
    def autoCorrectArtist(songs: List[Song], artist: str) -> str:
        """corrects casing of artist"""
        if len(songs) == 0:
            return artist
        return next((x for x in songs[0].model.artists if x.lower() == artist.lower()), artist)

    def update(self, other: Song) -> None:
        """update from other"""
        self._model = other.model

    def __str__(self) -> str:
        return f"Song({self._model.artist} - {self._model.name} [{self._model.album}])"

    def __repr__(self) -> str:
        return str(self)
