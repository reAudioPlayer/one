# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
from __future__ import annotations
__copyright__ = "Copyright (c) 2022 https://github.com/reAudioPlayer"

from typing import List, Any, Dict

from db.database import Database
from meta.spotify import Spotify

from dataModel.track import YoutubeTrack
from dataModel.song import ITrack, Song


class Search:
    """search engine"""
    def __init__(self, tracks: List[Song], spotify: Spotify, query: str) -> None:
        self._tracks = tracks
        #self._artists = [ ]
        self._spotifyTracks = [ ]
        self._spotifyArtists = [ ]
        self._youtubeTracks = [ ]

        self._youtubeTracks = YoutubeTrack.fromQuery(query) or []

        self._spotifyTracks = spotify.searchTrack(query).unwrapOr([])
        self._spotifyArtists = spotify.searchArtist(query).unwrapOr([])

    @staticmethod
    async def searchTracks(query: str) -> List[Song]:
        """searches for tracks"""
        return Song.list(await Database().songs.search(query))

    def toDict(self) -> Dict[str, Any]:
        """serialise"""
        return {
            "tracks": [ track.toDict() for track in self._tracks ],
        #    "artists": [ self._trackToDict(track) for track in self._artists ],
            "spotifyTracks": [ self._trackToDict(track) for track in self._spotifyTracks ],
            "spotifyArtists": [ artist.toDict() for artist in self._spotifyArtists ],
            "youtubeTracks": [ self._trackToDict(track) for track in self._youtubeTracks ]
        }

    def _trackToDict(self, track: ITrack) -> Dict[str, Any]: # extend with spotify
        return {
            "title": track.title,
            "album": track.album,
            "artists": track.artists,
            "cover": track.cover,
            "url": track.url,
            "preview": track.preview
        }
