# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

from typing import List, Dict, Any

from aiohttp import web
from pyaddict import JDict

from db.dbManager import DbManager
from config.runtime import Runtime
from config.customData import LocalTrack, LocalCover


class ConfigHandler:
    """back end configuration handler"""
    def __init__(self, dbManager: DbManager) -> None:
        self._dbManager = dbManager

    async def ready(self, _: web.Request) -> web.Response:
        """get(/api/config)"""
        spotifyConfig = Runtime.spotifyConfig()
        if spotifyConfig is None:
            return web.Response(status = 400)
        valid = None not in (spotifyConfig.get("id"), spotifyConfig.get("secret"))
        return web.Response(status = 200 if valid else 400)

    async def spotifyConfig(self, request: web.Request) -> web.Response:
        """post(/api/config/spotify)"""
        jdata = await request.json()
        if None in (jdata.get("id"), jdata.get("secret")):
            return web.Response(status = 400)

        Runtime.setSpotifyConfig(JDict(jdata))
        return web.Response()

    async def getLocalImages(self, _: web.Request) -> web.Response:
        """get(/api/config/images)"""
        covers = LocalCover.getAll()
        result: List[Dict[str, Any]] = [ ]
        for cover in covers:
            songs = self._dbManager.getSongsByCustomFilter(f"cover = '{cover.displayPath}'")
            playlists = self._dbManager.getPlaylistsByCustomFilter(f"cover = '{cover.displayPath}'")
            result.append({
                "name": cover.displayPath,
                "songs": [ song.toDict() for song in songs ],
                "playlists": [ playlist.toDict() for playlist in playlists ]
            })
        return web.json_response(result)

    async def deleteLocalImage(self, request: web.Request) -> web.Response:
        """delete(/api/config/images)"""
        jdata = await request.json()
        if not jdata.get("name"):
            return web.Response(status = 400)

        LocalCover.fromDisplayPath(jdata["name"]).delete()
        return web.Response()

    async def getLocalTracks(self, _: web.Request) -> web.Response:
        """get(/api/config/tracks)"""
        tracks = LocalTrack.getAll()
        result: List[Dict[str, Any]] = [ ]
        for track in tracks:
            songs = self._dbManager.getSongsByCustomFilter(f"source = '{track.displayPath}'")
            result.append({
                "name": track.displayPath,
                "songs": [ song.toDict() for song in songs ]
            })
        return web.json_response(result)

    async def deleteLocalTrack(self, request: web.Request) -> web.Response:
        """delete(/api/config/tracks)"""
        jdata = await request.json()
        if not jdata.get("name"):
            return web.Response(status = 400)

        LocalTrack.fromDisplayPath(jdata["name"]).delete()
        return web.Response()
