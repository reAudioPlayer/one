from __future__ import annotations
from typing import Optional, Tuple, List
from meta.spotify import SpotifyAudioFeatures
from dataModel.track import BasicSpotifyItem
from pyaddict import JDict


SQLRow = Tuple[int, Optional[str], Optional[str], Optional[str], int]


class SpotifyMetadata:
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

    def toDict(self) -> dict:
        return {
            "id": self._id,
            "features": self._features.toDict() if self._features else None,
            "analysis": self._analysis,
            "popularity": self._popularity,
            "album": self._album.toDict(),
            "artists": [artist.toDict() for artist in self._artists] if self._artists else None,
            "releaseDate": self._releaseDate,
            "explicit": self._explicit
        }

    @property
    def id(self) -> str:
        return self._id

    @property
    def artists(self) -> Optional[List[BasicSpotifyItem]]:
        return self._artists

    @property
    def album(self) -> Optional[BasicSpotifyItem]:
        return self._album

    @staticmethod
    def fromDict(data: JDict) -> SpotifyMetadata:
        return SpotifyMetadata(
            data.optionalGet("id", str),
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
        if row is None:
            return None
        return SpotifyMetadata.fromDict(JDict.fromString(row))

    def toStr(self) -> str:
        return JDict(self.toDict()).toString()


class SongMetadata:
    __slots__ = ("_id", "_spotify", "_spotifyFeatures", "_spotifyAnalysis", "_plays")

    def __init__(self,
                 id_: int,
                 spotify: Optional[str] = None,
                 plays: int = 0) -> None:
        self._id = id_
        self._plays = plays
        self._spotify = SpotifyMetadata.fromSql(spotify)

    @staticmethod
    def fromSql(sql: Optional[SQLRow]) -> Optional[SongMetadata]:
        """create Metadata from sql"""
        if sql is None:
            return None
        return SongMetadata(*sql)

    def toSql(self) -> SQLRow:
        """return sql representation"""
        return (self._id, self._spotify.toStr(), self._plays)

    def __repr__(self) -> str:
        return f"(DataModel.Metadata) id=[{self._id}] spotify=[{self._spotify}] plays=[{self._plays}]"

    @property
    def id(self) -> int:
        """return id"""
        return self._id

    @property
    def spotify(self) -> Optional[SpotifyMetadata]:
        """return spotify"""
        return self._spotify

    @property
    def plays(self) -> int:
        """return plays"""
        return self._plays

    @spotify.setter
    def spotify(self, value: Optional[SpotifyMetadata]) -> None:
        """set spotify"""
        self._spotify = value

    @plays.setter
    def plays(self, value: int) -> None:
        """set plays"""
        self._plays = value

    def toDict(self) -> dict:
        """return dict representation"""
        return {
            "id": self._id,
            "spotify": self._spotify.toDict() if self._spotify else None,
            "plays": self._plays
        }