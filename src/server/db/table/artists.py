# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
from __future__ import annotations
__copyright__ = "Copyright (c) 2023 https://github.com/reAudioPlayer"

from typing import Type, Tuple, Optional, Any, Dict, List, Union, TYPE_CHECKING
from datetime import datetime, timedelta
import asyncio
from pyaddict import JDict, JList
import aiosqlite
from helper.asyncThread import asyncRunInThreadWithReturn
from helper.logged import Logged
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
                 "_topTracks",
                 "_expire")
    _DISABLED = datetime(1970, 1, 1)

    def __init__(self,
                 id_: str,
                 genres: List[str],
                 popularity: int,
                 followers: int,
                 image: str,
                 related: List[BasicSpotifyItem],
                 topTracks: List[SpotifyTrack],
                 expire: datetime) -> None:
        self._id = id_
        self._genres = genres
        self._popularity = popularity
        self._followers = followers
        self._image = image
        self._related: Union[List[BasicSpotifyItem], List[SpotifyArtist]] = related
        self._topTracks: List[SpotifyTrack] = topTracks
        self._expire = expire

    @classmethod
    def disabled(cls) -> SpotifyArtistData:
        """create from id"""
        return SpotifyArtistData("", [], 0, 0, "", [], [], cls._DISABLED)

    @staticmethod
    def fromId(id_: str) -> SpotifyArtistData:
        """create from id"""
        return SpotifyArtistData(id_, [], 0, 0, "", [], [], datetime.now())

    @property
    def id(self) -> str:
        """return id"""
        return self._id

    @property
    def image(self) -> str:
        """return image"""
        return self._image

    @property
    def expired(self) -> bool:
        """return expired"""
        if self._expire == self._DISABLED:
            return False
        return datetime.now() > self._expire

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
    def fromArtist(artist: SpotifyArtist) -> SpotifyArtistData:
        """create from artist"""
        return SpotifyArtistData(
            artist.id,
            artist.genres,
            artist.popularity,
            artist.followers,
            artist.image,
            [],
            [],
            datetime.now() + timedelta(days=7)
        )

    @staticmethod
    def fromDict(data: JDict) -> Optional[SpotifyArtistData]:
        """Create from dict"""
        if "id" not in data:
            return None

        related: List[BasicSpotifyItem] = []
        for item in data.ensureCast("related", JList).iterator().ensureCast(JDict):
            related.append(BasicSpotifyItem.fromDict(item))
        topTracks: List[SpotifyTrack] = []
        for item in data.ensureCast("topTracks", JList).iterator().ensureCast(JDict):
            topTracks.append(SpotifyTrack.fromDict(item))

        expire: datetime = datetime.now() + timedelta(days=7)
        try:
            expireString = data.ensure("expire", str)
            expire = datetime.fromisoformat(expireString)
        except: # pylint: disable=bare-except
            pass

        return SpotifyArtistData(
             data.ensure("id", str),
             data.ensure("genres", list),
             data.ensure("popularity", int),
             data.ensure("followers", int),
             data.ensure("image", str),
             related,
             topTracks,
             expire
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
            "topTracks": [item.toDict() for item in self._topTracks],
            "expire": self._expire.isoformat()
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
        return f"name = '{self.name}'"

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
        if len(spotifyId) < 22:
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
    async def _findArtistBySpotifySearch(artistName: str,
                                         spotify: Spotify) -> Optional[SpotifyArtist]:
        result = await asyncRunInThreadWithReturn(spotify.searchArtist, artistName)
        if result:
            artists = result.unwrap()
            firstArtist = next(( x
                                    for x in artists
                                    if x.name.lower() == artistName.lower()),
                                None)
            if firstArtist:
                return firstArtist
        return None

    @classmethod
    async def _createModel(cls,
                           artistName: str,
                           spotify: Spotify,
                           db: Database,
                           tracks: List[Song]) -> Optional[ArtistModel]:
        logger = Logged.getLogger("createModel")
        logger.debug("creating model for %s", artistName)

        model = await db.artists.byName(artistName)
        alreadyExists = model is not None
        artistId = model.spotifyModel.id if model and model.spotifyModel else None
        logger.debug("model already exists: %s (id: %s)", alreadyExists, artistId)

        if not alreadyExists:
            logger.debug("model does not exist, searching for artist in db")
            artistId = await cls._findArtistByTrack(artistName, tracks)
            logger.debug("found artist id: %s", artistId)
            if not artistId:
                logger.debug("artist not found in db, searching spotify")
                spotifyArtist = await cls._findArtistBySpotifySearch(artistName, spotify)
                artistId = spotifyArtist.id if spotifyArtist else None
                logger.debug("found artist id: %s", artistId)
            if artistId:
                spotifyArtist = await cls._fetchMetadata(artistId, spotify)
                if spotifyArtist is None:
                    return None
                artistData = SpotifyArtistData.fromArtist(spotifyArtist)
                await artistData.fetchRelated(spotify)
                await artistData.topTracks(spotify)
                model = ArtistModel(spotifyArtist.name,
                                    artistData.toStr(),
                                    spotifyArtist.cover)

        assert model is not None and artistId is not None
        metadata: Optional[SpotifyArtistData] = model.spotifyModel

        logger.debug("refetch? %s", not metadata or metadata.expired)

        if not metadata or metadata.expired:
            newMetadata = await cls._fetchMetadata(artistId, spotify)
            if not newMetadata:
                return None
            metaModel = SpotifyArtistData.fromDict(JDict(newMetadata.toDict()))
            if not metaModel:
                return None
            await asyncio.gather(
                metaModel.fetchRelated(spotify),
                metaModel.topTracks(spotify)
            )
            model.spotifyModel = metaModel
            if metadata and not metadata.image:
                model.image = newMetadata.cover

        if not alreadyExists:
            await db.artists.insert(model)
        return model

    @classmethod
    async def fetch(cls,
                    artistName: str,
                    spotify: Spotify,
                    db: Database,
                    tracks: List[Song]) -> Optional[ArtistModel]:
        """fetch artist"""
        return await cls._createModel(artistName, spotify, db, tracks)


class ArtistsTable(ITable[ArtistModel]):
    """Artists table"""
    NAME = "Artists"
    DESCRIPTION = """
                  name TEXT PRIMARY KEY,
                  spotify TEXT,
                  image TEXT
                  """

    def _model(self) -> Type[ArtistModel]:
        return ArtistModel

    async def byName(self, name: str) -> Optional[ArtistModel]:
        """get artist by id"""
        where = f"name = '{name}'"
        return await self.selectOne(append = f"WHERE {where}")

    async def search(self, query: str) -> List[ArtistModel]:
        """get songs by (non-sql) query (for the search function)"""

        filters = query.replace("'", "''").split(";")
        filter_ = ""

        def createLike(word: str) -> str:
            return f"(name LIKE '%{word}%')"

        ands: List[str] = []
        for x in filters:
            tagAndQuery = x.replace("title", "name").split(":")
            if len(tagAndQuery) == 1:
                ands.extend([createLike(x) for x in tagAndQuery[0].split(" ")])
            else:
                ands.append(f"{tagAndQuery[0]} LIKE '%{tagAndQuery[1]}%'")
        filter_ = " AND ".join(ands)
        playlists = await self.select(append=f"WHERE {filter_}")
        return playlists
