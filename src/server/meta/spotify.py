# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
from __future__ import annotations
from functools import wraps
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

from enum import Enum
from typing import Any, Callable, Dict, Generic, List, Optional, ParamSpec, TypeVar

from aiohttp import web
import spotipy # type: ignore
from spotipy.exceptions import SpotifyException # type: ignore

from handler.spotifyAuth import SpotifyAuth
from dataModel.track import SpotifyArtist, SpotifyTrack, SpotifyPlaylist, SpotifyAlbum
from helper.dictTool import DictEx


P = ParamSpec('P')
U = TypeVar("U")


class SpotifyState(Enum):
    """state of the spotify connection"""
    Disabled = web.HTTPServiceUnavailable
    Unauthorised = web.HTTPUnauthorized
    Authorised = web.Response
    QuoteExceeded = web.HTTPTooManyRequests
    InternalError = web.HTTPInternalServerError

    @staticmethod
    def isSuccess(state: SpotifyState) -> bool:
        """Returns if the state is success"""
        return state == SpotifyState.Authorised


T = TypeVar('T')
S = TypeVar('S')


class SpotifyResult(Generic[T]):
    """result of a spotify operation"""
    def __init__(self, state: SpotifyState, data: Optional[T] = None) -> None:
        self._state = state
        self._data = data

    @staticmethod
    def successResult(data: T) -> SpotifyResult[T]:
        """Returns a success result"""
        return SpotifyResult(SpotifyState.Authorised, data)

    @staticmethod
    def errorResult(state = SpotifyState.Disabled) -> SpotifyResult[T]:
        """Returns an error result"""
        return SpotifyResult(state)

    @property
    def state(self) -> SpotifyState:
        """state of the operation"""
        return self._state

    def httpResponse(self) -> web.Response:
        """Returns the http response of the operation"""
        return self._state.value()

    def success(self) -> bool:
        """Returns if the operation was successful"""
        return SpotifyState.isSuccess(self._state)

    def __bool__(self) -> bool:
        """Returns if the operation was successful"""
        return self.success()

    @property
    def data(self) -> Optional[T]:
        """data of the operation"""
        return self._data

    def unwrap(self) -> T:
        """Returns the data of the operation"""
        if not self.success():
            raise Exception("unwrap called on error result")
        return self._data

    def unwrapOr(self, value: T) -> T:
        """Returns the data of the operation or a default value"""
        if not self.success():
            return value
        return self._data

    def map(self, func: S) -> SpotifyResult[S]:
        """Maps the result"""
        if not self.success():
            return SpotifyResult(self._state)
        return SpotifyResult.successResult(func(self._data))

    def transform(self, value: S) -> SpotifyResult[S]:
        """Transforms the result"""
        if not self.success():
            return SpotifyResult(self._state)
        return SpotifyResult.successResult(value)


def _mayFail(func: Callable[P, U]) -> Callable[P, U]:
    @wraps(func)
    def wrapper(self: Spotify, *args: Any, **kwargs: Any) -> Any:
        try:
            return func(self, *args, **kwargs)
        except SpotifyException as exc:
            if exc.http_status == 401:
                self.auth.invalidate()
                return SpotifyResult.errorResult(SpotifyState.Unauthorised)

            if exc.http_status == 429:
                return SpotifyResult.errorResult(SpotifyState.QuoteExceeded)

            print(exc)
            return SpotifyResult.errorResult(SpotifyState.InternalError)
        except Exception as exc:
            print(exc)
            return SpotifyResult.errorResult(SpotifyState.InternalError)
    return wrapper


