# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = "Copyright (c) 2022 https://github.com/reAudioPlayer"

from typing import Any, Dict
from aiohttp import web
from pyaddict.schema import Object, Integer, Array, String, Integer
from helper.payloadParser import withObjectPayload
from dataModel.song import Song
from player.player import Player
from player.playerPlaylist import PlayerPlaylist
from player.playlistManager import PlaylistManager


SMART_DEFINITION = Object({
    "limit": Integer().min(1).optional(),
    "direction": String().enum("asc", "desc").optional(),
    "sort": String().enum("title", "artist", "album", "duration", "id").optional(),
    "name": String().optional(),
    "description": String().optional(),
    "filter": Object({
        "title": Array(String()).optional(),
        "artist": Array(String()).optional(),
        "album": Array(String()).optional(),
        "duration": Object({
            "from": Integer().min(0).optional(),
            "to": Integer().min(0).optional()
        }).optional()
    }).optional()
})


class PlaylistHandler:
    """playlist handler"""
    def __init__(self, player: Player, playlistManager: PlaylistManager) -> None:
        self._player = player
        self._playlistManager = playlistManager

    async def addSong(self, request: web.Request) -> web.Response:
        """post(/api/playlists/{id}/tracks)"""
        id_ = int(request.match_info['id'])
        jdata = await request.json()
        await self._playlistManager.addToPlaylist(id_, Song.fromDict(jdata))
        return web.Response()

    async def moveSong(self, request: web.Request) -> web.Response:
        """put(/api/playlists/{id}/tracks)"""
        id_ = int(request.match_info['id'])
        jdata = await request.json()
        self._playlistManager.moveInPlaylist(id_,
                                             jdata["songOldIndex"],
                                             jdata["songNewIndex"])
        return web.Response()

    async def removeSong(self, request: web.Request) -> web.Response:
        """/api/playlists/{id}/tracks"""
        id_ = int(request.match_info['id'])
        jdata = await request.json()
        if not "songId" in jdata:
            return web.Response(status = 400, text = "no songId")
        await self._playlistManager.removefromPlaylist(id_, jdata["songId"])
        return web.Response(status = 200, text = "success!")

    @withObjectPayload(Object({
        "id": Integer().min(0).coerce()
    }), inPath = True)
    async def getPlaylist(self, payload: Dict[str, Any]) -> web.Response:
        """post(/api/playlists/{id})"""
        id_: int = payload["id"]
        if playlist := self._playlistManager.get(id_):
            return web.json_response(playlist.toDict())
        return web.HTTPNotFound()

    async def getPlaylists(self, _: web.Request) -> web.Response:
        """get(/api/playlists)"""
        return web.json_response([
            playlist.toDict()
            for playlist in self._playlistManager.playlists
        ])

    async def createPlaylist(self, _: web.Request) -> web.Response:
        """get(/api/playlists/new)"""
        return web.Response(status = 200, text = str(await self._playlistManager.addPlaylist()))

    @withObjectPayload(Object({
        "id": Integer().min(0).coerce(),
    }), inPath = True)
    async def deletePlaylist(self, payload: Dict[str, Any]) -> web.Response:
        """delete(/api/playlists/id/{id})"""
        id_: int = payload["id"]
        if await self._playlistManager.removePlaylist(id_):
            return web.Response()
        return web.HTTPNotFound()

    async def updatePlaylist(self, request: web.Request) -> web.Response:
        """post(/api/playlists/{id})"""
        id_ = int(request.match_info['id'])
        jdata: Dict[str, Any] = await request.json()
        self._playlistManager.updatePlaylist(id_,
                                             jdata.get("name"),
                                             jdata.get("description"),
                                             jdata.get("cover"))
        return web.Response()

    @withObjectPayload(SMART_DEFINITION, inBody = True)
    async def updateSmartPlaylist(self, payload: Dict[str, Any]) -> web.Response:
        """post(/api/playlists/smart/{id})"""
        return web.Response()

    @withObjectPayload(SMART_DEFINITION, inBody = True)
    async def peekSmartPlaylist(self, payload: Dict[str, Any]) -> web.Response:
        """post(/api/playlists/smart/preview)"""
        playlist = await PlayerPlaylist.smart(payload)
        return web.json_response(playlist.toDict())

    @withObjectPayload(Object({
        "id": Integer().min(0).coerce(),
    }), inPath = True)
    async def getSmartPlaylist(self, payload: Dict[str, int]) -> web.Response:
        """get(/api/playlists/smart/{id})"""
        id_: int = payload["id"]
        return web.Response()
