# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
from __future__ import annotations
from typing import Any, Dict, List, Optional
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

import spotipy # type: ignore

from dataModel.track import SpotifyAlbum


class Releases:
    """Release Radar"""
    def __init__(self, spotify: spotipy.Spotify) -> None:
        self._tracks: List[SpotifyAlbum] = [ ]
        self._artists = Releases.followedArtists(spotify)

        for artist in self._artists:
            try:
                albums = spotify.artist_albums(artist.get("id")).get("items")
            except Exception as exc:
                print(exc)
                continue
            latest: int = self._dateToInt("1990-0-0")
            latestAlbum: Optional[Dict[str, Any]] = None
            for album in albums:
                release = self._dateToInt(album.get("release_date"))
                if release > latest:
                    latest = release
                    latestAlbum = album
            if latestAlbum:
                self._tracks.append(SpotifyAlbum(latestAlbum))

        self._tracks.sort(key = lambda x: self._dateToInt(x.releaseDate),
                          reverse = True)

    @staticmethod
    def followedArtists(spotify: spotipy.Spotify) -> List[Dict[str, Any]]:
        """finds all followed artists"""
        got: int = 50
        artists: Dict[str, Any] = spotify.current_user_followed_artists(limit=50).get("artists")
        fartists: List[Dict[str, Any]] = [ ]
        fartists.extend(artists.get("items") or [ ])
        total: int = artists.get("total") or 0

        while total > got:
            cursors = artists.get("cursors")
            if not cursors:
                break
            after = cursors.get("after")
            artists = spotify.current_user_followed_artists(limit=50, after=after).get("artists")
            fartists.extend(artists.get("items") or [ ])
            got += 50
        return fartists

    def _dateToInt(self, string: str) -> int:
        return int(string.replace("-", ""))

    def toDict(self) -> List[Dict[str, Any]]:
        """serialise"""
        return [ self._trackToDict(track) for track in self._tracks ]

    def _trackToDict(self, track: SpotifyAlbum) -> Dict[str, Any]: # extend with spotify
        return {
            "title": track.title,
            "artists": track.artists,
            "cover": track.cover,
            "url": track.url,
            "releaseDate": track.releaseDate
        }
