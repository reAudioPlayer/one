# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
from __future__ import annotations
__copyright__ = "Copyright (c) 2023 https://github.com/reAudioPlayer"

from typing import Type, Tuple, Optional, Any, Dict, List, Union, TYPE_CHECKING
from pyaddict import JDict, JList
import aiosqlite
from helper.asyncThread import asyncRunInThreadWithReturn
from db.table.table import ITable, IModel
from dataModel.track import BasicSpotifyItem, SpotifyTrack, SpotifyArtist

if TYPE_CHECKING:
    from meta.spotify import Spotify
    from db.database import Database
    from dataModel.song import Song


class SpotifyArtistData:
    """spotify artist data"""
    __slots__ = ("_id",
                 "_genres",
                 "_popularity",
                 "_followers",
                 "_image",
                 "_related",
                 "_topTracks")

    def __init__(self,
                 id_: str,
                 genres: List[str],
                 popularity: int,
                 followers: int,
                 image: str,
                 related: List[BasicSpotifyItem]) -> None:
        self._id = id_
        self._genres = genres
        self._popularity = popularity
        self._followers = followers
        self._image = image
        self._related: Union[List[BasicSpotifyItem], List[SpotifyArtist]] = related
        self._topTracks: List[SpotifyTrack] = []

    @property
    def id(self) -> str:
        """return id"""
        return self._id

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, SpotifyArtistData):
            return False
        if self._id != other._id:
            return False
        if self._genres != other._genres:
            return False
        if self._popularity != other._popularity:
            return False
        if self._followers != other._followers:
            return False
        if self._image != other._image:
            return False
        if self._related != other._related:
            return False
        if self._topTracks != other._topTracks:
            return False
        return True

    @staticmethod
    def fromDict(data: JDict) -> Optional[SpotifyArtistData]:
        """Create from dict"""
        if "id" not in data:
            return None

        related: List[BasicSpotifyItem] = []
        for item in data.ensureCast("related", JList).iterator().ensureCast(JDict):
            related.append(BasicSpotifyItem.fromDict(item))

        return SpotifyArtistData(
             data.ensure("id", str),
             data.ensure("genres", list),
             data.ensure("popularity", int),
             data.ensure("followers", int),
             data.ensure("image", str),
             related
        )

    @staticmethod
    def fromSql(row: Optional[str]) -> Optional[SpotifyArtistData]:
        """Create from sql"""
        if not row:
            return None
        return SpotifyArtistData.fromDict(JDict.fromString(row))

    def toDict(self) -> JDict:
        """return dict"""
        return JDict({
            "id": self._id,
            "genres": self._genres,
            "popularity": self._popularity,
            "followers": self._followers,
            "image": self._image,
            "related": [item.toDict() for item in self._related],
            "topTracks": [item.toDict() for item in self._topTracks]
        })

    def toStr(self) -> str:
        """return str"""
        return self.toDict().toString()

    async def fetchRelated(self, spotify: Spotify) -> None:
        """fetch related artists"""
        if self._related:
            return
        result = await asyncRunInThreadWithReturn(spotify.relatedArtists, self._id)
        if not result:
            return
        self._related = result.unwrap()

    async def topTracks(self, spotify: Spotify) -> None:
        """fetch top tracks"""
        if len(self._topTracks) > 0:
            return
        result = await asyncRunInThreadWithReturn(spotify.artistTracks, self._id)
        if not result:
            return
        self._topTracks = result.unwrap()


