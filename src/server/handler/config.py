# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = "Copyright (c) 2022 https://github.com/reAudioPlayer"

from typing import List, Dict, Any

from aiohttp import web
from pyaddict import JDict
from pyaddict.schema import Object, String, Boolean

from db.dbManager import DbManager
from helper.payloadParser import withObjectPayload
from config.runtime import Runtime
from config.customData import LocalTrack, LocalCover


class ConfigHandler:
    """back end configuration handler"""
    def __init__(self, dbManager: DbManager) -> None:
        self._dbManager = dbManager

    async def firstTime(self, _: web.Request) -> web.Response:
        """get(/api/config/first-time)"""
        # first-time use
        spotifyConfig = Runtime.spotifyConfig()
        if spotifyConfig is None:
            return web.json_response(True)
        valid = None in (spotifyConfig.get("id"), spotifyConfig.get("secret"))
        return web.json_response(valid)

    @withObjectPayload(Object({
        "cache": Object({
            "strategy": String().optional(),
            "preserve": Boolean().optional(),
            "preserveInSession": Boolean().optional(),
        }).optional(),

    }), inBody = True)
    async def updateConfig(self, payload: Dict[str, Any]) -> web.Response:
        """put(/api/config)"""
        Runtime.updateConfig(payload)
        return web.Response()

    async def getConfig(self, _: web.Request) -> web.Response:
        """get(/api/config)"""
        return web.json_response(Runtime.config())

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
