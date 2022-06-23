# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
from __future__ import annotations

import requests
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

from abc import ABC, abstractproperty

import spotipy
from ytmusicapi import YTMusic

from sclib import SoundcloudAPI, Track

import re
from typing import Any, Dict, List, Optional

from helper.dictTool import DictEx


class ITrack(ABC):
    @abstractproperty
    def title(self) -> str:
        pass

    @abstractproperty
    def album(self) -> str:
        pass

    @abstractproperty
    def artists(self) -> List[str]:
        pass

    @abstractproperty
    def cover(self) -> str:
        pass

    @abstractproperty
    def url(self) -> str:
        pass

    @property
    def preview(self) -> Optional[str]:
        return None

    @property
    def markets(self) -> Optional[List[str]]:
        return None


class SpotifyTrack(ITrack):
    def __init__(self, track: Dict[str, Any]) -> None:
        ed: DictEx = DictEx(track)
        self._title = ed.ensureString("name")
        album = ed.ensureDictChain("album")
        if album:
            self._album = album.ensureString("name")
            self._cover = album.ensureListChain("images").ensureDictChain(0).ensureString("url")
        elif "images" in track: # probably album
            self._cover = ed.ensureListChain("images").ensureDictChain(0).ensureString("url")
            self._release_date = ed.ensureString("release_date")
        self._artists = [DictEx(x).ensureString("name") for x in ed.ensureList("artists")]
        self._id = ed.ensureString("id")
        self._preview = ed.ensureString("preview_url")
        self._markets = ed.ensureList("available_markets")

    @property
    def markets(self) -> Optional[List[str]]:
        return self._markets

    @property
    def artists(self) -> List[str]:
        return self._artists

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
        return f"https://open.spotify.com/track/{self._id}"

    @staticmethod
    def FromQuery(spotify: spotipy.Spotify, query: str) -> List[SpotifyTrack]:
        tracks = DictEx(spotify.search(query)).ensureDictChain("tracks").ensureList("items")
        return [ SpotifyTrack(track) for track in tracks ]

    @staticmethod
    def FromAlbum(spotify: spotipy.Spotify, id: str) -> List[SpotifyTrack]:
        tracks = DictEx(spotify.album_tracks(id)).ensureList("items")
        return [ SpotifyTrack(track) for track in tracks ]

    @staticmethod
    def FromUrl(spotify: spotipy.Spotify, url: str) -> SpotifyTrack:
        return SpotifyTrack(spotify.track(url))

    @staticmethod
    def FromPlaylist(spotify: spotipy.Spotify, id: str) -> List[SpotifyTrack]:
        tracks = DictEx(spotify.playlist_tracks(id)).ensureList("items")
        return [ SpotifyTrack(track["track"]) for track in tracks ]

    @staticmethod
    def FromArtist(spotify: spotipy.Spotify, id: str) -> List[SpotifyTrack]:
        tracks = DictEx(spotify.artist_top_tracks(id)).ensureList("tracks")
        return [ SpotifyTrack(track) for track in tracks ]

    @staticmethod
    def FromRecommendation(spotify: spotipy.Spotify, artists: Optional[List[str]], tracks: Optional[List[str]]) -> List[SpotifyTrack]:
        recommendations = DictEx(spotify.recommendations(seed_artists=artists, seed_tracks=tracks, limit = 10)).ensureList("tracks")
        return [ SpotifyTrack(track) for track in recommendations ]

class SpotifyPlaylist:
    def __init__(self, playlist: Dict[str, Any]) -> None:
        ed = DictEx(playlist)
        self._name = ed.ensureString("name")
        self._description = ed.ensureString("description")
        self._cover = ed.ensureListChain("images").ensureDictChain(0).ensureString("url")
        self._id = ed.ensureString("id")
        self._owner = ed.ensureString("owner")
        self._trackCount = ed.ensureDictChain("tracks").ensureInt("total")

    def toDict(self) -> Dict[str, Any]:
        return {
            "name": self._name,
            "description": self._description,
            "cover": self._cover,
            "id": self._id,
            "owner": self._owner,
            "length": self._trackCount
        }