class ArtistModel(IModel):
    """artist model"""
    __slots__ = ("_name",
                 "_spotify",
                 "_image")
    _SQLType = Tuple[str, str, str]
    COLUMNS = ["name",
               "spotify",
               "image"
               ]

    def __init__(self, # pylint: disable=too-many-arguments
                 name: str,
                 spotify: str = "",
                 image: str = "") -> None:
        self._name = name or ""
        self._spotify = spotify
        self._image = image
        super().__init__()

    @classmethod
    def fromTuple(cls, row: aiosqlite.Row) -> ArtistModel:
        return cls(*row)

    @property
    def insertStatement(self) -> str:
        items = self.COLUMNS
        return f"({', '.join(items)}) VALUES ({', '.join(['?' for _ in items])})"

    @property
    def updateStatement(self) -> str:
        items = self.COLUMNS
        return f"{', '.join([f'{item}=?' for item in items])}"

    @property
    def eq(self) -> str:
        return f"name = {self.name}"

    def toTuple(self) -> _SQLType:
        return (
            self._name,
            self._spotify,
            self._image
        )

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, ArtistModel):
            return False
        if self._name != other._name:
            return False
        if self._spotify != other._spotify:
            return False
        return True

    @property
    def name(self) -> str:
        """return name"""
        return self._name

    @name.setter
    def name(self, value: str) -> None:
        print("name setter", value)
        if value == self._name:
            return
        self._name = value
        self._fireChanged()

    @property
    def image(self) -> str:
        """return image"""
        return self._image

    @image.setter
    def image(self, value: str) -> None:
        if value == self._image:
            return
        self._image = value
        self._fireChanged()

    @property
    def spotify(self) -> str:
        """return spotify"""
        return self._spotify

    @spotify.setter
    def spotify(self, value: str) -> None:
        if value == self._spotify:
            return
        self._spotify = value
        self._fireChanged()

    @property
    def spotifyModel(self) -> Optional[SpotifyArtistData]:
        """return spotify model"""
        return SpotifyArtistData.fromSql(self._spotify)

    @spotifyModel.setter
    def spotifyModel(self, value: SpotifyArtistData) -> None:
        if value == self.spotifyModel:
            return
        self._spotify = value.toStr()
        self._fireChanged()

    def forceUpdate(self) -> None:
        """force update"""
        self._fireChanged()

    def toDict(self) -> Dict[str, Any]:
        """return dict"""
        return {
            "name": self.name,
            "spotify": self.spotify,
            "image": self.image
        }

    @staticmethod
    async def _fetchMetadata(spotifyId: str, spotify: Spotify) -> Optional[SpotifyArtist]:
        if not spotifyId:
            return None
        result = await asyncRunInThreadWithReturn(spotify.artist, spotifyId)
        if not result:
            return None
        return result.unwrap()

    @staticmethod
    async def _findArtistByTrack(artistName: str, tracks: List[Song]) -> Optional[str]:
        for track in tracks:
            trackMeta = track.metadata.spotify
            if not trackMeta or not trackMeta.artists:
                continue
            basicArtist = next(( x
                                for x in trackMeta.artists
                                if x.name.lower() == artistName.lower()),
                               None)
            if basicArtist:
                return basicArtist.id
        return None

    @staticmethod
    async def _findArtistBySpotifySearch(artistName: str, spotify: Spotify) -> Optional[str]:
        result = await asyncRunInThreadWithReturn(spotify.searchArtist, artistName)
        if result:
            artists = result.unwrap()
            firstArtist = next(( x
                                    for x in artists
                                    if x.name.lower() == artistName.lower()),
                                None)
            if firstArtist:
                return firstArtist.id
        return None

    @classmethod
    async def _createModel(cls,
                           artistName: str,
                           spotify: Spotify,
                           db: Database,
                           tracks: List[Song]) -> Optional[ArtistModel]:
        model = await db.artists.byName(artistName)
        if model:
            return model
        artistId = await cls._findArtistByTrack(artistName, tracks)
        if not artistId:
            artistId = await cls._findArtistBySpotifySearch(artistName, spotify)
        if not artistId:
            return None
        metadata = await cls._fetchMetadata(artistId, spotify)
        if not metadata:
            return None
        artistModel = ArtistModel(metadata.name,
                                  JDict(metadata.toDict()).toString(),
                                  metadata.cover)
        spotifyModel = artistModel.spotifyModel
        if spotifyModel:
            await spotifyModel.fetchRelated(spotify)
            artistModel.spotifyModel = spotifyModel
        await db.artists.insert(artistModel)
        return artistModel

    @classmethod
    async def fetch(cls,
                    artistName: str,
                    spotify: Spotify,
                    db: Database,
                    tracks: List[Song]) -> ArtistModel:
        """fetch artist"""
        model = await cls._createModel(artistName, spotify, db, tracks)
        assert model is not None
        return model


class ArtistsTable(ITable[ArtistModel]):
    """Artists table"""
    NAME = "Artists"
    DESCRIPTION = """
                  name TEXT PRIMARY KEY,
                  spotify TEXT
                  """

    def _model(self) -> Type[ArtistModel]:
        return ArtistModel

    async def byName(self, name: str) -> Optional[ArtistModel]:
        """get artist by id"""
        where = f"name = '{name}'"
        return await self.selectOne(append = f"WHERE {where}")
