# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
from __future__ import annotations
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

from functools import wraps
from enum import Enum
from typing import Any, Callable, Dict, Generic, List, Optional, ParamSpec, Type, TypeVar

from aiohttp import web
from pyaddict import JDict, JList
import spotipy # type: ignore
from spotipy.exceptions import SpotifyException # type: ignore

from handler.spotifyAuth import SpotifyAuth
from dataModel.track import SpotifyArtist, SpotifyTrack, SpotifyPlaylist, SpotifyAlbum


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
    def errorResult(state: SpotifyState = SpotifyState.Disabled) -> SpotifyResult[T]:
        """Returns an error result"""
        return SpotifyResult(state)

    @property
    def state(self) -> SpotifyState:
        """state of the operation"""
        return self._state

    def httpResponse(self) -> web.Response:
        """Returns the http response of the operation"""
        response: Type[web.Response] = self._state.value
        return response()

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
        assert self._data is not None
        return self._data

    def unwrapOr(self, value: T) -> T:
        """Returns the data of the operation or a default value"""
        if not self.success():
            return value
        assert self._data is not None
        return self._data

    def map(self, func: Callable[..., S]) -> SpotifyResult[S]:
        """Maps the result"""
        if not self.success():
            return SpotifyResult(self._state)
        return SpotifyResult.successResult(func(self._data))

    def transform(self, value: S) -> SpotifyResult[S]:
        """Transforms the result"""
        if not self.success():
            return SpotifyResult(self._state)
        return SpotifyResult.successResult(value)


def _connectionRequired(func: Callable[P, U]) -> Callable[P, U]:
    @wraps(func)
    def wrapper(self: Spotify, *args: Any, **kwargs: Any) -> Any:
        if self._auth.isDisabled(): # pylint: disable=protected-access
            return SpotifyResult.errorResult(SpotifyState.Disabled)
        if not self.connect():
            return SpotifyResult.errorResult(SpotifyState.Unauthorised)
        return func(self, *args, **kwargs) # type: ignore
    return wrapper # type: ignore


def _mayFail(func: Callable[P, U]) -> Callable[P, U]:
    @wraps(func)
    def wrapper(self: Spotify, *args: Any, **kwargs: Any) -> Any:
        try:
            return func(self, *args, **kwargs) # type: ignore
        except SpotifyException as exc:
            print(exc)

            if exc.http_status == 401:
                self.auth.invalidate()
                return SpotifyResult.errorResult(SpotifyState.Unauthorised)

            if exc.http_status == 429:
                return SpotifyResult.errorResult(SpotifyState.QuoteExceeded)

            print(exc)
            return SpotifyResult.errorResult(SpotifyState.InternalError)
        except Exception as exc: # pylint: disable=broad-except
            print(exc)
            return SpotifyResult.errorResult(SpotifyState.InternalError)
    return wrapper # type: ignore


