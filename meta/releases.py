from __future__ import annotations
import spotipy

from dataModels.track import SpotifyAlbum, SpotifyTrack


class Releases:
    def __init__(self, spotify: spotipy.Spotify) -> None:
        got = 50
        artists: dict = spotify.current_user_followed_artists(limit=50).get("artists")
        self._artists = [ ]
        self._tracks = [ ]
        self._artists.extend(artists.get("items"))
        total = artists.get("total")

        while total > got:
            after = artists.get("cursors").get("after")
            artists: dict = spotify.current_user_followed_artists(limit=50, after=after).get("artists")
            self._artists.extend(artists.get("items"))
            got += 50

        for artist in self._artists:
            albums = spotify.artist_albums(artist.get("id")).get("items")
            latest: int = self._dateToInt("1990-0-0")
            latestAlbum = None
            for album in albums:
                release = self._dateToInt(album.get("release_date"))
                if release > latest:
                    latest = release
                    latestAlbum = album
            self._tracks.append(SpotifyAlbum(latestAlbum))

        self._tracks.sort(key=lambda x: self._dateToInt(x._release_date), reverse=True)


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
