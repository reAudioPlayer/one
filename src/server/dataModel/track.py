# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
from __future__ import annotations

__copyright__ = "Copyright (c) 2022 https://github.com/reAudioPlayer"

from abc import ABC, abstractmethod
import re
from functools import wraps
from typing import Any, Dict, List, Optional, Callable, TypeVar, ParamSpec, TYPE_CHECKING
import requests

from pyaddict import JDict, JList
from ytmusicapi import YTMusic  # type: ignore
from sclib import SoundcloudAPI, Track  # type: ignore

from helper.asyncThread import asyncRunInThreadWithReturn

if TYPE_CHECKING:
    from dataModel.metadata import SongMetadata
    from meta.spotify import Spotify, SpotifyResult


class ISimpleTrack(ABC):
    """very simple track model"""

    @property
    @abstractmethod
    def title(self) -> str:
        """return title"""

    @property
    @abstractmethod
    def album(self) -> str:
        """return album"""

    @property
    @abstractmethod
    def artist(self) -> str:
        """return artist (formatted artists)"""


class ITrack(ISimpleTrack):
    """track model"""

    @property
    @abstractmethod
    def artists(self) -> List[str]:
        """return list of artists"""

    @property
    @abstractmethod
    def cover(self) -> str:
        """return cover"""

    @property
    @abstractmethod
    def url(self) -> str:
        """return url"""

    @property
    def preview(self) -> Optional[str]:
        """return preview url"""
        return None

    @property
    def markets(self) -> Optional[List[str]]:
        """return markets/regions"""
        return None

    def toDict(self) -> Dict[str, Any]:
        """return dict"""
        return {
            "title": self.title,
            "album": self.album,
            "artists": self.artists,
            "artist": self.artist,
            "cover": self.cover,
            "url": self.url,
            "preview": self.preview,
            # "markets": self.markets
        }


class BasicSpotifyItem:
    """basic spotify item model (artist, album, ...)"""

    __slots__ = ("_id", "_name", "_cover")

    def __init__(self, id_: str, name: str, cover: Optional[str] = None) -> None:
        self._id = id_
        self._name = name
        self._cover = cover

    @property
    def id(self) -> str:
        """return id"""
        return self._id

    @property
    def name(self) -> str:
        """return name"""
        return self._name

    def toDict(self) -> Dict[str, Any]:
        """return dict"""
        return {"id": self._id, "name": self._name, "cover": self._cover}

    @staticmethod
    def fromDict(data: JDict) -> BasicSpotifyItem:
        """from dict"""
        return BasicSpotifyItem(
            data.ensure("id", str), data.ensure("name", str), data.optionalGet("cover", str)
        )