class SpotifyArtist:
    def __init__(self, artist: Dict[str, Any]) -> None:
        ed = DictEx(artist)
        self._name = ed.ensureString("name")
        self._id = ed.ensureInt("id")
        self._cover = ed.ensureListChain("images").ensureDictChain(0).ensureString("url")
        self._description = f"{ed.ensureDictChain('followers').ensureInt('total'):,} followers"

    @staticmethod
    def FromQuery(spotify: spotipy.Spotify, query: str) -> List[SpotifyArtist]:
        artists = spotify.search(query, type="artist")["artists"]["items"]
        return [ SpotifyArtist(artist) for artist in artists ]

    def toDict(self) -> Dict[str, Any]:
        return {
            "name": self._name,
            "description": self._description,
            "cover": self._cover,
            "id": self._id
        }

class SpotifyAlbum:
    def __init__(self, album: Dict[str, Any]) -> None:
        ed = DictEx(album)
        self._title = ed.ensureString("name")
        if "images" in album: # probably album
            self._cover = ed.ensureListChain("images").ensureDictChain(0).ensureString("url")
            self._release_date = album.get("release_date")
        self._artists = [DictEx(x).ensureString("name") for x in ed.ensureList("artists")]
        self._id = album.get("id")

    @property
    def url(self) -> str:
        return f"https://open.spotify.com/album/{self._id}"


try:
    ytmusic = YTMusic()
except requests.exceptions.SSLError:
    print("ssl verification error.\nMake sure you are connected to the internet and no firewall is blocking or limiting access to sites like youtube.com")
    import time, sys # pylint: disable=ungrouped-imports, multiple-imports
    time.sleep(5)
    sys.exit()


class YoutubeTrack(ITrack):
    def __init__(self, track: Dict[str, Any]) -> None:
        ed = DictEx(track)
        self._title = ed.ensureString("title")
        album = ed.ensureDictChain("album")
        self._album = album.ensureString("name")
        self._artists = [DictEx(x).ensureString("name") for x in ed.ensureList("artists")]
        self._id = ed.ensureString("videoId")
        self._cover = ed.ensureListChain("thumbnails")\
                        .ensureDictChain(0)\
                        .ensureString("url")\
                        .replace("w60-h60", "w500-h500")
        self._preview = None
        self._markets: Optional[List[str]] = [ ]

    @property
    def artists(self) -> List[str]:
        return self._artists

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
    def FromUrl(url: str) -> YoutubeTrack:
        x = re.search(r"(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([a-zA-Z0-9_]+)", url, re.IGNORECASE)
        assert x
        video = ytmusic.get_song(x.group(1))
        details = video.get("videoDetails")
        results = ytmusic.search(f"{details.get('author')} {details.get('title')}", filter = "songs")
        if len(results) > 0:
            return YoutubeTrack(results[0])
        return YoutubeTrack({
            "title": details.get("title"),
            "artists": [{ "name": details.get("author") }]
        })

    @staticmethod
    def FromQuery(query: str) -> List[YoutubeTrack]:
        tracks = ytmusic.search(query, filter = "songs")
        return [ YoutubeTrack(track) for track in tracks ]

    @staticmethod
    def FromSpotifyTrack(track: SpotifyTrack) -> Optional[YoutubeTrack]:
        results = ytmusic.search(f"{' '.join(track._artists)} {track._title}", filter = "songs")
        if len(results) > 0:
            return YoutubeTrack(results[0])
        return None

class SoundcloudTrack(ITrack):
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
    def FromUrl(url: str) -> SoundcloudTrack:
        track = SoundcloudAPI().resolve(url)
        assert type(track) is Track
        return SoundcloudTrack(track)

    @property
    def artists(self) -> List[str]:
        return self._artists

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
