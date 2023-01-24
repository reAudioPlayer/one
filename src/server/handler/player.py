# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

import asyncio
from typing import Dict, Any, Optional

from aiohttp import web
from pyaddict.schema import Object, String, Integer, Boolean

from db.dbManager import DbManager
from helper.payloadParser import withObjectPayload
from player.player import Player
from player.playerPlaylist import PlayerPlaylist
from player.playlistManager import PlaylistManager


MIN_PLAYLIST_ID = -2
SPECIAL_PLAYLISTS = {
    -1: "collection",
    -2: "collection/breaking"
}


class PlayerHandler:
    """player handler"""
    def __init__(self,
                 player: Player,
                 playlistManager: PlaylistManager,
                 dbManager: DbManager) -> None:
        self._player = player
        self._playlistManager = playlistManager
        self._dbManager = dbManager

    async def getNext(self, _: web.Request) -> web.Response:
        """get(/api/player/next)"""
        asyncio.create_task(self._player.next())
        return web.Response(status = 200, text = "success!")

    async def getPrevious(self, _: web.Request) -> web.Response:
        """get(/api/player/previous)"""
        asyncio.create_task(self._player.last())
        return web.Response(status = 200, text = "success!")

    @withObjectPayload(Object({
        "type": String().enum("playlist", "collection", "collection/breaking", "track"),
        "id": Integer().min(MIN_PLAYLIST_ID).optional()
    }), inBody = True)
    async def loadPlaylist(self, payload: Dict[str, Any]) -> web.Response:
        """post(/api/player/load)"""
        type_: str = payload["type"]
        id_: Optional[int] = payload.get("id")

        if id_ in SPECIAL_PLAYLISTS:
            type_ = SPECIAL_PLAYLISTS.get(id_, type_)

        if type_ in ("playlist", "track") and id_ == -1:
            return web.HTTPBadRequest(text = "id is required for types playlist and track")

        if type_ == "playlist":
            asyncio.create_task(self._player.loadPlaylist(self._playlistManager.get(id_)))
            return web.Response()

        if type_ == "collection":
            asyncio.create_task(self._player.loadPlaylist(PlayerPlaylist.liked(self._dbManager)))
            return web.Response()

        if type_ == "collection/breaking":
            asyncio.create_task(self._player.loadPlaylist(PlayerPlaylist.breaking(self._dbManager)))
            return web.Response()

        if type_ == "track":
            asyncio.create_task(self._player
                .loadPlaylist(PlayerPlaylist(self._dbManager,
                                             songs = self._dbManager\
                                                .getSongsByCustomFilter(f"id={id_}"),
                                             name = str(id_))))

        return web.HTTPBadRequest()

    @withObjectPayload(Object({
        "index": Integer().min(0), # index of song in playlist
        "playlistIndex": Integer().min(MIN_PLAYLIST_ID).optional(), # playlist id
        "type": String().enum("collection", "collection/breaking").optional()
    }), inBody = True)
    async def loadSongAt(self, payload: web.Request) -> web.Response:
        """post(/api/player/at)"""
        songId: int = payload.get("index", -1)
        type_: Optional[str] = payload.get("type", None)
        found = False

        if payload.get("playlistIndex", 0) in SPECIAL_PLAYLISTS:
            type_ = SPECIAL_PLAYLISTS[payload.get("playlistIndex", 0)]
            del payload["playlistIndex"]

        if "playlistIndex" in payload: # other playlist
            if await self._player.loadPlaylist(
                    self._playlistManager.get(payload["playlistIndex"]), songId):
                found = True
            else:
                found = await self._player.at(songId)

        elif type_ == "collection/breaking":
            if await self._player.loadPlaylist(PlayerPlaylist.breaking(self._dbManager),
                                                    songId):
                found = True
            else:
                found = await self._player.at(songId)

        elif type_ == "collection":
            if await self._player.loadPlaylist(PlayerPlaylist.liked(self._dbManager),
                                                    songId):
                found = True
            else:
                found = await self._player.at(songId)

        else:
            found = await self._player.at(songId)

        if not found:
            return web.HTTPNotFound()
        return web.Response()

    async def updateSong(self, request: web.Request) -> web.Response:
        """post(/api/tracks/{id})"""
        id_ = int(request.match_info['id'])
        jdata: Dict[str, Any] = await request.json()
        self._player.updateSongMetadata(id_,
                                        self._dbManager.getSongById(id_).updateFromDict(jdata))
        return web.Response(status = 200)

    @withObjectPayload(Object({
        "value": Boolean()
    }), inBody = True)
    async def postShuffle(self, payload: Dict[str, Any]) -> web.Response:
        """post(/api/player/shuffle)"""
        self._player.shuffle = payload["value"]
        return web.Response(status = 200)

    async def getShuffle(self, _: web.Request) -> web.Response:
        """get(/api/player/shuffle)"""
        return web.Response(status = 200, text = str(self._player.shuffle))

    @withObjectPayload(Object({
        "value": Boolean()
    }), inBody = True)
    async def postRepeat(self, payload: Dict[str, Any]) -> web.Response:
        """post(/api/player/repeat)"""
        self._player.loopSong = payload["value"]
        return web.Response(status = 200, text = "success!")

    async def getRepeat(self, _: web.Request) -> web.Response:
        """get(/api/player/repeat)"""
        return web.Response(status = 200, text = str(self._player.loopSong))

    async def getCurrentTrack(self, _: web.Request) -> web.Response:
        """get(/api/me/player/current-track)"""
        return web.json_response(self._player.currentSong.toDict())

    async def getCurrentPlaylist(self, _: web.Request) -> web.Response:
        """get(/api/me/player/current-playlist)"""
        return web.json_response(self._player.currentPlaylist.toDict())
