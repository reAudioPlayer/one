# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
from __future__ import annotations
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

from abc import ABC, abstractmethod
import re
from typing import Any, Dict, List, Optional
import requests

import spotipy # type: ignore
from ytmusicapi import YTMusic # type: ignore

from sclib import SoundcloudAPI, Track # type: ignore

from helper.dictTool import DictEx


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
    def __init__(self, track: Dict[str, Any]) -> None:
        dex = DictEx(track)
        self._title = dex.ensureString("name")
        album = dex.ensureDictChain("album")
        if album:
            self._album = album.ensureString("name")
            self._cover = album.ensureListChain("images").ensureDictChain(0).ensureString("url")
        elif "images" in track: # probably album
            self._cover = dex.ensureListChain("images").ensureDictChain(0).ensureString("url")
            self._releaseDate = dex.ensureString("release_date")
        self._artists = [DictEx(x).ensureString("name") for x in dex.ensureList("artists")]
        self._id = dex.ensureString("id")
        self._preview = dex.ensureString("preview_url")
        self._markets = dex.ensureList("available_markets")

    @property
    def markets(self) -> Optional[List[str]]:
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

    @staticmethod
    def fromQuery(spotify: spotipy.Spotify, query: str) -> List[SpotifyTrack]:
        """return list of tracks from query"""
        tracks = DictEx(spotify.search(query)).ensureDictChain("tracks").ensureList("items")
        return [ SpotifyTrack(track) for track in tracks ]

    @staticmethod
    def fromAlbum(spotify: spotipy.Spotify, id_: str) -> List[SpotifyTrack]:
        """return list of tracks from album"""
        tracks = DictEx(spotify.album_tracks(id_)).ensureList("items")
        return [ SpotifyTrack(track) for track in tracks ]

    @staticmethod
    def fromUrl(spotify: spotipy.Spotify, url: str) -> SpotifyTrack:
        """return track from url"""
        return SpotifyTrack(spotify.track(url))

    @staticmethod
    def fromPlaylist(spotify: spotipy.Spotify, id_: str) -> List[SpotifyTrack]:
        """return list of tracks from playlist"""
        tracks = DictEx(spotify.playlist_tracks(id_)).ensureList("items")
        return [ SpotifyTrack(track["track"]) for track in tracks ]

    @staticmethod
    def fromArtist(spotify: spotipy.Spotify, id_: str) -> List[SpotifyTrack]:
        """return list of tracks from artist"""
        tracks = DictEx(spotify.artist_top_tracks(id_)).ensureList("tracks")
        return [ SpotifyTrack(track) for track in tracks ]

    @staticmethod
    def fromRecommendation(spotify: spotipy.Spotify,
                           artists: Optional[List[str]],
                           tracks: Optional[List[str]]) -> List[SpotifyTrack]:
        """return list of tracks from recommendations"""
        recommendations = DictEx(spotify.recommendations(seed_artists=artists,
            seed_tracks=tracks, limit = 10)).ensureList("tracks")
        return [ SpotifyTrack(track) for track in recommendations ]

class SpotifyPlaylist:
    """spotify playlist model"""
    def __init__(self, playlist: Dict[str, Any]) -> None:
        dex = DictEx(playlist)
        self._name = dex.ensureString("name")
        self._description = dex.ensureString("description")
        self._cover = dex.ensureListChain("images").ensureDictChain(0).ensureString("url")
        self._id = dex.ensureString("id")
        self._owner = dex.ensureString("owner")
        self._trackCount = dex.ensureDictChain("tracks").ensureInt("total")

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
        dex = DictEx(artist)
        self._name = dex.ensureString("name")
        self._id = dex.ensureString("id")
        self._cover = dex.ensureListChain("images").ensureDictChain(0).ensureString("url")
        self._description = f"{dex.ensureDictChain('followers').ensureInt('total'):,} followers"

    @staticmethod
    def fromQuery(spotify: spotipy.Spotify, query: str) -> List[SpotifyArtist]:
        """return list of artists from query"""
        artists = DictEx(spotify.search(query, type="artist"))\
                    .ensureDictChain("artists")\
                    .ensureList("items")
        return [ SpotifyArtist(artist) for artist in artists ]

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
        dex = DictEx(album)
        self._title = dex.ensureString("name")
        self._cover = dex.ensureListChain("images").ensureDictChain(0).ensureString("url")
        self._releaseDate = dex.ensureString("release_date")
        self._artists = [DictEx(x).ensureString("name") for x in dex.ensureList("artists")]
        self._id = dex.ensureString("id")

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


try:
    ytmusic = YTMusic()
except requests.exceptions.SSLError:
    print("""ssl verification error.
Make sure you are connected to the internet and no firewall is blocking or limiting access to sites like youtube.com""") # pylint: disable=line-too-long
    import time, sys # pylint: disable=ungrouped-imports, multiple-imports
    time.sleep(5)
    sys.exit()
except Exception as e:
    print(e)


class YoutubeTrack(ITrack):
    """youtube track model"""
    def __init__(self, track: Dict[str, Any]) -> None:
        dex = DictEx(track)
        self._title = dex.ensureString("title")
        album = dex.ensureDictChain("album")
        self._album = album.ensureString("name")
        self._artists = [DictEx(x).ensureString("name") for x in dex.ensureList("artists")]
        self._id = dex.ensureString("videoId")
        self._cover = dex.ensureListChain("thumbnails")\
                        .ensureDictChain(0)\
                        .ensureString("url")\
                        .replace("w60-h60", "w500-h500")
        self._preview = None
        self._markets: Optional[List[str]] = [ ]

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
    def fromUrl(url: str) -> YoutubeTrack:
        """return track from url"""
        x = re.search(r"(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([a-zA-Z0-9_]+)", url, re.IGNORECASE) # pylint: disable=line-too-long
        assert x
        video = ytmusic.get_song(x.group(1))
        details = video.get("videoDetails")
        results = ytmusic.search(
            f"{details.get('author')} {details.get('title')}", filter = "songs")
        if len(results) > 0:
            return YoutubeTrack(results[0])
        return YoutubeTrack({
            "title": details.get("title"),
            "artists": [{ "name": details.get("author") }]
        })

    @staticmethod
    def fromQuery(query: str) -> List[YoutubeTrack]:
        """return list of tracks from query"""
        tracks = ytmusic.search(query, filter = "songs")
        return [ YoutubeTrack(track) for track in tracks ]

    @staticmethod
    def fromSpotifyTrack(track: SpotifyTrack) -> Optional[YoutubeTrack]:
        """return track from spotify track"""
        results = ytmusic.search(f"{' '.join(track.artists)} {track.title}", filter = "songs")
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
