# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = "Copyright (c) 2022 https://github.com/reAudioPlayer"

from typing import Any, Dict
from aiohttp import web
from pyaddict.schema import Object, Integer
from helper.payloadParser import withObjectPayload
from dataModel.song import Song
from player.player import Player
from player.playlistManager import PlaylistManager


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
        return web.Response(status = 200, text = "success!")

    async def moveSong(self, request: web.Request) -> web.Response:
        """put(/api/playlists/{id}/tracks)"""
        id_ = int(request.match_info['id'])
        jdata = await request.json()
        self._playlistManager.moveInPlaylist(id_,
                                             jdata["songOldIndex"],
                                             jdata["songNewIndex"])
        return web.Response(status = 200, text = "success!")

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
        if id_ >= self._playlistManager.playlistLength:
            return web.Response(status = 404)
        return web.json_response(self._playlistManager.ensure(id_).toDict())

    async def getPlaylists(self, _: web.Request) -> web.Response:
        """get(/api/playlists)"""
        return web.json_response(list(map(lambda x: x.name, self._playlistManager.playlists)))

    async def createPlaylist(self, _: web.Request) -> web.Response:
        """get(/api/playlists/new)"""
        return web.Response(status = 200, text = str(await self._playlistManager.addPlaylist()))

    @withObjectPayload(Object({
        "id": Integer().min(0).coerce(),
    }), inPath = True)
    async def deletePlaylist(self, payload: Dict[str, Any]) -> web.Response:
        """delete(/api/playlists/id/{id})"""
        index: int = payload["id"]
        self._playlistManager.removePlaylist(index)
        return web.Response(status = 200)

    async def updatePlaylist(self, request: web.Request) -> web.Response:
        """post(/api/playlists/{id})"""
        id_ = int(request.match_info['id'])
        jdata: Dict[str, Any] = await request.json()
        self._playlistManager.updatePlaylist(id_,
                                             jdata.get("name"),
                                             jdata.get("description"),
                                             jdata.get("cover"))
        return web.Response(status = 200, text = "success!")
