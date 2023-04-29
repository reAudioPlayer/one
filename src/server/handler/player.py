# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = "Copyright (c) 2022 https://github.com/reAudioPlayer"

import asyncio
from typing import Dict, Any, Optional
import json

from aiohttp import web
from pyaddict.schema import Object, String, Integer
from pyaddict import JDict

from db.database import Database
from helper.payloadParser import withObjectPayload
from player.player import Player
from player.playerPlaylist import PlayerPlaylist
from player.playlistManager import PlaylistManager
from dataModel.song import Song


MIN_PLAYLIST_ID = -2
SPECIAL_PLAYLISTS = {
    -1: "collection",
    -2: "collection/breaking"
}


class PlayerHandler:
    """player handler"""
    def __init__(self,
                 player: Player,
                 playlistManager: PlaylistManager) -> None:
        self._player = player
        self._playlistManager = playlistManager
        self._dbManager = Database()

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
            if id_ is None:
                return web.HTTPBadRequest(text = "id is required for type playlist")
            if playlist := self._playlistManager.get(id_):
                asyncio.create_task(self._player.loadPlaylist(playlist))
                return web.Response()
            return web.HTTPNotFound(text = "playlist not found")

        if type_ == "collection":
            asyncio.create_task(self._player.loadPlaylist(await PlayerPlaylist.liked()))
            return web.Response()

        if type_ == "collection/breaking":
            asyncio.create_task(self._player.loadPlaylist(await PlayerPlaylist.breaking()))
            return web.Response()

        if type_ == "track":
            assert id_ is not None
            if not (song := await self._dbManager.songs.byId(id_)):
                return web.HTTPNotFound(text = "song not found")
            asyncio.create_task(
                self._player.loadPlaylist(
                    PlayerPlaylist(songs = Song.list([song]),
                                   name = str(id_))))

        return web.Response()

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
            if await self._player.loadPlaylist(await PlayerPlaylist.breaking(),
                                               songId):
                found = True
            else:
                found = await self._player.at(songId)

        elif type_ == "collection":
            if await self._player.loadPlaylist(await PlayerPlaylist.liked(),
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
        """put(/api/tracks/{id})"""
        id_ = int(request.match_info['id'])
        jdata = JDict(await request.json())
        song = await self._dbManager.songs.byId(id_)
        if song is None:
            return web.HTTPNotFound()

        song.album = jdata.ensure("album", str, song.album)
        song.artist = jdata.ensure("artist", str, song.artist)
        song.name = jdata.ensure("title", str, song.name)
        song.cover = jdata.ensure("cover", str, song.cover)
        song.duration = jdata.ensureCast("duration", int, song.duration)
        song.favourite = jdata.ensure("favourite", bool, song.favourite)
        song.source = jdata.ensure("source", str, song.source)
        song.spotify = jdata.ensure("spotify", str, song.spotify)
        return web.Response(status = 200)

    async def postShuffle(self, request: web.Request) -> web.Response:
        """post(/api/player/shuffle)"""
        shuffle = await request.json()
        if not isinstance(shuffle, bool):
            return web.HTTPBadRequest()

        self._player.shuffle = shuffle
        return web.Response()

    async def getShuffle(self, _: web.Request) -> web.Response:
        """get(/api/player/shuffle)"""
        return web.Response(status = 200, text = json.dumps(self._player.shuffle))

    async def getCurrentTrack(self, _: web.Request) -> web.Response:
        """get(/api/me/player/current-track)"""
        if self._player.currentSong is None:
            return web.HTTPNotFound()
        return web.json_response(self._player.currentSong.toDict())

    async def getCurrentPlaylist(self, _: web.Request) -> web.Response:
        """get(/api/me/player/current-playlist)"""
        return web.json_response(self._player.currentPlaylist.toDict())