class Spotify:
    """spotify api wrapper"""
    def __init__(self) -> None:
        self._connected = False
        self._spotify: Optional[spotipy.Spotify] = None
        self._auth = SpotifyAuth()

    def connect(self) -> bool:
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

    @_connectionRequired
    @_mayFail
    def track(self, trackId: str) -> SpotifyResult[SpotifyTrack]:
        """Returns a track"""
        assert self._spotify is not None
        track: Dict[str, Any] = self._spotify.track(trackId)
        return SpotifyResult.successResult(SpotifyTrack(track))

    @_connectionRequired
    @_mayFail
    def url(self, url: str) -> SpotifyResult[SpotifyTrack]:
        """Returns a track from a url"""
        assert self._spotify is not None
        track = self._spotify.track(url)
        return SpotifyResult.successResult(SpotifyTrack(track))

    @_connectionRequired
    @_mayFail
    def searchTrack(self, query: str) -> SpotifyResult[List[SpotifyTrack]]:
        """Searches for a track"""
        assert self._spotify is not None
        search = self._spotify.search(query, limit = 10, type = "track")
        tracks = JDict(search).chain().ensure("tracks.items", list)
        return SpotifyResult.successResult([SpotifyTrack(track) for track in tracks])

    @_connectionRequired
    @_mayFail
    def searchArtist(self, query: str) -> SpotifyResult[List[SpotifyArtist]]:
        """Searches for an artist"""
        assert self._spotify is not None
        search = self._spotify.search(query, limit = 10, type = "artist")
        artists = JDict(search).chain().ensure("artists.items", list)
        return SpotifyResult.successResult([SpotifyArtist(artist) for artist in artists])

    @_connectionRequired
    @_mayFail
    def playlistTracks(self, playlistId: str) -> SpotifyResult[List[SpotifyTrack]]:
        """Returns the tracks from a playlist"""
        assert self._spotify is not None
        items = self._spotify.playlist_items(playlistId)
        tracks = [
            track.ensure("track", dict)
            for track in
            JDict(items).ensureCast("items", JList).iterator().ensureCast(JDict) ]
        return SpotifyResult.successResult([SpotifyTrack(track) for track in tracks])

    @_connectionRequired
    @_mayFail
    def albumTracks(self, albumId: str) -> SpotifyResult[List[SpotifyTrack]]:
        """Returns the tracks from an album"""
        assert self._spotify is not None
        tracks = self._spotify.album_tracks(albumId)
        tracks = JDict(tracks).ensure("items", list)
        return SpotifyResult.successResult([SpotifyTrack(track) for track in tracks])

    @_connectionRequired
    @_mayFail
    def artistTracks(self, artistId: str) -> SpotifyResult[List[SpotifyTrack]]:
        """Returns the tracks from an artist"""
        assert self._spotify is not None
        tracks = self._spotify.artist_top_tracks(artistId)
        tracks = JDict(tracks).ensure("tracks", list)
        return SpotifyResult.successResult([SpotifyTrack(track) for track in tracks])

    @_connectionRequired
    @_mayFail
    def artistAlbums(self, artistId: str) -> SpotifyResult[List[SpotifyAlbum]]:
        """Returns the albums from an artist"""
        assert self._spotify is not None
        albums = self._spotify.artist_albums(artistId)
        albums = JDict(albums).ensure("items", list)
        return SpotifyResult.successResult([SpotifyAlbum(album) for album in albums])

    @_connectionRequired
    @_mayFail
    def recommendations(self,
                        seedArtists: List[str],
                        seedTracks: List[str],
                        seedGenres: List[str]) -> SpotifyResult[List[SpotifyTrack]]:
        """Returns recommendations"""
        assert self._spotify is not None
        if len([*seedTracks, *seedArtists, *seedGenres]) < 1:
            return SpotifyResult.successResult([])
        tracks = self._spotify.recommendations(seed_artists = seedArtists,
                                               seed_tracks = seedTracks,
                                               seed_genres = seedGenres,
                                               limit = 10)
        tracks = JDict(tracks).ensure("tracks", list)
        return SpotifyResult.successResult([SpotifyTrack(track) for track in tracks])

    @_connectionRequired
    @_mayFail
    def userPlaylists(self) -> SpotifyResult[List[SpotifyPlaylist]]:
        """Returns the user's playlists"""
        assert self._spotify is not None
        playlists = self._spotify.current_user_playlists()
        playlists = JDict(playlists).ensure("items", list)
        return SpotifyResult.successResult([SpotifyPlaylist(playlist) for playlist in playlists])

    @_connectionRequired
    @_mayFail
    def userArtists(self) -> SpotifyResult[List[SpotifyArtist]]:
        """Returns the user's artists"""
        assert self._spotify is not None
        artists = self._spotify.current_user_top_artists()
        artists = JDict(artists).ensure("items", list)
        return SpotifyResult.successResult([SpotifyArtist(artist) for artist in artists])

    @_connectionRequired
    @_mayFail
    def allUserArtists(self) -> SpotifyResult[List[SpotifyArtist]]:
        """Returns all the user's artists"""
        got: int = 50

        assert self._spotify is not None
        result = self._spotify.current_user_followed_artists(limit=50)
        artists = JDict(result).ensureCast("artists", JDict)
        fartists: List[Dict[str, Any]] = [ ]
        fartists.extend(artists.ensure("items", list))
        total: int = artists.ensure("total", int)

        while total > got:
            cursors = artists.get("cursors")
            if not cursors:
                break
            after = cursors.get("after")
            result = self._spotify.current_user_followed_artists(limit=50, after=after)
            artists = JDict(result).ensureCast("artists", JDict)
            fartists.extend(artists.ensure("items", list))
            got += 50

        return SpotifyResult.successResult([SpotifyArtist(artist) for artist in fartists])

    @_connectionRequired
    @_mayFail
    def follow(self, artistId: str) -> SpotifyResult[None]:
        """Follows an artist"""
        assert self._spotify is not None
        self._spotify.user_follow_artists([artistId])
        return SpotifyResult.successResult(None)

    @_connectionRequired
    @_mayFail
    def unfollow(self, artistId: str) -> SpotifyResult[None]:
        """Unfollows an artist"""
        assert self._spotify is not None
        self._spotify.user_unfollow_artists([artistId])
        return SpotifyResult.successResult(None)
