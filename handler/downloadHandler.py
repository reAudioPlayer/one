import asyncio
import os
from aiohttp import web
import aiohttp
from multidict import MultiDict
from dataModels.song import Song
from db.dbManager import DbManager
from downloader.downloader import Downloader
import eyed3
from eyed3.id3.frames import ImageFrame


class DownloadHandler:
    def __init__(self, dbManager: DbManager, downloader: Downloader) -> None:
        self._dbManager = dbManager
        self._downloader = downloader

    async def download(self, request: web.Request):
        id = int(request.match_info['id'])
        song = self._dbManager.getSongById(id)
        filename = f"{', '.join(song.artists)} - {song.title}".replace(",", "%2C") # header
        pathAndName = f"./_cache/{filename}.mp3"
        if os.path.exists(pathAndName):
            os.remove(pathAndName)
        await self._downloader.downloadSong(song.source, filename)
        pathAndName = f"./_cache/{filename}.mp3"

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

    async def stream(self, _: web.Request) -> web.Response:
        return web.FileResponse("./_cache/upNow.mp3")