class SpotifyTrack(ITrack):
    """spotify track model"""

    __slots__ = (
        "_title",
        "_album",
        "_artists",
        "_id",
        "_preview",
        "_cover",
        "_markets",
        "_popularity",
        "_releaseDate",
        "_duration",
        "_explicit",
        "_url",
        "_metadata",
    )

    def __init__(self, track: Dict[str, Any]) -> None:
        dex = JDict(track).chain()
        self._title = dex.ensure("name", str)
        album = dex.optionalCast("album", JDict)
        self._album: Optional[BasicSpotifyItem] = None
        self._cover: Optional[str] = None
        self._releaseDate: Optional[str] = None
        self._metadata: Optional[SongMetadata] = None

        if album:
            self._album = BasicSpotifyItem(album.ensure("id", str), album.ensure("name", str))
            self._cover = album.chain().ensure("images.[0].url", str)
            self._releaseDate = album.optionalGet("release_date", str)
        elif "images" in track:  # probably album
            self._cover = dex.ensure("images.[0].url", str)
        self._artists = [
            BasicSpotifyItem(x.ensure("id", str), x.ensure("name", str))
            for x in dex.ensureCast("artists", JList).iterator().ensureCast(JDict)
        ]
        self._id = dex.ensure("id", str)
        self._preview = dex.ensure("preview_url", str)
        self._markets = dex.ensureCast("available_markets", JList).iterator().ensure(str)
        self._popularity = dex.ensure("popularity", int)
        self._explicit = dex.ensure("explicit", bool)

    @staticmethod
    def fromDict(data: Dict[str, Any]) -> SpotifyTrack:
        """from dict"""
        assert "spotify" in data, "spotify data not found"
        assert isinstance(data["spotify"], dict), "spotify data is not dict"
        return SpotifyTrack(data["spotify"])

    def addMetadata(self, metadata: Optional[SongMetadata]) -> None:
        """add metadata"""
        self._metadata = metadata

    @property
    def markets(self) -> List[str]:
        """return markets/regions"""
        return self._markets

    @property
    def artists(self) -> List[str]:
        """return artists"""
        return [x.name for x in self._artists]

    @property
    def artistItems(self) -> List[BasicSpotifyItem]:
        """return simple artists"""
        return self._artists

    @property
    def artist(self) -> str:
        """return artist (formatted artists)"""
        return ", ".join(self.artists)

    @property
    def title(self) -> str:
        """return title"""
        return self._title

    @property
    def album(self) -> str:
        """return album"""
        if not self._album:
            return ""
        return self._album.name

    @property
    def albumItem(self) -> BasicSpotifyItem:
        """return simple album"""
        assert self._album, "album not found"
        return self._album

    @property
    def explicit(self) -> bool:
        """return explicit"""
        return self._explicit

    @property
    def cover(self) -> str:
        """return cover"""
        return self._cover or ""

    @property
    def id(self) -> str:
        """return track id"""
        return self._id

    @property
    def popularity(self) -> int:
        """return popularity"""
        return self._popularity

    @property
    def releaseDate(self) -> Optional[str]:
        """return release date"""
        return self._releaseDate

    @property
    def url(self) -> str:
        """return url"""
        return f"https://open.spotify.com/track/{self._id}"

    def toDict(self) -> Dict[str, Any]:
        """return dict of track"""
        return {
            "title": self.title,
            "artists": self.artists,
            "artist": ", ".join(self.artists),
            "cover": self.cover,
            "href": self.url,
            "preview": self.preview,
            # "markets": self.markets,
            "album": self.album,
            "metadata": self._metadata.toDict() if self._metadata else None,
            "spotify": {
                "id": self._id,
                "name": self._title,
                "preview": self._preview,
                "available_markets": self._markets,
                "popularity": self._popularity,
                "explicit": self._explicit,
                "artists": [x.toDict() for x in self._artists],
                "album": {
                    "id": self._album.id if self._album else "",
                    "name": self._album.name if self._album else "",
                    "images": [{"url": self._cover}] if self._cover else [],
                    "release_date": self._releaseDate,
                },
            },
        }

    @staticmethod
    async def _getFromSpotify(spotify: Spotify, spotifyId: str) -> SpotifyResult[SpotifyTrack]:
        return await asyncRunInThreadWithReturn(spotify.track, spotifyId)

    @staticmethod
    async def _searchOnSpotify(
        spotify: Spotify, query: str, limit: int
    ) -> SpotifyResult[List[SpotifyTrack]]:
        return await asyncRunInThreadWithReturn(spotify.searchTrack, query, limit)

    @classmethod
    async def fetch(
        cls,
        spotify: Spotify,
        spotifyId: Optional[str],
        artist: Optional[str],
        title: Optional[str],
        forceFetch: bool,
    ) -> Optional[SpotifyTrack]:
        """fetch metadata from spotify"""
        if spotifyId and forceFetch:
            spotifyResult = await cls._getFromSpotify(spotify, spotifyId)
            if not spotifyResult:
                return None
            return spotifyResult.unwrap()
        searchResult = await cls._searchOnSpotify(spotify, f"{artist} {title}", 1)
        if not searchResult:
            return None
        value = searchResult.unwrap()
        if len(value) == 0:
            return None
        return value[0]


class SpotifyPlaylist:
    """spotify playlist model"""

    def __init__(self, playlist: Dict[str, Any]) -> None:
        dex = JDict(playlist).chain()
        self._name = dex.ensure("name", str)
        self._description = dex.ensure("description", str)
        self._cover = dex.ensure("images.[0].url", str)
        self._id = dex.ensure("id", str)
        self._owner = dex.ensure("owner", str)
        self._trackCount = dex.ensure("tracks.total", int)

    def toDict(self) -> Dict[str, Any]:
        """return dict of playlist"""
        return {
            "name": self._name,
            "description": self._description,
            "cover": self._cover,
            "id": self._id,
            "owner": self._owner,
            "length": self._trackCount,
        }


class SpotifyArtist:
    """spotify artist model"""

    def __init__(self, artist: Dict[str, Any]) -> None:
        dex = JDict(artist).chain()
        self._all = artist
        self._name = dex.ensure("name", str)
        self._id = dex.ensure("id", str)
        self._cover = dex.ensure("images.[0].url", str)
        self._followers = dex.ensure("followers.total", int)
        self._description = f"{self._displayFollowers} followers"
        self._genres = dex.ensureCast("genres", JList).iterator().ensure(str)
        self._popularity = dex.ensure("popularity", int)

    @property
    def _displayFollowers(self) -> str:
        # > 1.000.000 -> 1M
        # > 1.000 -> 1K
        followers = str(self._followers)
        if self._followers > 1e6:
            followers = f"{round(self._followers / 1e6, 1)}M"
        elif self._followers > 1e3:
            followers = f"{round(self._followers / 1e3, 1)}k"
        return followers

    @property
    def id(self) -> str:
        """return id"""
        return self._id

    @property
    def cover(self) -> str:
        """return cover"""
        return self._cover

    @property
    def name(self) -> str:
        """return name"""
        return self._name

    @property
    def followers(self) -> int:
        """return followers"""
        return self._followers

    @property
    def popularity(self) -> int:
        """return popularity"""
        return self._popularity

    @property
    def genres(self) -> List[str]:
        """return genres"""
        return self._genres

    @property
    def image(self) -> str:
        """return image"""
        return self._cover

    def toDict(self) -> Dict[str, Any]:
        """return dict of artist"""
        return {
            "name": self._name,
            "description": self._description,
            "followers": self._followers,
            "cover": self._cover,
            "id": self._id,
            "genres": self._genres,
            "popularity": self._popularity,
        }


