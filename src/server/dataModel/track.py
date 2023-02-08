# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
from __future__ import annotations
__copyright__ = "Copyright (c) 2022 https://github.com/reAudioPlayer"

from abc import ABC, abstractmethod
import re
from functools import wraps
from typing import Any, Dict, List, Optional, Callable, TypeVar, ParamSpec
import requests

from pyaddict import JDict, JList
from ytmusicapi import YTMusic # type: ignore
from sclib import SoundcloudAPI, Track # type: ignore


class ITrack(ABC):
    """track model"""
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


class SpotifyTrack(ITrack):
    """spotify track model"""
    __slots__ = ("_title", "_album", "_artists", "_id", "_preview", "_cover", "_markets")

    def __init__(self, track: Dict[str, Any]) -> None:
        dex = JDict(track).chain()
        self._title = dex.ensure("name", str)
        album = dex.optionalCast("album", JDict)
        if album:
            self._album = album.ensure("name", str)
            self._cover = album.chain().ensure("images.[0].url", str)
        elif "images" in track: # probably album
            self._cover = dex.ensure("images.[0].url", str)
            self._releaseDate = dex.ensure("release_date", str)
        self._artists    = [x.ensure("name", str)
                            for x in dex.ensureCast("artists", JList).iterator().ensureCast(JDict)]
        self._id = dex.ensure("id", str)
        self._preview = dex.ensure("preview_url", str)
        self._markets = dex.ensureCast("available_markets", JList).iterator().ensure(str)

    @property
    def markets(self) -> List[str]:
        """return markets/regions"""
        return self._markets

    @property
    def artists(self) -> List[str]:
        """return artists"""
        return self._artists

    @property
    def artist(self) -> str:
        return ", ".join(self.artists)

    @property
    def title(self) -> str:
        """return title"""
        return self._title

    @property
    def album(self) -> str:
        return self._album

    @property
    def cover(self) -> str:
        return self._cover

    @property
    def id(self) -> str:
        """return track id"""
        return self._id

    @property
    def url(self) -> str:
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
            "markets": self.markets
        }


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
            "length": self._trackCount
        }


class SpotifyArtist:
    """spotify artist model"""
    def __init__(self, artist: Dict[str, Any]) -> None:
        dex = JDict(artist).chain()
        self._name = dex.ensure("name", str)
        self._id = dex.ensure("id", str)
        self._cover = dex.ensure("images.[0].url", str)
        self._description = f"{dex.ensure('followers.total', int)} followers"

    @property
    def id(self) -> str:
        """return id"""
        return self._id

    def toDict(self) -> Dict[str, Any]:
        """return dict of artist"""
        return {
            "name": self._name,
            "description": self._description,
            "cover": self._cover,
            "id": self._id
        }


class SpotifyAlbum:
    """spotify album model"""
    def __init__(self, album: Dict[str, Any]) -> None:
        dex = JDict(album).chain()
        self._title = dex.ensure("name", str)
        self._cover = dex.ensure("images.[0].url", str)
        self._releaseDate = dex.ensure("release_date", str)
        self._artists = [x.ensure("name", str)
                         for x in dex.ensureCast("artists", JList).iterator().ensureCast(JDict)]
        self._id = dex.ensure("id", str)

    @property
    def title(self) -> str:
        """return title"""
        return self._title

    @property
    def artists(self) -> List[str]:
        """return artists"""
        return self._artists

    @property
    def cover(self) -> str:
        """return cover"""
        return self._cover

    @property
    def releaseDate(self) -> str:
        """return release date"""
        return self._releaseDate

    @property
    def url(self) -> str:
        """return url"""
        return f"https://open.spotify.com/album/{self._id}"


P = ParamSpec('P')
U = TypeVar("U")


def _youtubeRequired(func: Callable[P, U]) -> Callable[P, U]:
    def _connect() -> bool:
        if YoutubeTrack.YtMusic:
            return True

        try:
            YoutubeTrack.YtMusic = YTMusic()
            return True
        except requests.exceptions.SSLError:
            print("""ssl verification error.
        Make sure you are connected to the internet and no firewall is blocking or limiting access to sites like youtube.com""") # pylint: disable=line-too-long
        except Exception as exception: # pylint: disable=broad-except
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
        self._artists = [x.ensure("name", str)
                         for x in dex.ensureCast("artists", JList).iterator().ensureCast(JDict)]
        self._id = dex.ensure("videoId", str)
        self._cover = dex.ensure("thumbnails.[0].url", str)\
                         .replace("w60-h60", "w500-h500")
        self._preview = None
        self._markets: Optional[List[str]] = [ ]

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
        x = re.search(r"(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([a-zA-Z0-9_]+)", url, re.IGNORECASE) # pylint: disable=line-too-long
        assert x
        video = YoutubeTrack.YtMusic.get_song(x.group(1))
        details = video.get("videoDetails")
        results = YoutubeTrack.YtMusic.search(
            f"{details.get('author')} {details.get('title')}", filter = "songs")
        if len(results) > 0:
            return YoutubeTrack(results[0])
        return YoutubeTrack({
            "title": details.get("title"),
            "artists": [{ "name": details.get("author") }]
        })

    @staticmethod
    @_youtubeRequired
    def fromQuery(query: str) -> Optional[List[YoutubeTrack]]:
        """return list of tracks from query"""
        assert YoutubeTrack.YtMusic
        tracks = YoutubeTrack.YtMusic.search(query, filter = "songs")
        return [ YoutubeTrack(track) for track in tracks ]

    @staticmethod
    @_youtubeRequired
    def fromSpotifyTrack(track: SpotifyTrack) -> Optional[YoutubeTrack]:
        """return track from spotify track"""
        assert YoutubeTrack.YtMusic
        results = YoutubeTrack.YtMusic.search(
            f"{' '.join(track.artists)} {track.title}", filter = "songs")
        if len(results) > 0:
            return YoutubeTrack(results[0])
        return None


class SoundcloudTrack(ITrack):
    """soundcloud track model"""
    def __init__(self, track: Track) -> None:
        self._url: str = track.uri
        self._title: str = track.title
        self._album: str = track.album or track.title
        self._artists: List[str] = [ track.artist ]
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