class Spotify:
    """spotify api wrapper"""
    def __init__(self) -> None:
        self._connected = False
        self._spotify: Optional[spotipy.Spotify] = None
        self._auth = SpotifyAuth()

    def _connect(self) -> bool:
        """Connects to Spotify"""
        if self._auth.isDisabled():
            return False
        if not self._auth.isAuth():
            return False
        if not self._connected:
            self._spotify = spotipy.Spotify(auth_manager = SpotifyAuth.getSpotifyAuth())
            self._connected = True
        return self._connected

    @property
    def auth(self) -> SpotifyAuth:
        """Spotify auth"""
        return self._auth

    @_mayFail
    def track(self, trackId: str) -> SpotifyResult[SpotifyTrack]:
        """Returns a track"""
        if not self._connect():
            return SpotifyResult.errorResult()
        track: Dict[str, Any] = self._spotify.track(trackId)
        return SpotifyResult.successResult(SpotifyTrack(track))

    @_mayFail
    def url(self, url: str) -> SpotifyResult[SpotifyTrack]:
        """Returns a track from a url"""
        if not self._connect():
            return SpotifyResult.errorResult()

        track = self._spotify.track(url)
        return SpotifyResult.successResult(SpotifyTrack(track))

    @_mayFail
    def searchTrack(self, query: str) -> SpotifyResult[List[SpotifyTrack]]:
        """Searches for a track"""
        if not self._connect():
            return SpotifyResult.errorResult()

        search = self._spotify.search(query, limit = 10, type = "track")
        tracks = DictEx(search).ensureDictChain("tracks").ensureList("items")
        return SpotifyResult.successResult([SpotifyTrack(track) for track in tracks])

    @_mayFail
    def searchArtist(self, query: str) -> SpotifyResult[List[SpotifyArtist]]:
        """Searches for an artist"""
        if not self._connect():
            return SpotifyResult.errorResult()

        search = self._spotify.search(query, limit = 10, type = "artist")
        artists = DictEx(search).ensureDictChain("artists").ensureList("items")
        return SpotifyResult.successResult([SpotifyArtist(artist) for artist in artists])

    @_mayFail
    def playlistTracks(self, playlistId: str) -> SpotifyResult[List[SpotifyTrack]]:
        """Returns the tracks from a playlist"""
        if not self._connect():
            return SpotifyResult.errorResult()

        tracks = self._spotify.playlist_items(playlistId)
        tracks = DictEx(tracks).ensureList("items")
        return SpotifyResult.successResult([SpotifyTrack(track) for track in tracks])

    @_mayFail
    def albumTracks(self, albumId: str) -> SpotifyResult[List[SpotifyTrack]]:
        """Returns the tracks from an album"""
        if not self._connect():
            return SpotifyResult.errorResult()

        tracks = self._spotify.album_tracks(albumId)
        tracks = DictEx(tracks).ensureList("items")
        return SpotifyResult.successResult([SpotifyTrack(track) for track in tracks])

    @_mayFail
    def artistTracks(self, artistId: str) -> SpotifyResult[List[SpotifyTrack]]:
        """Returns the tracks from an artist"""
        if not self._connect():
            return SpotifyResult.errorResult()

        tracks = self._spotify.artist_top_tracks(artistId)
        tracks = DictEx(tracks).ensureList("tracks")
        return SpotifyResult.successResult([SpotifyTrack(track) for track in tracks])

    @_mayFail
    def artistAlbums(self, artistId: str) -> SpotifyResult[List[SpotifyAlbum]]:
        """Returns the albums from an artist"""
        if not self._connect():
            return SpotifyResult.errorResult()

        albums = self._spotify.artist_albums(artistId)
        albums = DictEx(albums).ensureList("items")
        return SpotifyResult.successResult([SpotifyAlbum(album) for album in albums])

    @_mayFail
    def recommendations(self,
                        seedArtists: List[str],
                        seedTracks: List[str],
                        seedGenres: List[str]) -> SpotifyResult[List[SpotifyTrack]]:
        """Returns recommendations"""
        if not self._connect():
            return SpotifyResult.errorResult()

        tracks = self._spotify.recommendations(seed_artists = seedArtists,
                                               seed_tracks = seedTracks,
                                               seed_genres = seedGenres)
        tracks = DictEx(tracks).ensureList("tracks")
        return SpotifyResult.successResult([SpotifyTrack(track) for track in tracks])

    @_mayFail
    def userPlaylists(self) -> SpotifyResult[List[SpotifyPlaylist]]:
        """Returns the user's playlists"""
        if not self._connect():
            return SpotifyResult.errorResult()

        playlists = self._spotify.current_user_playlists()
        playlists = DictEx(playlists).ensureList("items")
        return SpotifyResult.successResult([SpotifyPlaylist(playlist) for playlist in playlists])

    @_mayFail
    def userArtists(self) -> SpotifyResult[List[SpotifyArtist]]:
        """Returns the user's artists"""
        if not self._connect():
            return SpotifyResult.errorResult()

        artists = self._spotify.current_user_top_artists()
        artists = DictEx(artists).ensureList("items")
        return SpotifyResult.successResult([SpotifyArtist(artist) for artist in artists])

    @_mayFail
    def allUserArtists(self) -> SpotifyResult[List[SpotifyArtist]]:
        """Returns all the user's artists"""
        if not self._connect():
            return SpotifyResult.errorResult()

        got: int = 50

        result = self._spotify.current_user_followed_artists(limit=50)
        artists = DictEx(result).ensure("artists", DictEx)
        fartists: List[Dict[str, Any]] = [ ]
        fartists.extend(artists.ensure("items", list))
        total: int = artists.ensure("total", int)

        while total > got:
            cursors = artists.get("cursors")
            if not cursors:
                break
            after = cursors.get("after")
            result = self._spotify.current_user_followed_artists(limit=50, after=after)
            artists = DictEx(result).ensure("artists", DictEx)
            fartists.extend(artists.ensure("items", list))
            got += 50

        return SpotifyResult.successResult([SpotifyArtist(artist) for artist in fartists])
