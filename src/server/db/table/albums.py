# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
from __future__ import annotations

__copyright__ = "Copyright (c) 2023 https://github.com/reAudioPlayer"

from typing import Type, Tuple, Optional, Any, Dict, List, TYPE_CHECKING
from datetime import datetime
from dataclasses import dataclass
from pyaddict import JDict, JList
from hashids import Hashids  # type: ignore
import aiosqlite
from helper.asyncThread import asyncRunInThreadWithReturn
from helper.logged import Logged
from db.table.table import ITable, IModel
from dataModel.track import BasicSpotifyItem, SpotifyTrack

if TYPE_CHECKING:
    from meta.spotify import Spotify
    from db.database import Database
    from dataModel.song import Song


hashids = Hashids(salt="reapOne.album", min_length=22)


class SpotifyAlbumData:
    """spotify artist data"""

    __slots__ = (
        "_id",
        "_genres",
        "_popularity",
        "_label",
        "_external",
        "_copyright",
        "_tracks",
        "_artists",
        "_releaseDate",
        "_name",
        "_total",
        "_expire",
        "_image",
    )
    _DISABLED = datetime(1970, 1, 1)

    @dataclass
    class ExternalIds:
        """external ids"""

        isrc: str
        ean: str
        upc: str

        @classmethod
        def fromDict(cls, data: JDict) -> SpotifyAlbumData.ExternalIds:
            """Create from dict"""
            return cls(data.ensure("isrc", str), data.ensure("ean", str), data.ensure("upc", str))

    def __init__(  # pylint: disable=too-many-arguments
        self,
        id_: str,
        genres: List[str],
        popularity: int,
        label: str,
        external: Optional[ExternalIds],
        copyrightHolder: str,
        tracks: List[BasicSpotifyItem] | List[SpotifyTrack],
        artists: List[BasicSpotifyItem],
        releaseDate: datetime,
        name: str,
        total: int,
        image: str,
    ) -> None:
        self._id = id_
        self._genres = genres
        self._popularity = popularity
        self._label = label
        self._external = external
        self._copyright = copyrightHolder
        self._tracks = tracks
        self._artists = artists
        self._releaseDate = releaseDate
        self._name = name
        self._total = total
        self._image = image

    @classmethod
    def disabled(cls) -> SpotifyAlbumData:
        """create from id"""
        return SpotifyAlbumData("", [], 0, "", None, "", [], [], cls._DISABLED, "", 0, "")

    @classmethod
    def fromId(cls, id_: str) -> SpotifyAlbumData:
        """create from id"""
        return SpotifyAlbumData(id_, [], 0, "", None, "", [], [], cls._DISABLED, "", 0, "")

    @property
    def id(self) -> str:
        """return id"""
        return self._id

    @property
    def image(self) -> str:
        """return image"""
        return self._image

    @property
    def genres(self) -> List[str]:
        """return genres"""
        return self._genres

    @property
    def artists(self) -> List[BasicSpotifyItem]:
        """return artists"""
        return self._artists

    @property
    def name(self) -> str:
        """return name"""
        return self._name

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, SpotifyAlbumData):
            return False
        if self._id != other._id:
            return False
        if self._genres != other._genres:
            return False
        if self._popularity != other._popularity:
            return False
        return True

    @classmethod
    def fromDict(cls, data: JDict) -> Optional[SpotifyAlbumData]:
        """Create from dict"""
        values = cls._fromDict(data)
        if not values:
            return None
        return cls(*values)

    @classmethod
    def _fromDict(cls, data: JDict) -> Tuple[Any, ...] | None:
        """Create from dict"""
        if "id" not in data:
            return None

        artists: List[BasicSpotifyItem] = []
        for item in data.ensureCast("artists", JList).iterator().ensureCast(JDict):
            artists.append(BasicSpotifyItem.fromDict(item))

        tracks: List[BasicSpotifyItem] = []
        for item in data.chain().ensureCast("tracks.items", JList).iterator().ensureCast(JDict):
            tracks.append(BasicSpotifyItem.fromDict(item))

        releaseDateString = data.ensure("release_date", str, data.ensure("releaseDate", str))
        releaseDate = datetime.fromisoformat(releaseDateString)

        return (
            data.ensure("id", str),
            data.ensure("genres", list),
            data.ensure("popularity", int),
            data.ensure("label", str),
            SpotifyAlbumData.ExternalIds.fromDict(data.ensureCast("external_ids", JDict)),
            data.ensure("copyright", str),
            tracks,
            artists,
            releaseDate,
            data.ensure("name", str),
            data.ensure("total_tracks", int),
            data.chain().ensure("images.[0].url", str),
        )

    @staticmethod
    def fromSql(row: Optional[str]) -> Optional[SpotifyAlbumData]:
        """Create from sql"""
        if not row:
            return None
        return SpotifyAlbumData.fromDict(JDict.fromString(row))

    def toDict(self) -> JDict:
        """return dict"""
        return JDict(
            {
                "id": self._id,
                "genres": self._genres,
                "popularity": self._popularity,
                "image": self._image,
            }
        )

    def toStr(self) -> str:
        """return str"""
        return self.toDict().toString()

    async def tracks(self, spotify: Spotify) -> None:
        """fetch top tracks"""
        if len(self._tracks) > 0:
            return
        result = await asyncRunInThreadWithReturn(spotify.albumTracks, self._id)
        if not result:
            return
        self._tracks = result.unwrap()


