from __future__ import annotations
import spotipy
from spotipy.client import Spotify

from dataModels.track import SpotifyAlbum, SpotifyTrack


class Releases:
    def __init__(self, spotify: spotipy.Spotify) -> None:
        self._tracks = [ ]
        self._artists = Releases.followedArtists(spotify)

        for artist in self._artists:
            try:
                albums = spotify.artist_albums(artist.get("id")).get("items")
            except Exception as e:
                print(e)
                continue
            latest: int = self._dateToInt("1990-0-0")
            latestAlbum = None
            for album in albums:
                release = self._dateToInt(album.get("release_date"))
                if release > latest:
                    latest = release
                    latestAlbum = album
            self._tracks.append(SpotifyAlbum(latestAlbum))

        self._tracks.sort(key=lambda x: self._dateToInt(x._release_date), reverse=True)

    @staticmethod
    def followedArtists(spotify: spotipy.Spotify) -> list:
        got = 50
        artists: dict = spotify.current_user_followed_artists(limit=50).get("artists")
        fartists = [ ]
        fartists.extend(artists.get("items"))
        total = artists.get("total")

        while total > got:
            after = artists.get("cursors").get("after")
            artists: dict = spotify.current_user_followed_artists(limit=50, after=after).get("artists")
            fartists.extend(artists.get("items"))
            got += 50
        return fartists

    def _dateToInt(self, string: str) -> int:
        return int(string.replace("-", ""))

    def toDict(self) -> list:
        return [ self._trackToDict(track) for track in self._tracks ]

    def _trackToDict(self, track: SpotifyAlbum) -> dict: # extend with spotify
        return {
            "title": track._title,
            "artists": track._artists,
            "cover": track._cover,
            "url": track.url,
            "releaseDate": track._release_date
        }
