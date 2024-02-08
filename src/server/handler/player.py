# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = "Copyright (c) 2022 https://github.com/reAudioPlayer"

import asyncio
from typing import Dict, Any, Optional
import json

from aiohttp import web
from pyaddict.schema import Object, String, Integer, OneOf
from pyaddict import JDict

from db.database import Database
from helper.payloadParser import withObjectPayload
from player.player import Player
from player.playlistManager import PlaylistManager
from player.smartPlayerPlaylist import SpecialPlayerPlaylist, SongListPlayerPlaylist


class PlayerHandler:
    """player handler"""

    def __init__(self, player: Player, playlistManager: PlaylistManager) -> None:
        self._player = player
        self._playlistManager = playlistManager
        self._dbManager = Database()

    async def getNext(self, _: web.Request) -> web.Response:
        """get(/api/player/next)"""
        asyncio.create_task(self._player.next())
        return web.Response(status=200, text="success!")

    async def getPrevious(self, _: web.Request) -> web.Response:
        """get(/api/player/previous)"""
        asyncio.create_task(self._player.last())
        return web.Response(status=200, text="success!")

    @withObjectPayload(
        OneOf(
            Object({"type": String().enum("playlist"), "id": String()}),
            Object({"type": String().enum("track"), "id": Integer()}),
            Object({"type": String().enum("artist"), "name": String()}),
            Object({"type": String().enum("album"), "id": String()}),
        ),
        inBody=True,
    )
    async def loadPlaylist(self, payload: Dict[str, str]) -> web.Response:
        """post(/api/player/load)"""
        type_: str = payload["type"]
        id_: Optional[str | int] = payload.get("id")
        name: Optional[str] = payload.get("name")

        if type_ == "playlist":
            assert isinstance(id_, str)
            if playlist := self._playlistManager.get(id_):
                asyncio.create_task(self._player.loadPlaylist(playlist))
                return web.Response()
            return web.HTTPNotFound(text="playlist not found")

        if type_ == "track":
            assert isinstance(id_, int)
            playlist = SpecialPlayerPlaylist.track(int(id_))
            await playlist.waitForLoad()
            asyncio.create_task(self._player.loadPlaylist(playlist))
            return web.Response()

        if type_ == "artist":
            assert isinstance(name, str)
            playlist = await SongListPlayerPlaylist.artist(name)
            await playlist.waitForLoad()
            asyncio.create_task(self._player.loadPlaylist(playlist))
            return web.Response()

        if type_ == "album":
            assert isinstance(id_, str)
            playlist = await SongListPlayerPlaylist.album(id_)
            await playlist.waitForLoad()
            asyncio.create_task(self._player.loadPlaylist(playlist))
            return web.Response()

        return web.HTTPBadRequest(text="invalid type")

    @withObjectPayload(
        Object(
            {
                "index": Integer().min(0),  # index of song in playlist
                "playlist": String().optional(),  # playlist id
            }
        ),
        inBody=True,
    )
    async def loadSongAt(self, payload: Dict[str, Any]) -> web.Response:
        """post(/api/player/at)"""
        index: int = payload["index"]
        playlistId: Optional[str] = payload.get("playlist")

        if not playlistId:
            await self._player.at(index)
            return web.Response()

        playlist = self._playlistManager.get(playlistId)
        if not playlist:
            return web.HTTPNotFound()

        success = await self._player.loadPlaylist(playlist, index)
        if not success:
            return web.HTTPInternalServerError()
        return web.Response()

    async def updateSong(self, request: web.Request) -> web.Response:
        """put(/api/tracks/{id})"""
        id_ = int(request.match_info["id"])
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
        return web.Response(status=200)

    async def postShuffle(self, request: web.Request) -> web.Response:
        """post(/api/player/shuffle)"""
        shuffle = await request.json()
        if not isinstance(shuffle, bool):
            return web.HTTPBadRequest()

        self._player.shuffle = shuffle
        return web.Response()

    async def getShuffle(self, _: web.Request) -> web.Response:
        """get(/api/player/shuffle)"""
        return web.Response(status=200, text=json.dumps(self._player.shuffle))

    async def getCurrentTrack(self, _: web.Request) -> web.Response:
        """get(/api/me/player/current-track)"""
        if self._player.currentSong is None:
            return web.HTTPNotFound()
        return web.json_response(self._player.currentSong.toDict())

    async def getCurrentPlaylist(self, _: web.Request) -> web.Response:
        """get(/api/me/player/current-playlist)"""
        if self._player.currentPlaylist is None:
            return web.HTTPNotFound()
        return web.json_response(self._player.currentPlaylist.toDict())
