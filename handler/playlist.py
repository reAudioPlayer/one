# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

from typing import Any
from aiohttp import web
from dataModel.song import Song
from player.player import Player
from player.playlistManager import PlaylistManager

class PlaylistHandler:
    """playlist handler"""
    def __init__(self, player: Player, playlistManager: PlaylistManager) -> None:
        self._player = player
        self._playlistManager = playlistManager

    async def addSong(self, request: web.Request) -> web.Response:
        """post(/api/add)"""
        jdata = await request.json()
        self._playlistManager.addToPlaylist(jdata["id"], Song.fromDict(jdata))
        return web.Response(status = 200, text = "success!")

    async def moveSong(self, request: web.Request) -> web.Response:
        """post(/api/rearrange)"""
        jdata = await request.json()
        self._playlistManager.moveInPlaylist(jdata["playlistIndex"],
                                             jdata["songOldIndex"],
                                             jdata["songNewIndex"])
        return web.Response(status = 200, text = "success!")

    async def removeSong(self, request: web.Request) -> web.Response:
        """post(/api/remove)"""
        jdata = await request.json()
        if not "playlistId" in jdata:
            return web.Response(status = 400, text = "no playlistId")
        if not "songId" in jdata:
            return web.Response(status = 400, text = "no songId")
        self._playlistManager.removefromPlaylist(jdata.get("playlistId"), jdata.get("songId"))
        return web.Response(status = 200, text = "success!")

    async def getPlaylist(self, request: web.Request) -> web.Response:
        """post(/api/playlist)"""
        index: Any = None
        try:
            jdata = await request.json()
            index = jdata.get("id")
        except: # pylint: disable=bare-except
            pass

        if not isinstance(index, int):
            return web.json_response(self._player.currentPlaylist.toDict())
        if index >= self._playlistManager.playlistLength:
            return web.Response(status = 404)
        return web.json_response(self._playlistManager.ensure(index).toDict())

    async def getPlaylists(self, _: web.Request) -> web.Response:
        """get(/api/playlists)"""
        return web.json_response(list(map(lambda x: x.name, self._playlistManager.playlists)))

    async def createPlaylist(self, _: web.Request) -> web.Response:
        """get(/api/playlist/create)"""
        return web.Response(status = 200, text = str(self._playlistManager.addPlaylist()))

    async def deletePlaylist(self, request: web.Request) -> web.Response:
        """delete(/api/playlist/{id})"""
        index = int(request.match_info['id'])
        self._playlistManager.removePlaylist(index)
        return web.Response(status = 200)

    async def updatePlaylist(self, request: web.Request) -> web.Response:
        """post(/api/updatePlaylist)"""
        jdata = await request.json()
        self._playlistManager.updatePlaylist(jdata["id"],
                                             jdata.get("name"),
                                             jdata.get("description"),
                                             jdata.get("cover"))
        return web.Response(status = 200, text = "success!")
