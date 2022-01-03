from __future__ import annotations
import re
from typing import Optional, Union
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

from ytmusicapi import YTMusic

from sclib import SoundcloudAPI, Track

from dataModels.track import SpotifyTrack, YoutubeTrack


class Search:
    def __init__(self, spotify: spotipy.Spotify, query: str) -> None:
        self._tracks = [ ]
        self._artists = [ ]
        self._spotifyTracks = [ ]
        self._spotifyArtists = [ ]
        self._youtubeTracks = [ ]

        self._spotifyTracks = SpotifyTrack.FromQuery(spotify, query)
        self._youtubeTracks = YoutubeTrack.FromQuery(query) 

    def toDict(self) -> dict:
        return {
            "tracks": [ self._trackToDict(track) for track in self._tracks ],
            "artists": [ self._trackToDict(track) for track in self._artists ],
            "spotifyTracks": [ self._trackToDict(track) for track in self._spotifyTracks ],
            "spotifyartists": [ self._trackToDict(track) for track in self._spotifyArtists ],
            "youtubeTracks": [ self._trackToDict(track) for track in self._youtubeTracks ]
        }

    def _trackToDict(self, track: Union[SpotifyTrack, YoutubeTrack]) -> dict: # extend with spotify
        return {
            "title": track._title,
            "album": track._album,
            "artists": track._artists,
            "cover": track._cover,
            "url": track.url
        }