class SpotifyAlbum(SpotifyAlbumData):
    """spotify album model"""

    @classmethod
    def fromDict(cls, data: JDict) -> Optional[SpotifyAlbum]:
        """Create from dict"""
        values = cls._fromDict(data)
        if values is None:
            return None
        return cls(*values)

    @property
    def releaseDate(self) -> str:
        """return release date"""
        return self._releaseDate.isoformat()

    @property
    def url(self) -> str:
        """return url"""
        return f"https://open.spotify.com/album/{self._id}"

    @property
    def artistNames(self) -> List[str]:
        """return artists"""
        return [x.name for x in self._artists]

    def toDict(self) -> JDict:
        """return dict of album"""
        return JDict(
            {
                "title": self._name,
                "cover": self.image,
                "releaseDate": self.releaseDate,
                "artists": [x.toDict() for x in self._artists],
                "url": self.url,
                "id": self._id,
            }
        )


class AlbumModel(IModel):
    """artist model"""

    __slots__ = ("_id", "_name", "_spotify", "_image", "_anyArtist", "_allArtists")
    _SQLType = Tuple[str, str, str, str, str]
    COLUMNS = ["id", "name", "spotify", "image", "anyArtist", "allArtists"]

    def __init__(
        self,  # pylint: disable=too-many-arguments
        name: str,
        spotify: str = "",
        image: str = "",
        anyArtist: str = "",
        allArtists: str = "",
        id_: Optional[int] = None,
    ) -> None:
        self._id = id_
        self._name = name or ""
        self._spotify = spotify
        self._image = image
        self._anyArtist = anyArtist
        self._allArtists = allArtists
        super().__init__()

    @classmethod
    def fromTuple(cls, row: aiosqlite.Row) -> AlbumModel:
        id_, others = row[0], row[1:]
        return cls(*others, id_)  # type: ignore

    @property
    def insertStatement(self) -> str:
        items = [*self.COLUMNS]
        items.remove("id")
        return f"({', '.join(items)}) VALUES ({', '.join(['?' for _ in items])})"

    @property
    def updateStatement(self) -> str:
        items = self.COLUMNS
        return f"{', '.join([f'{item}=?' for item in items])}"

    @property
    def eq(self) -> str:
        return f"name = '{self.name}'"

    def toTuple(self) -> _SQLType:
        return (self._name, self._spotify, self._image, self._anyArtist, self._allArtists)

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, AlbumModel):
            return False
        if self._name != other._name:
            return False
        if self._spotify != other._spotify:
            return False
        if self._anyArtist != other._anyArtist:
            return False
        if self._allArtists != other._allArtists:
            return False
        return True

    @property
    def id(self) -> Optional[int]:
        """return id"""
        return self._id

    @id.setter
    def id(self, value: Optional[int]) -> None:
        self._id = value

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
    def anyArtist(self) -> List[str]:
        """
        for albums from multiple artists, with no common artist
        """
        return self._anyArtist.split(",")

    @anyArtist.setter
    def anyArtist(self, value: List[str]) -> None:
        self._anyArtist = ",".join(value)

    @property
    def allArtists(self) -> List[str]:
        """
        for albums from common artists
        """
        return self._allArtists.split(",")

    @allArtists.setter
    def allArtists(self, value: List[str]) -> None:
        self._allArtists = ",".join(value)

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
    def spotifyModel(self) -> Optional[SpotifyAlbumData]:
        """return spotify model"""
        return SpotifyAlbumData.fromSql(self._spotify)

    @spotifyModel.setter
    def spotifyModel(self, value: SpotifyAlbumData) -> None:
        if value == self.spotifyModel:
            return
        self._spotify = value.toStr()
        self._fireChanged()

    @property
    def hash(self) -> str:
        """return hash"""
        if not self._id:
            return ""
        return hashids.encode(int(self._id))  # type: ignore

    def forceUpdate(self) -> None:
        """force update"""
        self._fireChanged()

    def toDict(self) -> Dict[str, Any]:
        """return dict"""
        return {
            "name": self.name,
            "spotify": self.spotify,
            "image": self.image,
        }

    @staticmethod
    async def _fetchMetadata(spotifyId: str, spotify: Spotify) -> Optional[SpotifyAlbum]:
        if not spotifyId:
            return None
        if len(spotifyId) < 22:
            return None
        result = await asyncRunInThreadWithReturn(spotify.album, spotifyId)
        if not result:
            return None
        return result.unwrap()

    @staticmethod
    async def _findAlbumBySong(song: Song) -> Optional[str]:
        trackMeta = song.metadata.spotify
        if not trackMeta or not trackMeta.album:
            return None
        basicAlbum = trackMeta.album
        if basicAlbum:
            return basicAlbum.id
        return None

    @staticmethod
    async def _findAlbumBySpotifySearch(albumName: str, spotify: Spotify) -> Optional[SpotifyAlbum]:
        result = await asyncRunInThreadWithReturn(spotify.searchAlbum, albumName)
        if result:
            albums = result.unwrap()
            firstAlbum = next((x for x in albums if x.name.lower() == albumName.lower()), None)
            if firstAlbum:
                return firstAlbum
        return None

    @classmethod
    async def _createModel(cls, song: Song, spotify: Spotify, db: Database) -> Optional[AlbumModel]:
        logger = Logged.getLogger("createModel")
        logger.debug("creating model for %s", song)
        logger.debug("that would be %s", song.album)

        model = await db.albums.byName(song.album)

        logger.debug("model by name %s", model)

        alreadyExists = model is not None
        albumId = model.spotifyModel.id if model and model.spotifyModel else None
        logger.debug("model already exists: %s (spotify id: %s)", alreadyExists, albumId)

        if not alreadyExists:
            logger.debug("model does not exist, searching for album in db")
            albumId = await cls._findAlbumBySong(song)
            logger.debug("found album id: %s", albumId)
            if not albumId:
                logger.debug("album not found in db, searching spotify")
                spotifyAlbum = await cls._findAlbumBySpotifySearch(song.album, spotify)
                albumId = spotifyAlbum.id if spotifyAlbum else None
                logger.debug("found album id: %s", albumId)
            if not albumId:
                model = AlbumModel(song.album, "", song.model.cover, song.artist)
                if not alreadyExists:
                    model.id = await db.albums.insert(model)
                return model
            if albumId:
                spotifyAlbum = await cls._fetchMetadata(albumId, spotify)
                if spotifyAlbum is None:
                    return None
                model = AlbumModel(
                    spotifyAlbum.name,
                    spotifyAlbum.toStr(),
                    spotifyAlbum.image,
                    ",".join([x.name for x in spotifyAlbum.artists]),
                )

        assert model is not None
        metadata: Optional[SpotifyAlbumData] = model.spotifyModel

        logger.debug("refetch? %s", not metadata and albumId)

        if not metadata and albumId:
            newMetadata = await cls._fetchMetadata(albumId, spotify)
            if not newMetadata:
                return None
            model.spotifyModel = newMetadata
            if newMetadata:
                model.image = newMetadata.image

        logger.debug("returning model %s", model)

        if not alreadyExists:
            model.id = await db.albums.insert(model)
        return model

    @classmethod
    async def forSong(cls, song: Song, spotify: Spotify, db: Database) -> Optional[AlbumModel]:
        """fetch album"""
        return await cls._createModel(song, spotify, db)


class AlbumsTable(ITable[AlbumModel]):
    """Artists table"""

    NAME = "Albums"
    DESCRIPTION = """
                  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                  name TEXT,
                  spotify TEXT,
                  image TEXT,
                  anyArtist TEXT
                  allArtists TEXT
                  """

    def _model(self) -> Type[AlbumModel]:
        return AlbumModel

    async def byName(self, name: str) -> Optional[AlbumModel]:
        """get artist by id"""
        escaped = name.replace("'", "''")
        where = f"name = '{escaped}'"
        return await self.selectOne(append=f"WHERE {where}")

    async def byId(self, id_: str) -> Optional[AlbumModel]:
        """get artist by id"""
        where = f"spotify LIKE '%{id_}%'"
        return await self.selectOne(append=f"WHERE {where}")

    async def byArtist(self, artistName: str) -> List[AlbumModel]:
        """get artist by id"""
        escaped = artistName.replace("'", "''")
        where = f"anyArtist LIKE '%{escaped}%' OR allArtists LIKE '%{escaped}%'"
        return await self.select(append=f"WHERE {where}")

    async def search(self, query: str) -> List[AlbumModel]:
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
