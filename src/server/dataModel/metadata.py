# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
from __future__ import annotations
__copyright__ = "Copyright (c) 2023 https://github.com/reAudioPlayer"


from typing import Optional, Tuple, List, Dict, Any, TYPE_CHECKING

from pyaddict import JDict

from meta.spotify import SpotifyAudioFeatures
from dataModel.track import BasicSpotifyItem, SpotifyTrack
from db.table.songs import SongModel
from helper.asyncThread import asyncRunInThreadWithReturn

if TYPE_CHECKING:
    from meta.spotify import Spotify


SQLRow = Tuple[int, Optional[str], int]


class SpotifyMetadata:
    """Spotify Metadata"""
    __slots__ = ("_id", "_features", "_analysis", "_popularity",
                 "_album", "_artists", "_releaseDate", "_explicit")

    def __init__(self,
                 id_: str,
                 features: Optional[SpotifyAudioFeatures] = None,
                 analysis: Optional[str] = None,
                 popularity: int = 0,
                 album: Optional[BasicSpotifyItem] = None,
                 artists: Optional[List[BasicSpotifyItem]] = None,
                 releaseDate: Optional[str] = None,
                 explicit: Optional[bool] = None) -> None:
        self._id = id_
        self._features = features
        self._analysis = analysis
        self._popularity = popularity
        self._album = album
        self._artists = artists
        self._releaseDate = releaseDate
        self._explicit = explicit

    def update(self,
               features: Optional[SpotifyAudioFeatures] = None,
               analysis: Optional[str] = None,
               popularity: Optional[int] = None,
               album: Optional[BasicSpotifyItem] = None,
               artists: Optional[List[BasicSpotifyItem]] = None,
               releaseDate: Optional[str] = None,
               explicit: Optional[bool] = None) -> None:
        """Update the metadata"""
        if features is not None:
            self._features = features
        if analysis is not None:
            self._analysis = analysis
        if popularity is not None:
            self._popularity = popularity
        if album is not None:
            self._album = album
        if artists is not None:
            self._artists = artists
        if releaseDate is not None:
            self._releaseDate = releaseDate
        if explicit is not None:
            self._explicit = explicit

    def toDict(self) -> Dict[str, Any]:
        """Convert to dict"""
        return {
            "id": self._id,
            "features": self._features.toDict() if self._features else None,
            "analysis": self._analysis,
            "popularity": self._popularity,
            "album": self._album.toDict() if self._album else None,
            "artists": [artist.toDict() for artist in self._artists] if self._artists else None,
            "releaseDate": self._releaseDate,
            "explicit": self._explicit
        }

    @property
    def id(self) -> str:
        """Get the id"""
        return self._id

    @property
    def artists(self) -> Optional[List[BasicSpotifyItem]]:
        """Get the artists"""
        return self._artists

    @property
    def album(self) -> Optional[BasicSpotifyItem]:
        """Get the album"""
        return self._album

    @staticmethod
    def fromDict(data: JDict) -> Optional[SpotifyMetadata]:
        """Create from dict"""
        if "id" not in data:
            return None

        return SpotifyMetadata(
            data.assertGet("id", str),
            SpotifyAudioFeatures(data.ensureCast("features", JDict)),
            data.optionalGet("analysis", str),
            data.ensure("popularity", int),
            BasicSpotifyItem.fromDict(data.ensureCast("album", JDict)),
            [BasicSpotifyItem.fromDict(JDict(artist)) for artist in data.ensure("artists", list)],
            data.optionalGet("releaseDate", str),
            data.optionalGet("explicit", bool)
        )

    @staticmethod
    def fromSql(row: Optional[str]) -> Optional[SpotifyMetadata]:
        """Create from sql"""
        if not row:
            return None
        try:
            return SpotifyMetadata.fromDict(JDict.fromString(row))
        except: # pylint: disable=bare-except
            return None

    def toStr(self) -> str:
        """Convert to string"""
        return JDict(self.toDict()).toString()


class SongMetadata:
    """Song Metadata"""
    __slots__ = ("_id", "_spotify", "_spotifyFeatures", "_spotifyAnalysis", "_plays")

    def __init__(self,
                 spotify: Optional[str] = None,
                 plays: int = 0) -> None:
        self._plays = plays
        self._spotify = SpotifyMetadata.fromSql(spotify)

    @staticmethod
    def fromSongModel(model: SongModel) -> SongMetadata:
        """create Metadata from SongModel"""
        return SongMetadata(model.spotify, model.plays)

    def __repr__(self) -> str:
        return f"(DataModel.Metadata) \
            spotify=[{self._spotify}] plays=[{self._plays}]"

    @property
    def spotify(self) -> Optional[SpotifyMetadata]:
        """return spotify"""
        return self._spotify

    @spotify.setter
    def spotify(self, value: Optional[SpotifyMetadata]) -> None:
        """set spotify"""
        self._spotify = value

    @property
    def plays(self) -> int:
        """return plays"""
        return self._plays

    @plays.setter
    def plays(self, value: int) -> None:
        """set plays"""
        self._plays = value

    def toDict(self) -> Dict[str, Any]:
        """return dict representation"""
        return {
            "spotify": self._spotify.toDict() if self._spotify else None,
            "plays": self._plays
        }

    @classmethod
    async def fetch(cls,
                    spotify: Spotify,
                    track: SpotifyTrack,
                    oldMetadata: Optional[SongMetadata] = None) -> Optional[SongMetadata]:
        """fetch metadata from spotify"""
        metadata = cls()
        if oldMetadata:
            metadata.plays = oldMetadata.plays

        metadata.spotify = SpotifyMetadata(track.id)
        features = await asyncRunInThreadWithReturn(spotify.audioFeatures, track.id)
        if not features:
            return None
        metadata.spotify.update(
            features = features.unwrap(),
            popularity = track.popularity,
            album = track.albumItem,
            artists = track.artistItems,
            explicit = track.explicit,
            releaseDate = track.releaseDate
        )
        return metadata
