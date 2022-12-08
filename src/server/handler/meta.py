# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

from typing import Any, Dict, List

from aiohttp import web
from pyaddict import JDict

from db.dbManager import DbManager
from helper.asyncThread import asyncRunInThreadWithReturn
from helper.cacheDecorator import useCache
from meta.metadata import Metadata
from meta.releases import Releases
from meta.search import Search
from meta.spotify import Spotify, SpotifyResult
from dataModel.track import SpotifyArtist, SpotifyPlaylist
from config.runtime import Runtime
from config.customData import LocalTrack, LocalCover


class MetaHandler:
    """handler for different 'meta' features (e.g. metadata, spotify, search)"""
    def __init__(self, dbManager: DbManager, spotify: Spotify) -> None:
        self._spotify = spotify
        self._dbManager = dbManager

    async def getMetadata(self, request: web.Request) -> web.Response:
        """post(/api/browse/track)"""
        jdata = await request.json()
        metadata = await asyncRunInThreadWithReturn(Metadata, self._spotify, jdata["url"])
        if not metadata:
            return web.HTTPNotFound(text = "no metadata found")
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
        def _implement() -> SpotifyResult[List[SpotifyPlaylist]]:
            result = self._spotify.userPlaylists()
            if not result:
                return result.transform([ ])

            return result
        data = await asyncRunInThreadWithReturn(_implement)

        if not data:
            return data.httpResponse()

        return web.json_response(data = [ pl.toDict() for pl in data.unwrap() ])

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
        def _implement() -> SpotifyResult[List[Dict[str, Any]]]:
            result = self._spotify.allUserArtists()
            if not result:
                return result.transform([ ])

            return result.transform([ artist.toDict() for artist in result.unwrap() ])
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
        self._spotify.follow(jdata.get("artistId"))
        return web.json_response(status=200)

    async def spotifyUnfollow(self, request: web.Request) -> web.Response:
        """delete(/api/spotify/following)"""
        jdata = await request.json()
        self._spotify.unfollow(jdata.get("artistId"))
        return web.json_response(status=200)

    async def upload(self, request: web.Request) -> web.Response:
        """post(/api/config/images)"""
        if not Runtime.args.withDocker:
            return web.HTTPExpectationFailed(text = "must run in docker")

        async for obj in (await request.multipart()):
            if obj.filename:
                file = LocalCover.createNew(obj.filename)
                file.write(await obj.read())
                return web.Response(text = file.displayPath)
        return web.Response(status = 400)

    async def uploadSong(self, request: web.Request) -> web.Response:
        """post(/api/config/tracks)"""
        if not Runtime.args.withDocker:
            return web.HTTPExpectationFailed(text = "must run in docker")

        async for obj in (await request.multipart()):
            if obj.filename:
                file = LocalTrack.createNew(obj.filename)
                file.write(await obj.read())
                return web.Response(text = file.displayPath)
        return web.Response(status = 400)

    async def spotifyRecommend(self, request: web.Request) -> web.Response:
        """post(/api/spotify/recommendations)"""
        jdata = await request.json()
        def _implement() -> SpotifyResult[List[Dict[str, Any]]]:
            dex = JDict(jdata)
            query = dex.optionalGet("query", str)
            if query:
                result = self._spotify.searchTrack(query)

                if result:
                    tracks = result.unwrap()
                    if len(tracks) > 0:
                        dex["tracks"] = [ tracks[0].id ]

            result = self._spotify.recommendations(dex.ensure("artists", list),
                                                   dex.ensure("tracks", list),
                                                   dex.ensure("genres", list))

            if not result:
                return result.transform([ ])

            metadatas = [ Metadata(self._spotify, track.url)
                          for track in tracks ]
            return result.transform([ metadata.toDict() for metadata in metadatas ])
        data = await asyncRunInThreadWithReturn(_implement)

        if not data:
            return data.httpResponse()

        return web.json_response(data = data.unwrap())
