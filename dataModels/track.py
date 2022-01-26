from __future__ import annotations
from os import stat
import spotipy
from ytmusicapi import YTMusic

from sclib import SoundcloudAPI, Track

import re
from typing import List, Optional


class SpotifyTrack:
    def __init__(self, track: dict) -> None:
        self._title = track.get("name")
        album = track.get("album")
        if album:
            self._album = album.get("name")
            self._cover = album.get("images")[0]["url"]
        elif "images" in track: # probably album
            self._cover = track.get("images")[0]["url"]
            self._release_date = track.get("release_date")
        self._artists = [x.get("name") for x in track.get("artists")] if track.get("artists") else [ ]
        self._id = track.get("id")
        self._preview = track.get("preview_url")
        self._markets = track.get("available_markets")

    @property
    def url(self) -> str:
        return f"https://open.spotify.com/track/{self._id}"

    @staticmethod
    def FromQuery(spotify: spotipy.Spotify, query: str) -> List[SpotifyTrack]:
        tracks = spotify.search(query)["tracks"]["items"]
        return [ SpotifyTrack(track) for track in tracks ]

    @staticmethod
    def FromAlbum(spotify: spotipy.Spotify, id: str) -> List[SpotifyTrack]:
        tracks = spotify.album_tracks(id)["items"]
        return [ SpotifyTrack(track) for track in tracks ]

    @staticmethod
    def FromUrl(spotify: spotipy.Spotify, url: str) -> SpotifyTrack:
        return SpotifyTrack(spotify.track(url))

    @staticmethod
    def FromPlaylist(spotify: spotipy.Spotify, id: str) -> List[SpotifyTrack]:
        tracks = spotify.playlist_tracks(id)["items"]
        return [ SpotifyTrack(track["track"]) for track in tracks ]

    @staticmethod
    def FromArtist(spotify: spotipy.Spotify, id: str) -> List[SpotifyTrack]:
        tracks = spotify.artist_top_tracks(id)["tracks"]
        return [ SpotifyTrack(track) for track in tracks ]

    @staticmethod
    def FromRecommendation(spotify: spotipy.Spotify, artists: Optional[list], tracks: Optional[list]) -> List[SpotifyTrack]:
        tracks = spotify.recommendations(seed_artists=artists, seed_tracks=tracks, limit = 10)["tracks"]
        return [ SpotifyTrack(track) for track in tracks ]

class SpotifyPlaylist:
    def __init__(self, playlist: dict) -> None:
        self._name = playlist.get("name")
        self._description = playlist.get("description")
        self._cover = playlist.get("images")[0]["url"]
        self._id = playlist.get("id")
        self._owner = playlist.get("owner")
        self._trackCount = playlist.get("tracks").get("total")

    def toDict(self) -> dict:
        return {
            "name": self._name,
            "description": self._description,
            "cover": self._cover,
            "id": self._id,
            "owner": self._owner,
            "length": self._trackCount
        }


class SpotifyArtist:
    def __init__(self, artist: dict) -> None:
        self._name = artist.get("name")
        self._id = artist.get("id")
        self._cover = artist.get("images")[0]["url"] if len(artist.get("images")) > 0 else None
        self._description = f"{artist.get('followers')['total']:,} followers"

    @staticmethod
    def FromQuery(spotify: spotipy.Spotify, query: str) -> List[SpotifyArtist]:
        artists = spotify.search(query, type="artist")["artists"]["items"]
        return [ SpotifyArtist(artist) for artist in artists ]

    def toDict(self) -> dict:
        return {
            "name": self._name,
            "description": self._description,
            "cover": self._cover,
            "id": self._id
        }

class SpotifyAlbum:
    def __init__(self, album: dict) -> None:
        self._title = album.get("name")
        if "images" in album: # probably album
            self._cover = album.get("images")[0]["url"]
            self._release_date = album.get("release_date")
        self._artists = [x.get("name") for x in album.get("artists")]
        self._id = album.get("id")

    @property
    def url(self) -> str:
        return f"https://open.spotify.com/album/{self._id}"

ytmusic = YTMusic()


class YoutubeTrack:
    def __init__(self, track: dict) -> None:
        self._title = track["title"]
        album = track.get("album")
        self._album = album.get("name") if album else None
        self._artists = [x.get("name") for x in track.get("artists")]
        self._id = track.get("videoId")
        self._cover = track.get("thumbnails")[0].get("url").replace("w60-h60", "w500-h500")
        self._preview = None
        self._markets = [ ]

    @property
    def url(self) -> str:
        return f"https://music.youtube.com/watch?v={self._id}"

    @staticmethod
    def FromUrl(url: str) -> YoutubeTrack:
        x = re.search(r"(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([a-zA-Z0-9_]+)", url, re.IGNORECASE)
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
    def FromQuery(query: str) -> List[SpotifyTrack]:
        tracks = ytmusic.search(query, filter = "songs")
        return [ YoutubeTrack(track) for track in tracks ]

    @staticmethod
    def FromSpotifyTrack(track: SpotifyTrack) -> Optional[YoutubeTrack]:
        results = ytmusic.search(f"{' '.join(track._artists)} {track._title}", filter = "songs")
        if len(results) > 0:
            return YoutubeTrack(results[0])
        return None

class SoundcloudTrack:
    def __init__(self, track: Track) -> None:
        self._title = track.title
        self._album = track.album or track.title
        self._artists = [ track.artist ]
        self._id = track.id
        self._cover = track.artwork_url.replace("large", "t500x500")
        self._extendedTrack = track
        self._preview = None
        self._markets = [ ]

    @staticmethod
    def FromUrl(url: str) -> SoundcloudTrack:
        track = SoundcloudAPI().resolve(url)
        assert type(track) is Track
        return SoundcloudTrack(track)
