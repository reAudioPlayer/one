# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
from __future__ import annotations

from dataModels.song import Song
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

from typing import List, Union, Any, Dict
import spotipy # type: ignore

from db.dbManager import DbManager

from dataModels.track import SpotifyArtist, SpotifyTrack, YoutubeTrack


class Search:
    def __init__(self, tracks: list, spotify: spotipy.Spotify, query: str) -> None:
        self._tracks = tracks
        self._artists = [ ]
        self._spotifyTracks = [ ]
        self._spotifyArtists = [ ]
        self._youtubeTracks = [ ]

        self._youtubeTracks = YoutubeTrack.FromQuery(query)

        try:
            self._spotifyTracks = SpotifyTrack.FromQuery(spotify, query)
            self._spotifyArtists = SpotifyArtist.FromQuery(spotify, query)
        except:
            self._spotifyTracks = [ ]
            self._spotifyArtists = [ ]

    @staticmethod
    def searchTracks(dbManager: DbManager, query: str) -> List[Song]:
        return dbManager.getSongsByQuery(query)

    def toDict(self) -> Dict[str, Any]:
        return {
            "tracks": [ self._trackToDict(track) for track in self._tracks ],
            "artists": [ self._trackToDict(track) for track in self._artists ],
            "spotifyTracks": [ self._trackToDict(track) for track in self._spotifyTracks ],
            "spotifyArtists": [ artist.toDict() for artist in self._spotifyArtists ],
            "youtubeTracks": [ self._trackToDict(track) for track in self._youtubeTracks ]
        }

    def _trackToDict(self, track: Union[SpotifyTrack, YoutubeTrack]) -> Dict[str, Any]: # extend with spotify
        return {
            "title": track._title,
            "album": track._album,
            "artists": track._artists,
            "cover": track._cover,
            "url": track.url,
            "preview": track._preview
        }
