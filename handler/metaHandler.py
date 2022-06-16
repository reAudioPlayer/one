# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

from pathlib import Path
from typing import Dict, List
from aiohttp import web
from spotipy import Spotify
from db.dbManager import DbManager
from helpers.asyncThread import asyncRunInThreadWithReturn
from helpers.cacheDecorator import useCache
from meta.metadata import Metadata
from meta.releases import Releases
from meta.search import Search

from dataModels.track import SpotifyArtist, SpotifyPlaylist, SpotifyTrack


class MetaHandler:
    def __init__(self, dbManager: DbManager, spotify: Spotify) -> None:
        self._spotify = spotify
        self._dbManager = dbManager

    async def get(self, request: web.Request):
        jdata = await request.json()
        metadata = await asyncRunInThreadWithReturn(Metadata, self._spotify, jdata["url"])
        return web.json_response(data = metadata.toDict())

    async def getTrack(self, request: web.Request):
        jdata = await request.json()
        try:
            song = self._dbManager.getSongById(jdata["id"])
            return web.json_response(song.toDict())
        except IndexError:
            return web.Response(status = 404)

    async def search(self, request: web.Request):
        jdata = await request.json()
        search = await asyncRunInThreadWithReturn(Search, Search.searchTracks(self._dbManager, jdata["query"]), self._spotify, jdata["query"])
        return web.json_response(data = search.toDict())

    async def spotifyAlbum(self, request: web.Request):
        jdata = await request.json()
        def _implement() -> List[Dict]:
            tracks = SpotifyTrack.FromAlbum(self._spotify, jdata["albumId"])
            metadatas = [ Metadata(self._spotify, track.url) for track in tracks ]
            return [ metadata.toDict() for metadata in metadatas ]
        data = await asyncRunInThreadWithReturn(_implement)
        return web.json_response(data = data)

    @useCache(900)
    async def spotifyPlaylists(self, _: web.Request):
        def _implement() -> List[SpotifyPlaylist]:
            playlists = self._spotify.current_user_playlists()["items"]
            return [ SpotifyPlaylist(playlist).toDict() for playlist in playlists ]
        data = await asyncRunInThreadWithReturn(_implement)
        return web.json_response(data = data)

    async def spotifyPlaylist(self, request: web.Request):
        jdata = await request.json()
        def _implement() -> List[Dict]:
            tracks = SpotifyTrack.FromPlaylist(self._spotify, jdata["playlistId"])
            metadatas = [ Metadata(self._spotify, track.url) for track in tracks ]
            return [ metadata.toDict() for metadata in metadatas ]
        data = await asyncRunInThreadWithReturn(_implement)
        return web.json_response(data = data)

    @useCache(1800)
    async def releases(self, _: web.Request):
        data = await asyncRunInThreadWithReturn(Releases, self._spotify)
        return web.json_response(data = data.toDict())

    @useCache(900)
    async def spotifyArtists(self, _: web.Request):
        def _implement() -> List[Dict]:
            artists = Releases.followedArtists(self._spotify)
            return [ SpotifyArtist(artist).toDict() for artist in artists ]
        data = await asyncRunInThreadWithReturn(_implement)
        return web.json_response(data = data)

    async def spotifyArtist(self, request: web.Request):
        jdata = await request.json()
        def _implement() -> List[Dict]:
            tracks = SpotifyTrack.FromArtist(self._spotify, jdata["artistId"])
            metadatas = [ Metadata(self._spotify, track.url) for track in tracks ]
            return [ metadata.toDict() for metadata in metadatas ]
        data = await asyncRunInThreadWithReturn(_implement)
        return web.json_response(data = data)

    async def spotifyFollow(self, request: web.Request):
        jdata = await request.json()
        self._spotify.user_follow_artists([jdata.get("artistId")])
        return web.json_response(status=200)

    async def spotifyUnfollow(self, request: web.Request):
        jdata = await request.json()
        self._spotify.user_unfollow_artists([jdata.get("artistId")])
        return web.json_response(status=200)

    async def upload(self, request: web.Request):
        async for obj in (await request.multipart()):
            if obj.filename:
                bs = await obj.read()
                Path("./ui/public/assets/img/covers").mkdir(parents=True, exist_ok=True)
                with open(f"./ui/public/assets/img/covers/{obj.filename}", "wb") as f:
                    f.write(bs)
                return web.Response(text = f"/assets/img/covers/{obj.filename}")
        return web.Response(status = 400)

    async def spotifyRecommend(self, request: web.Request):
        jdata = await request.json()
        def _implement() -> List[Dict]:
            if jdata.get("query"):
                track = SpotifyTrack.FromQuery(self._spotify, jdata.get("query"))[0]
                jdata["tracks"] = [ track._id ]
            tracks = SpotifyTrack.FromRecommendation(self._spotify, jdata.get("artists"), jdata.get("tracks"))
            metadatas = [ Metadata(self._spotify, track.url) for track in tracks ]
            return [ metadata.toDict() for metadata in metadatas ]
        data = await asyncRunInThreadWithReturn(_implement)
        return web.json_response(data = data)
