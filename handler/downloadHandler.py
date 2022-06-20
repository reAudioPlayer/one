# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

import os
from aiohttp import web
import aiohttp
from multidict import MultiDict
from db.dbManager import DbManager
from downloader.downloader import Downloader
import eyed3 # type: ignore
from eyed3.id3.frames import ImageFrame # type: ignore

from player.player import Player


class DownloadHandler:
    def __init__(self, dbManager: DbManager, downloader: Downloader, player: Player) -> None:
        self._dbManager = dbManager
        self._downloader = downloader
        self._player = player

    async def download(self, request: web.Request) -> web.Response:
        id = int(request.match_info['id'])
        song = self._dbManager.getSongById(id)
        filename = f"{', '.join(song.artists)} - {song.title}".replace(",", "%2C") # header
        pathAndName = f"./_cache/{song.id}.mp3"
        if os.path.exists(pathAndName):
            os.remove(pathAndName)
        await self._downloader.downloadSong(song.source, str(song.id))
        pathAndName = f"./_cache/{song.id}.mp3"

        file = eyed3.load(pathAndName)
        file.tag.artist = ", ".join(song.artists)
        file.tag.title = song.title
        file.tag.album = song._album

        async with aiohttp.ClientSession() as session:
            async with session.get(song._cover) as resp:
                if resp.status == 200:
                    file.tag.images.set(ImageFrame.FRONT_COVER, await resp.read(), 'image/jpeg', "Cover")

        file.tag.save(version=eyed3.id3.ID3_V2_3)

        res = web.FileResponse(pathAndName, headers=MultiDict({"Content-Disposition": f"Attachment;filename={filename}.mp3"}))
        await res.prepare(request)
        await res.write_eof()
        os.remove(pathAndName)
        return web.Response()

    async def streamFromCache(self, request: web.Request) -> web.FileResponse:
        index = int(request.match_info['id'])
        return web.FileResponse(f"./_cache/{index}.mp3")

    async def stream(self, _: web.Request) -> web.Response:
        if not self._player.currentSong:
            return web.Response(status = 428)
        return web.HTTPPermanentRedirect(f"/api/stream/{self._player.currentSong.id}")
