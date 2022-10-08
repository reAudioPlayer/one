# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

from pathlib import Path
from typing import Any, Dict, List
from aiohttp import web
from spotipy import Spotify # type: ignore
from db.dbManager import DbManager
from helper.asyncThread import asyncRunInThreadWithReturn
from helper.cacheDecorator import useCache
from meta.metadata import Metadata
from meta.releases import Releases
from meta.search import Search

from dataModel.track import SpotifyArtist, SpotifyPlaylist, SpotifyTrack


class MetaHandler:
    """handler for different 'meta' features (e.g. metadata, spotify, search)"""
    def __init__(self, dbManager: DbManager, spotify: Spotify) -> None:
        self._spotify = spotify
        self._dbManager = dbManager

    async def getMetadata(self, request: web.Request) -> web.Response:
        """post(/api/browse/track)"""
        jdata = await request.json()
        metadata = await asyncRunInThreadWithReturn(Metadata, self._spotify, jdata["url"])
        return web.json_response(data = metadata.toDict())

    async def getTrack(self, request: web.Request) -> web.Response:
        """post(/api/tracks/{id})"""
        id_ = int(request.match_info['id'])
        try:
            song = self._dbManager.getSongById(id_)
            return web.json_response(song.toDict())
        except IndexError:
            return web.Response(status = 404)

    async def search(self, request: web.Request) -> web.Response:
        """post(/api/search)"""
        jdata = await request.json()
        search = await asyncRunInThreadWithReturn(Search,
                                                  Search.searchTracks(self._dbManager,
                                                                      jdata["query"]),
                                                                      self._spotify,
                                                                      jdata["query"])
        return web.json_response(data = search.toDict())

    async def spotifyAlbum(self, request: web.Request) -> web.Response:
        """post(/api/spotify/albums/{id})"""
        id_ = request.match_info['id']
        def _implement() -> List[Dict[str, Any]]:
            tracks = SpotifyTrack.fromAlbum(self._spotify, id_)
            metadatas = [ Metadata(self._spotify, track.url) for track in tracks ]
            return [ metadata.toDict() for metadata in metadatas ]
        data = await asyncRunInThreadWithReturn(_implement)
        return web.json_response(data = data)

    @useCache(900) # type: ignore
    async def spotifyPlaylists(self, _: web.Request) -> web.Response:
        """get(/api/spotify/playlists)"""
        def _implement() -> List[Dict[str, Any]]:
            playlists = self._spotify.current_user_playlists()["items"]
            return [ SpotifyPlaylist(playlist).toDict() for playlist in playlists ]
        data = await asyncRunInThreadWithReturn(_implement)
        return web.json_response(data = data)

    async def spotifyPlaylist(self, request: web.Request) -> web.Response:
        """post(/api/spotify/playlists/{id})"""
        id_ = request.match_info['id']
        def _implement() -> List[Dict[str, Any]]:
            tracks = SpotifyTrack.fromPlaylist(self._spotify, id_)
            metadatas = [ Metadata(self._spotify, track.url) for track in tracks ]
            return [ metadata.toDict() for metadata in metadatas ]
        data = await asyncRunInThreadWithReturn(_implement)
        return web.json_response(data = data)

    @useCache(1800) # type: ignore
    async def releases(self, _: web.Request) -> web.Response:
        """get(/api/releases)"""
        data = await asyncRunInThreadWithReturn(Releases, self._spotify)
        return web.json_response(data = data.toDict())

    @useCache(900) # type: ignore
    async def spotifyArtists(self, _: web.Request) -> web.Response:
        """get(/api/spotify/artists)"""
        def _implement() -> List[Dict[str, Any]]:
            artists = Releases.followedArtists(self._spotify)
            return [ SpotifyArtist(artist).toDict() for artist in artists ]
        data = await asyncRunInThreadWithReturn(_implement)
        return web.json_response(data = data)

    async def spotifyArtist(self, request: web.Request) -> web.Response:
        """post(/api/spotify/artists/{id})"""
        id_ = request.match_info['id']
        def _implement() -> List[Dict[str, Any]]:
            tracks = SpotifyTrack.fromArtist(self._spotify, id_)
            metadatas = [ Metadata(self._spotify, track.url) for track in tracks ]
            return [ metadata.toDict() for metadata in metadatas ]
        data = await asyncRunInThreadWithReturn(_implement)
        return web.json_response(data = data)

    async def spotifyFollow(self, request: web.Request) -> web.Response:
        """post(/api/spotify/following)"""
        jdata = await request.json()
        self._spotify.user_follow_artists([jdata.get("artistId")])
        print("followed!")
        return web.json_response(status=200)

    async def spotifyUnfollow(self, request: web.Request) -> web.Response:
        """delete(/api/spotify/following)"""
        jdata = await request.json()
        self._spotify.user_unfollow_artists([jdata.get("artistId")])
        print("unfollowed!")
        return web.json_response(status=200)

    async def upload(self, request: web.Request) -> web.Response:
        """post(/api/config/images)"""
        async for obj in (await request.multipart()):
            if obj.filename:
                bytestream = await obj.read()
                Path("./ui/dist/assets/img/covers").mkdir(parents=True, exist_ok=True)
                with open(f"./ui/dist/assets/img/covers/{obj.filename}", "wb") as file:
                    file.write(bytestream)
                return web.Response(text = f"/assets/img/covers/{obj.filename}")
        return web.Response(status = 400)

    async def spotifyRecommend(self, request: web.Request) -> web.Response:
        """post(/api/spotify/recommendations)"""
        jdata = await request.json()
        def _implement() -> List[Dict[str, Any]]:
            if jdata.get("query"):
                track = SpotifyTrack.fromQuery(self._spotify,
                                               jdata.get("query"))[0]
                jdata["tracks"] = [ track.id ]
            tracks = SpotifyTrack.fromRecommendation(self._spotify,
                                                     jdata.get("artists"),
                                                     jdata.get("tracks"))
            metadatas = [ Metadata(self._spotify, track.url)
                          for track in tracks ]
            return [ metadata.toDict() for metadata in metadatas ]
        data = await asyncRunInThreadWithReturn(_implement)
        return web.json_response(data = data)
