# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

from pathlib import Path
from typing import Any, Dict, List
from aiohttp import web

from db.dbManager import DbManager
from helper.asyncThread import asyncRunInThreadWithReturn
from helper.cacheDecorator import useCache
from helper.dictTool import DictEx
from meta.metadata import Metadata
from meta.releases import Releases
from meta.search import Search
from meta.spotify import Spotify, SpotifyResult
from dataModel.track import SpotifyArtist, SpotifyPlaylist


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
        def _implement() -> SpotifyResult[List[ Dict[str, Any] ]]:
            result = self._spotify.albumTracks(id_)
            if not result:
                return result.transform([ ])

            tracks = result.unwrap()
            metadatas = [ Metadata(self._spotify, track.url) for track in tracks ]
            return result.transform([ metadata.toDict() for metadata in metadatas ])

        data = await asyncRunInThreadWithReturn(_implement)

        if not data:
            return data.httpResponse()

        return web.json_response(data = data.unwrap())

    @useCache(900) # type: ignore
    async def spotifyPlaylists(self, _: web.Request) -> web.Response:
        """get(/api/spotify/playlists)"""
        def _implement() -> SpotifyResult[SpotifyPlaylist]:
            result = self._spotify.userPlaylists()
            if not result:
                return result.transform([ ])

            return result
        data = await asyncRunInThreadWithReturn(_implement)

        if not data:
            return data.httpResponse()

        return web.json_response(data = data.unwrap())

    async def spotifyPlaylist(self, request: web.Request) -> web.Response:
        """post(/api/spotify/playlists/{id})"""
        id_ = request.match_info['id']
        def _implement() -> SpotifyResult[List[Dict[str, Any]]]:
            result = self._spotify.playlistTracks(id_)
            if not result:
                return result.transform([ ])

            tracks = result.unwrap()
            metadatas = [ Metadata(self._spotify, track.url) for track in tracks ]
            return result.transform([ metadata.toDict() for metadata in metadatas ])
        data = await asyncRunInThreadWithReturn(_implement)

        if not data:
            return data.httpResponse()

        return web.json_response(data = data.unwrap())

    @useCache(1800) # type: ignore
    async def releases(self, _: web.Request) -> web.Response:
        """get(/api/releases)"""
        data = await asyncRunInThreadWithReturn(Releases, self._spotify)
        return web.json_response(data = data.toDict())

    @useCache(900) # type: ignore
    async def spotifyArtists(self, _: web.Request) -> web.Response:
        """get(/api/spotify/artists)"""
        def _implement() -> SpotifyResult[SpotifyArtist]:
            result = self._spotify.allUserArtists()
            if not result:
                return result.transform([ ])

            return result
        data = await asyncRunInThreadWithReturn(_implement)

        if not data:
            return data.httpResponse()

        return web.json_response(data = data.unwrap())

    async def spotifyArtist(self, request: web.Request) -> web.Response:
        """post(/api/spotify/artists/{id})"""
        id_ = request.match_info['id']
        def _implement() -> SpotifyResult[List[Dict[str, Any]]]:
            result = self._spotify.artistTracks(id_)
            if not result:
                return result.transform([ ])

            tracks = result.unwrap()
            metadatas = [ Metadata(self._spotify, track.url) for track in tracks ]
            return result.transform([ metadata.toDict() for metadata in metadatas ])
        data = await asyncRunInThreadWithReturn(_implement)

        if not data:
            return data.httpResponse()

        return web.json_response(data = data.unwrap())

    async def spotifyFollow(self, request: web.Request) -> web.Response:
        """post(/api/spotify/following)"""
        jdata = await request.json()
        self._spotify.user_follow_artists([jdata.get("artistId")])
        return web.json_response(status=200)

    async def spotifyUnfollow(self, request: web.Request) -> web.Response:
        """delete(/api/spotify/following)"""
        jdata = await request.json()
        self._spotify.user_unfollow_artists([jdata.get("artistId")])
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
        def _implement() -> SpotifyResult[List[Dict[str, Any]]]:
            dex = DictEx(jdata)
            query = dex.tryGet("query", str)
            if query:
                result = self._spotify.searchTrack(query)

                if result:
                    tracks = result.unwrap()
                    if len(tracks) > 0:
                        dex["tracks"] = [ tracks[0].id ]

            result = self._spotify.recommendations(dex.get("artists", [ ]),
                                                   dex.get("tracks", [ ]),
                                                   dex.get("genres", [ ]))

            if not result:
                return result.transform([ ])

            metadatas = [ Metadata(self._spotify, track.url)
                          for track in tracks ]
            return result.transform([ metadata.toDict() for metadata in metadatas ])
        data = await asyncRunInThreadWithReturn(_implement)

        if not data:
            return data.httpResponse()

        return web.json_response(data = data.unwrap())
