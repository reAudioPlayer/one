# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = "Copyright (c) 2022 https://github.com/reAudioPlayer"

from typing import Any, Dict
from aiohttp import web
from pyaddict.schema import Object, Integer, Array, String
from helper.payloadParser import withObjectPayload, PayloadParser
from dataModel.song import Song
from player.player import Player
from player.playlistManager import PlaylistManager
from player.smartPlayerPlaylist import SmartPlayerPlaylist, SpecialPlayerPlaylist


SMART_DEFINITION = Object(
    {
        "limit": Integer().min(1).optional(),
        "direction": String().enum("asc", "desc").optional(),
        "sort": String().enum("title", "artist", "album", "duration", "id").optional(),
        "filter": Object(
            {
                "title": Array(String()).optional(),
                "artist": Array(String()).optional(),
                "album": Array(String()).optional(),
                "duration": Object(
                    {"from": Integer().min(0).optional(), "to": Integer().min(0).optional()}
                ).optional(),
            }
        ).optional(),
    }
)

SMART_PLAYLIST = Object(
    {
        "name": String().min(1).optional(),
        "description": String().coerce().optional(),
        "cover": String().min(1).optional(),
        "definition": SMART_DEFINITION.optional(),
    }
)


class PlaylistHandler:
    """playlist handler"""

    def __init__(self, player: Player, playlistManager: PlaylistManager) -> None:
        self._player = player
        self._playlistManager = playlistManager

    async def addSong(self, request: web.Request) -> web.Response:
        """post(/api/playlists/{id}/tracks)"""
        id_ = str(request.match_info["id"])
        jdata = await request.json()

        if isinstance(jdata, list):
            success = await self._playlistManager.addAllToPlaylist(
                id_, [Song.fromDict(song) for song in jdata]
            )
        elif isinstance(jdata, dict):
            success = await self._playlistManager.addToPlaylist(id_, Song.fromDict(jdata))
        if success:
            return web.Response()
        return web.HTTPInternalServerError()

    async def moveSong(self, request: web.Request) -> web.Response:
        """put(/api/playlists/{id}/tracks)"""
        id_ = str(request.match_info["id"])
        jdata = await request.json()
        success = await self._playlistManager.moveInPlaylist(
            id_, jdata["songOldIndex"], jdata["songNewIndex"]
        )
        if success:
            return web.Response()
        return web.HTTPInternalServerError()

    async def removeSong(self, request: web.Request) -> web.Response:
        """/api/playlists/{id}/tracks"""
        id_ = str(request.match_info["id"])
        jdata = await request.json()
        if not "songId" in jdata:
            return web.Response(status=400, text="no songId")
        success = await self._playlistManager.removefromPlaylist(id_, jdata["songId"])
        if success:
            return web.Response()
        return web.HTTPInternalServerError()

    @withObjectPayload(Object({"id": String().coerce()}), inPath=True)
    async def getPlaylist(self, payload: Dict[str, Any]) -> web.Response:
        """post(/api/playlists/{id})"""
        id_: str = payload["id"]
        if playlist := self._playlistManager.get(id_):
            return web.json_response(playlist.toDict())
        return web.HTTPNotFound()

    async def getPlaylists(self, _: web.Request) -> web.Response:
        """get(/api/playlists)"""
        return web.json_response(
            [playlist.toDict() for playlist in self._playlistManager.playlists]
        )

    @withObjectPayload(
        Object(
            {
                "type": String().enum("classic", "smart").default("classic"),
            }
        ),
        inQuery=True,
    )
    async def createPlaylist(self, payload: Dict[str, str]) -> web.Response:
        """get(/api/playlists/new)"""
        href = ""
        if payload["type"] == "classic":
            href = await self._playlistManager.addClassicPlaylist()
        elif payload["type"] == "smart":
            href = await self._playlistManager.addSmartPlaylist()
        return web.Response(text=href)

    @withObjectPayload(
        Object(
            {
                "id": String().coerce(),
            }
        ),
        inPath=True,
    )
    async def deletePlaylist(self, payload: Dict[str, Any]) -> web.Response:
        """delete(/api/playlists/id/{id})"""
        id_: str = payload["id"]
        if await self._playlistManager.removePlaylist(id_):
            return web.Response()
        return web.HTTPNotFound()

    async def updatePlaylist(self, request: web.Request) -> web.Response:
        """post(/api/playlists/{id})"""
        id_ = str(request.match_info["id"])
        jdata: Dict[str, Any] = await request.json()
        success = self._playlistManager.updatePlaylist(
            id_, jdata.get("name"), jdata.get("description"), jdata.get("cover")
        )
        return web.Response() if success else web.HTTPNotFound()

    @withObjectPayload(SMART_DEFINITION, inBody=True)
    async def peekSmartPlaylist(self, payload: Dict[str, Any]) -> web.Response:
        """post(/api/playlists/smart/preview)"""
        playlist = SpecialPlayerPlaylist("Peek", "", payload, "peek", "")
        await playlist.waitForLoad()
        return web.json_response(playlist.toDict())

    @withObjectPayload(
        Object(
            {
                "id": String().coerce(),
            }
        ),
        inPath=True,
    )
    async def getSmartPlaylistDefinition(self, payload: Dict[str, str]) -> web.Response:
        """get(/api/playlists/smart/{id})"""
        playlist = self._playlistManager.get(payload["id"])
        if not isinstance(playlist, SmartPlayerPlaylist):
            return web.HTTPNotFound()
        return web.json_response(playlist.definition)

    async def updateSmartPlaylist(self, request: web.Request) -> web.Response:
        """put(/api/playlists/smart/{id})"""
        parsedPayload = await PayloadParser.fromBody(request, SMART_PLAYLIST, dict)
        path = PayloadParser.fromPath(
            request,
            Object(
                {
                    "id": String().coerce(),
                }
            ),
        ).unwrap()
        if not parsedPayload:
            return web.HTTPBadRequest(text=str(parsedPayload.error))
        payload = parsedPayload.unwrap()
        playlist = self._playlistManager.get(path["id"])
        if not isinstance(playlist, SmartPlayerPlaylist):
            return web.HTTPNotFound()
        playlist.updateMeta(
            payload.get("name", ""), payload.get("description", ""), payload.get("cover", "")
        )
        playlist.definition = payload["definition"]
        return web.Response()
