# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
from __future__ import annotations
__copyright__ = "Copyright (c) 2022 https://github.com/reAudioPlayer"

from typing import Any, Dict, List, Optional

from meta.spotify import Spotify
from dataModel.track import SpotifyAlbum


class Releases:
    """Release Radar"""
    def __init__(self, spotify: Spotify) -> None:
        self._tracks: List[SpotifyAlbum] = [ ]
        self._artists = spotify.allUserArtists().unwrapOr([])

        for artist in self._artists:
            result = spotify.artistAlbums(artist.id)
            if not result:
                continue
            albums = result.unwrap()

            latest: int = self._dateToInt("1990-0-0")
            latestAlbum: Optional[SpotifyAlbum] = None
            for album in albums:
                release = self._dateToInt(album.releaseDate)
                if release > latest:
                    latest = release
                    latestAlbum = album
            if latestAlbum:
                self._tracks.append(latestAlbum)

        self._tracks.sort(key = lambda x: self._dateToInt(x.releaseDate),
                          reverse = True)

    def _dateToInt(self, string: str) -> int:
        return int(string.replace("-", ""))

    def toDict(self) -> List[Dict[str, Any]]:
        """serialise"""
        return [ self._trackToDict(track) for track in self._tracks ]

    def _trackToDict(self, track: SpotifyAlbum) -> Dict[str, Any]: # extend with spotify
        return {
            "title": track.title,
            "artists": track.artists,
            "artist": ", ".join(track.artists),
            "cover": track.cover,
            "url": track.url,
            "releaseDate": track.releaseDate
        }
