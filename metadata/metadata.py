from __future__ import annotations
import re
from typing import Optional
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

from ytmusicapi import YTMusic

from sclib import SoundcloudAPI, Track

import validators


class SpotifyTrack:
    def __init__(self, track: dict) -> None:
        self._title = track.get("name")
        album = track.get("album")
        if album:
            self._album = album.get("name")
            self._cover = album.get("images")[0]["url"]
        self._artists = [x.get("name") for x in track.get("artists")]
        self._id = track.get("id")

    @staticmethod
    def FromUrl(spotify: spotipy.Spotify, url: str) -> SpotifyTrack:
        return SpotifyTrack(spotify.track(url))

class YoutubeTrack:
    def __init__(self, track: dict) -> None:
        print(track)
        self._title = track["title"]
        album = track.get("album")
        if album:
            self._album = album.get("name")
        self._artists = [x.get("name") for x in track.get("artists")]
        self._id = track.get("videoId")
        self._cover = track.get("thumbnails")[0].get("url").replace("w60-h60", "w500-h500")

    @staticmethod
    def FromUrl(url: str) -> YoutubeTrack:
        x = re.search(r"(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([a-zA-Z0-9_]+)", url, re.IGNORECASE)
        video = YTMusic().get_song(x.group(1))
        details = video.get("videoDetails")
        results = YTMusic().search(f"{details.get('author')} {details.get('title')}", filter = "songs")
        if len(results) > 0:
            return YoutubeTrack(results[0])
        return YoutubeTrack({
            "title": details.get("title"),
            "artists": [{ "name": details.get("author") }]
        })

    @staticmethod
    def FromSpotifyTrack(track: SpotifyTrack) -> Optional[YoutubeTrack]:
        results = YTMusic().search(f"{' '.join(track._artists)} {track._title}", filter = "songs")
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

    @staticmethod
    def FromUrl(url: str) -> SoundcloudTrack:
        track = SoundcloudAPI().resolve(url)
        assert type(track) is Track
        return SoundcloudTrack(track)

class Metadata:
    def __init__(self, spotify: spotipy.Spotify, url: str) -> None:
        self._track = None
        self._src = None
        if not validators.url(url):
            return
        if "youtu" in url:
            self._src = url
            self._track = YoutubeTrack.FromUrl(url)
        elif "spotify" in url:
            self._track = SpotifyTrack.FromUrl(spotify, url)
            self._src = f"https://music.youtube.com/watch?v={YoutubeTrack.FromSpotifyTrack(self._track)._id}"
        elif "soundcloud" in url:
            self._src = url
            self._track = SoundcloudTrack.FromUrl(url)

    def toDict(self) -> dict: # extend with spotify
        return {
            "title": self._track._title,
            "album": self._track._album,
            "artists": self._track._artists,
            "cover": self._track._cover,
            "src": self._src
        }

"""
uri = 'https://open.spotify.com/track/6jYUObC5Aeif5gHD1oELVo?si=4c0f2943a6c54c01'

spotify = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials(client_id="c8e963f8a6a942b58712cc34e2ccc76d", client_secret="6ec48f7d1b574bd6b340384c50675447"))
result = SpotifyTrack.FromUrl(spotify, uri)

print(result._title)
print(result._album)
print(result._cover)
print(result._artists)
print(result._id)

print("--------------------")

result = YoutubeTrack.FromUrl("https://music.youtube.com/watch?v=IyCnYlOOaB8&list=RDAMVMIyCnYlOOaB8")

print(result._title)
print(result._album)
print(result._artists)
print(result._id)

print("--------------------")

url = "https://soundcloud.com/basshouse-music/castion-reeva-never-be-forgotten-bhm044"
result = SoundcloudTrack.FromUrl(url)

print(result._title)
print(result._album)
print(result._cover)
print(result._artists)
print(result._id)
"""