# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

from typing import Any
from aiohttp import web
from dataModels.song import Song
from player.player import Player
from player.playlistManager import PlaylistManager

class PlaylistHandler:
    def __init__(self, player: Player, playlistManager: PlaylistManager) -> None:
        self._player = player
        self._playlistManager = playlistManager

    async def addSong(self, request: web.Request):
        jdata = await request.json()
        self._playlistManager.addToPlaylist(jdata["id"], Song.FromDict(jdata))
        return web.Response(status = 200, text = "success!")

    async def moveSong(self, request: web.Request):
        jdata = await request.json()
        self._playlistManager.moveInPlaylist(jdata["playlistIndex"], jdata["songOldIndex"], jdata["songNewIndex"])
        return web.Response(status = 200, text = "success!")

    async def removeSong(self, request: web.Request):
        jdata = await request.json()
        if not "playlistId" in jdata:
            return web.Response(status = 400, text = "no playlistId")
        if not "songId" in jdata:
            return web.Response(status = 400, text = "no songId")
        self._playlistManager.removeFromPlaylist(jdata.get("playlistId"), jdata.get("songId"))
        return web.Response(status = 200, text = "success!")

    async def getPlaylist(self, request: web.Request):
        index: Any = None
        try:
            jdata = await request.json()
            index = jdata.get("id")
        except:
            pass

        if index is None:
            return web.json_response(self._player.currentPlaylist.toDict())
        if index >= self._playlistManager.playlistLength:
            return web.Response(status = 404)
        return web.json_response(self._playlistManager.get(index).toDict())

    async def getPlaylists(self, _: web.Request):
        return web.json_response(list(map(lambda x: x.name, self._playlistManager._playlists)))

    async def createPlaylist(self, _: web.Request):
        return web.Response(status = 200, text = str(self._playlistManager.addPlaylist()))

    async def deletePlaylist(self, request: web.Request):
        index = int(request.match_info['id'])
        self._playlistManager.removePlaylist(index)
        return web.Response(status = 200)

    async def updatePlaylist(self, request: web.Request):
        jdata = await request.json()
        self._playlistManager.updatePlaylist(jdata["id"], jdata.get("name"), jdata.get("description"), jdata.get("cover"))
        return web.Response(status = 200, text = "success!")
