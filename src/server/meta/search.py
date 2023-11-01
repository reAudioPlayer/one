# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
from __future__ import annotations

__copyright__ = "Copyright (c) 2022 https://github.com/reAudioPlayer"

from typing import List, Any, Dict, Optional
from enum import StrEnum

from db.database import Database
from db.table.playlists import PlaylistModel
from db.table.artists import ArtistModel
from dataModel.track import YoutubeTrack, ITrack
from dataModel.song import Song
from meta.spotify import Spotify, SpotifyArtist, SpotifyTrack
from meta.confidence import Confidence
from helper.asyncThread import asyncRunInThreadWithReturn
from player.classicPlayerPlaylist import ClassicPlayerPlaylist


class SearchScopes(StrEnum):
    """search scopes"""

    Spotify = "spotify"
    Youtube = "youtube"
    Local = "local"

    Artist = "artist"
    Playlist = "playlist"
    Song = "song"
    Album = "album"


class SearchResult:
    """search result"""

    def __init__(
        self,
        item: ITrack | Song | ClassicPlayerPlaylist | SpotifyArtist | ArtistModel,
        confidence: float,
        scope: SearchScopes,
        type_: SearchScopes,
    ) -> None:
        self._item = item
        self._confidence = confidence
        self._scope = scope
        self._type = type_

    @property
    def confidence(self) -> float:
        """title"""
        return self._confidence

    @property
    def scope(self) -> SearchScopes:
        """scope"""
        return self._scope

    @property
    def type(self) -> SearchScopes:
        """type"""
        return self._type

    def toDict(self) -> Dict[str, Any]:
        """serialise"""
        data = {
            "confidence": self._confidence,
            "scope": self._scope,
            "type": self._type,
            "item": self._item.toDict(),
        }
        return data


class SearchScope:
    """search scope"""

    __slots__ = ("_value",)

    def __init__(self, value: Optional[List[str]]) -> None:
        self._value = value

    @property
    def value(self) -> Optional[List[str]]:
        """value"""
        return self._value

    @property
    def spotify(self) -> bool:
        """spotify"""
        if self._value is None:
            return True
        return SearchScopes.Spotify in self._value

    @property
    def youtube(self) -> bool:
        """youtube"""
        if self._value is None:
            return True
        return SearchScopes.Youtube in self._value

    @property
    def local(self) -> bool:
        """local"""
        if self._value is None:
            return True
        return SearchScopes.Local in self._value

    @property
    def artist(self) -> bool:
        """artist"""
        if self._value is None:
            return True
        return SearchScopes.Artist in self._value

    @property
    def playlist(self) -> bool:
        """playlist"""
        if self._value is None:
            return True
        return SearchScopes.Playlist in self._value

    @property
    def song(self) -> bool:
        """song"""
        if self._value is None:
            return True
        return SearchScopes.Song in self._value

    @property
    def album(self) -> bool:
        """album"""
        if self._value is None:
            return True
        return SearchScopes.Album in self._value


class Search:
    """search engine"""

    def __init__(self, spotify: Spotify, query: str, scope: SearchScope) -> None:
        self._spotify = spotify
        self._query = query
        self._scope = scope

        self._items: List[SearchResult] = []

    async def _getYoutubeTracks(self) -> List[SearchResult]:
        if not self._scope.song:
            return []

        def _implement() -> List[YoutubeTrack]:
            return YoutubeTrack.fromQuery(self._query) or []

        tracks = await asyncRunInThreadWithReturn(_implement)
        return [
            SearchResult(
                track,
                Confidence.forSong(track, self._query),
                SearchScopes.Youtube,
                SearchScopes.Song,
            )
            for track in tracks
        ]

    async def _getSpotifyTracks(self) -> List[SearchResult]:
        """get spotify tracks"""
        if not self._scope.song:
            return []

        def _implement() -> List[SpotifyTrack]:
            return self._spotify.searchTrack(self._query).unwrapOr([])

        tracks = await asyncRunInThreadWithReturn(_implement)
        return [
            SearchResult(
                track,
                Confidence.forSong(track, self._query),
                SearchScopes.Spotify,
                SearchScopes.Song,
            )
            for track in tracks
        ]

    async def _getLocalTracks(self) -> List[SearchResult]:
        """get local tracks"""
        if not self._scope.song:
            return []
        songs = Song.list(await Database().songs.search(self._query))
        return [
            SearchResult(
                song,
                Confidence.forSong(song, self._query, boost=0.5),
                SearchScopes.Local,
                SearchScopes.Song,
            )
            for song in songs
        ]

    async def _getLocalPlaylists(self) -> List[SearchResult]:
        """get local playlists"""
        if not self._scope.playlist:
            return []
        playlists = await Database().playlists.search(self._query)
        return [
            SearchResult(
                ClassicPlayerPlaylist(playlist),
                Confidence.forPlaylist(playlist, self._query, boost=0.5),
                SearchScopes.Local,
                SearchScopes.Playlist,
            )
            for playlist in playlists
        ]

    async def _getSpotifyArtists(self) -> List[SearchResult]:
        """get spotify artists"""
        if not self._scope.artist:
            return []

        def _implement() -> List[SpotifyArtist]:
            return self._spotify.searchArtist(self._query).unwrapOr([])

        artists = await asyncRunInThreadWithReturn(_implement)
        return [
            SearchResult(
                artist,
                Confidence.forArtist(artist.name, self._query),
                SearchScopes.Spotify,
                SearchScopes.Artist,
            )
            for artist in artists
        ]

    async def _getLocalArtists(self) -> List[SearchResult]:
        """get local artists"""
        if not self._scope.artist:
            return []
        artists = await Database().artists.search(self._query)
        return [
            SearchResult(
                artist,
                Confidence.forArtist(artist.name, self._query),
                SearchScopes.Local,
                SearchScopes.Artist,
            )
            for artist in artists
        ]

    async def execute(self) -> None:
        """searches for tracks"""
        if self._scope.local:
            self._items.extend(await self._getLocalTracks())
            self._items.extend(await self._getLocalPlaylists())
            self._items.extend(await self._getLocalArtists())

        if self._scope.youtube:
            self._items.extend(await self._getYoutubeTracks())

        if self._scope.spotify:
            self._items.extend(await self._getSpotifyTracks())
            self._items.extend(await self._getSpotifyArtists())

        self._items = [item for item in self._items if item.confidence > 0]
        self._items.sort(key=lambda x: x.confidence, reverse=True)

    def toDict(self) -> Dict[str, Any]:
        """serialise"""
        return {
            "query": self._query,
            "scope": self._scope.value,
            "items": [_track.toDict() for _track in self._items],
        }
