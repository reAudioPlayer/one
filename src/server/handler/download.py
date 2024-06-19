# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = "Copyright (c) 2022 https://github.com/reAudioPlayer"

import os
from typing import Union, Dict, Any

from aiohttp import web
from multidict import MultiDict
from pyaddict.schema import Object, Integer

from db.database import Database
from downloader.newDownloader import Downloader
from helper.payloadParser import withObjectPayload
from player.player import Player


class DownloadHandler:
    """download handler"""

    def __init__(self, downloader: Downloader, player: Player) -> None:
        self._dbManager = Database()
        self._downloader = downloader
        self._player = player

    async def downloadTrack(self, request: web.Request) -> web.StreamResponse:
        """get(/api/tracks/{id}/download)"""
        id_ = int(request.match_info["id"])
        song = await self._dbManager.songs.byId(id_)

        if not song:
            raise web.HTTPNotFound(text="song not found")

        pathAndName = f"./_cache/{song.id}.mp3"

        if not self._downloader.pop(id_):
            return web.HTTPExpectationFailed(text="not downloaded")

        filename = f"{song.artist} - {song.name}".replace(",", "%2C")  # header

        return web.FileResponse(
            pathAndName,
            headers=MultiDict({"Content-Disposition": f"Attachment;filename={filename}.mp3"}),
        )

    @withObjectPayload(  # type: ignore
        Object(
            {
                "id": Integer().coerce(),
            }
        ),
        inPath=True,
    )
    async def deleteFromCache(
        self, payload: Dict[str, Any]
    ) -> Union[web.FileResponse, web.Response]:
        """delete(/api/player/stream/{id})"""
        id_: int = payload["id"]
        pathAndName = f"./_cache/{id_}.mp3"
        if os.path.exists(pathAndName):
            os.remove(pathAndName)
            return web.Response()
        return web.Response(status=404)

    @withObjectPayload(  # type: ignore
        Object(
            {
                "id": Integer().coerce(),
            }
        ),
        inPath=True,
    )
    async def streamFromCache(
        self, payload: Dict[str, Any]
    ) -> Union[web.FileResponse, web.Response]:
        """get(/api/player/stream/{id})"""
        id_: int = payload["id"]
        pathAndName = f"./_cache/{id_}.mp3"
        if os.path.exists(pathAndName):
            return web.FileResponse(pathAndName)
        return web.Response(status=404)

    async def stream(self, _: web.Request) -> web.Response:
        """get(/api/player/stream)"""
        if not self._player.currentSong:
            return web.HTTPPreconditionRequired()
        return web.HTTPPermanentRedirect(f"/api/player/stream/{self._player.currentSong.model.id}")