P = ParamSpec("P")
U = TypeVar("U")


def _youtubeRequired(func: Callable[P, U]) -> Callable[P, U]:
    def _connect() -> bool:
        if YoutubeTrack.YtMusic:
            return True

        try:
            YoutubeTrack.YtMusic = YTMusic()
            return True
        except requests.exceptions.SSLError:
            print(
                """ssl verification error.
Make sure you are connected to the internet and no firewall is blocking or limiting access to sites like youtube.com"""  # pylint: disable=line-too-long
            )
        except Exception as exception:  # pylint: disable=broad-except
            print(exception)
        return False

    @wraps(func)
    def wrapper(*args: Any, **kwargs: Any) -> Any:
        if not _connect():
            return None
        return func(*args, **kwargs)

    return wrapper


class YoutubeTrack(ITrack):
    """youtube track model"""

    def __init__(self, track: Dict[str, Any]) -> None:
        dex = JDict(track).chain()
        self._title = dex.ensure("title", str)
        album = dex.ensureCast("album", JDict)
        self._album = album.ensure("name", str)
        self._artists = [
            x.ensure("name", str)
            for x in dex.ensureCast("artists", JList).iterator().ensureCast(JDict)
        ]
        self._id = dex.ensure("videoId", str)
        self._cover = dex.ensure("thumbnails.[0].url", str).replace("w60-h60", "w500-h500")
        self._preview = None
        self._markets: Optional[List[str]] = []

    YtMusic: Optional[YTMusic] = None

    @property
    def artists(self) -> List[str]:
        return self._artists

    @property
    def artist(self) -> str:
        return ", ".join(self.artists)

    @property
    def title(self) -> str:
        return self._title

    @property
    def album(self) -> str:
        return self._album

    @property
    def cover(self) -> str:
        return self._cover

    @property
    def markets(self) -> Optional[List[str]]:
        return self._markets

    @property
    def url(self) -> str:
        return f"https://music.youtube.com/watch?v={self._id}"

    @staticmethod
    @_youtubeRequired
    def fromUrl(url: str) -> Optional[YoutubeTrack]:
        """return track from url"""
        assert YoutubeTrack.YtMusic
        x = re.search(
            r"(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([a-zA-Z0-9_]+)",  # pylint: disable=line-too-long
            url,
            re.IGNORECASE,
        )
        assert x
        video = YoutubeTrack.YtMusic.get_song(x.group(1))
        details = video.get("videoDetails")
        results = YoutubeTrack.YtMusic.search(
            f"{details.get('author')} {details.get('title')}", filter="songs"
        )
        if len(results) > 0:
            return YoutubeTrack(results[0])
        return YoutubeTrack(
            {"title": details.get("title"), "artists": [{"name": details.get("author")}]}
        )

    @staticmethod
    @_youtubeRequired
    def fromQuery(query: str) -> Optional[List[YoutubeTrack]]:
        """return list of tracks from query"""
        assert YoutubeTrack.YtMusic
        tracks = YoutubeTrack.YtMusic.search(query, filter="songs")
        return [YoutubeTrack(track) for track in tracks]

    @staticmethod
    @_youtubeRequired
    def fromSpotifyTrack(track: SpotifyTrack) -> Optional[YoutubeTrack]:
        """return track from spotify track"""
        assert YoutubeTrack.YtMusic
        results = YoutubeTrack.YtMusic.search(
            f"{' '.join(track.artists)} {track.title}", filter="songs"
        )

        if len(results) == 0:
            return None

        if "extended" not in track.title.lower():
            for result in results:
                if "extended" in result.get("title", "").lower():
                    continue
                return YoutubeTrack(result)

        if "extended" in track.title.lower():
            for result in results:
                if "extended" in result.get("title", "").lower():
                    return YoutubeTrack(result)

        return YoutubeTrack(results.pop())


class SoundcloudTrack(ITrack):
    """soundcloud track model"""

    def __init__(self, track: Track) -> None:
        self._url: str = track.uri
        self._title: str = track.title
        self._album: str = track.album or track.title
        self._artists: List[str] = [track.artist]
        self._id = track.id
        self._cover: str = track.artwork_url.replace("large", "t500x500")
        self._extendedTrack = track
        self._preview = None

    @staticmethod
    def fromUrl(url: str) -> SoundcloudTrack:
        """create a soundcloud track from a url"""
        track = SoundcloudAPI().resolve(url)
        assert isinstance(track, Track)
        return SoundcloudTrack(track)

    @property
    def artists(self) -> List[str]:
        return self._artists

    @property
    def artist(self) -> str:
        return ", ".join(self.artists)

    @property
    def title(self) -> str:
        return self._title

    @property
    def album(self) -> str:
        return self._album

    @property
    def cover(self) -> str:
        return self._cover

    @property
    def url(self) -> str:
        return self._url
