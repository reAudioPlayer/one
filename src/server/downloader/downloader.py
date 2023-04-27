# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = "Copyright (c) 2022 https://github.com/reAudioPlayer"

import asyncio
from os import path
import os
from typing import Any, Dict, Optional
import logging
import shutil
from queue import Queue, Empty

import aiohttp
from aiohttp import web
import eyed3 # type: ignore
from eyed3.id3.frames import ImageFrame # type: ignore
from eyed3.id3 import Tag # type: ignore
from yt_dlp import YoutubeDL # type: ignore

from helper.asyncThread import asyncRunInThreadWithReturn
from helper.singleton import Singleton
from config.customData import LocalTrack
from db.table.songs import SongModel
from dataModel.song import Song


DOWNLOADING = [ ]


class DownloadStatus:
    """download status"""
    __slots__ = ("_total", "_downloaded", "_percent", "_speed", "_elapsed",
                 "_songId", "_eta", "_status")

    def __init__(self, data: Dict[str, Any]) -> None:
        self._status = data['status']
        self._total = 0
        self._downloaded = 0
        self._percent = 0
        self._speed = "0"
        self._elapsed = "0"
        self._eta = "0"
        filename = data['filename']
        # './_cache/159.dl.mp3' -> 159
        # consider chunks!
        self._songId = int(filename.split("/")[-1].split(".")[0])

        if self._status == "downloading":
            self._total = data['total_bytes']
            self._downloaded = data['downloaded_bytes']
            self._percent = self._downloaded / self._total * 100
            self._speed = data['_speed_str'].strip()
            self._elapsed = data['_elapsed_str'].strip()
            self._eta = data['eta']

    def toDict(self) -> Dict[str, Any]:
        """to dict"""
        if self._status == "finished":
            return {
                "songId": self._songId,
                "status": self._status
            }

        return {
            "songId": self._songId,
            "status": self._status,
            "total": self._total,
            "downloaded": self._downloaded,
            "percent": round(self._percent, 2),
            "speed": self._speed,
            "elapsed": self._elapsed,
            "eta": self._eta,
        }


class Downloader(metaclass = Singleton):
    """downloader"""
    __slots__ = ("_opts", "_ydl", "_statusQueue", "_logger", "_websocketClients",
                 "_downloadStatusTask")

    def __init__(self) -> None:
        self._opts = {
            'noplaylist': True,
            "outtmpl": "./_cache/upNow.%(ext)s",
            "postprocessors": [{
                "key": "FFmpegExtractAudio",
                "preferredcodec": "mp3"
            }]
        }
        self._ydl = YoutubeDL(self._opts)
        self._ydl.add_progress_hook(self._hook)
        self._logger = logging.getLogger("downloader")
        self._statusQueue: Queue[DownloadStatus] = Queue()
        self._websocketClients: set[web.WebSocketResponse] = set()
        self._downloadStatusTask: Optional[asyncio.Task] = None

    async def _downloadStatusLoop(self) -> None:
        while True:
            try:
                status = self._statusQueue.get(False)
                for client in self._websocketClients:
                    await client.send_json(status.toDict())
                self._statusQueue.task_done()
            except Empty:
                pass
            await asyncio.sleep(0.1)

    async def websocketEndpoint(self, request: web.Request) -> web.WebSocketResponse:
        """websocket status"""
        ws = web.WebSocketResponse(heartbeat = 10)
        await ws.prepare(request)
        self._websocketClients.add(ws)
        async for message in ws:
            if message.type == web.WSMsgType.TEXT:
                if message.data == "close":
                    await ws.close()
            elif message.type == web.WSMsgType.ERROR:
                self._logger.error("ws connection closed with exception %s",
                                   ws.exception())
        self._logger.info("websocket connection closed")
        self._websocketClients.remove(ws)
        return ws

    async def _getCover(self, song: SongModel) -> bytes:
        async with aiohttp.ClientSession() as session:
            async with session.get(song.cover) as resp:
                if resp.status != 200:
                    raise LookupError()
                return await resp.read()

    async def _applyMetadata(self, filename: str, song: SongModel) -> None:
        fullPath = f"./_cache/{filename}.mp3"
        file = eyed3.load(fullPath)
        tag = file.tag or Tag()

        if song.artists:
            tag.artist = ", ".join(song.artists)
        tag.title = song.name
        tag.album = song.album

        tag.images.set(ImageFrame.FRONT_COVER,
                                   await self._getCover(song),
                                   'image/jpeg',
                                   "Cover")

        file.tag = tag
        tag.save(version=eyed3.id3.ID3_V2_3)

    async def downloadSong(self,
                           song: SongModel,
                           forExport: bool = False,
                           withMetadata: bool = False) -> bool:
        """downloads a song"""
        filename = Song(song).downloadPath(forExport)
        result = await self.download(song.source, filename)
        if not result:
            return False
        if withMetadata:
            await self._applyMetadata(filename, song)
        return True

    def _hook(self, data: Dict[str, Any]) -> None:
        self._statusQueue.put(DownloadStatus(data))

    async def download(self, link: Optional[str], filename: str) -> bool:
        """downloads a song from a link (low level)"""

        self._logger.info("downloading %s (%s)", link, filename)

        if link is None:
            return False

        # relative dest path
        relName = f"./_cache/{filename}.%(ext)s"
        dest = relName.replace("%(ext)s", "mp3")

        # dest folder
        if not path.exists("./_cache"):
            os.mkdir("./_cache")

        isLink = link.startswith("http")

        if filename in DOWNLOADING:
            while filename in DOWNLOADING:
                await asyncio.sleep(1)
            return path.exists(dest)

        if link.startswith("local:"):
            link = LocalTrack.fromDisplayPath(link).absPath
            self._logger.debug("using local file %s", link)

        # is local file
        if path.exists(link):
            self._logger.debug("copying %s to %s", link, dest)
            shutil.copy(os.path.normpath(link), os.path.normpath(relName.replace("%(ext)s", "mp3")))
            return True

        # already at dest
        if path.exists(dest):
            return True

        # copy failed, can't download
        if not isLink:
            return False

        if self._downloadStatusTask is None:
            self._downloadStatusTask = asyncio.create_task(self._downloadStatusLoop())

        # download
        DOWNLOADING.append(filename)
        self._ydl.params["outtmpl"] = {
            "default": relName,
            "noplaylist": True,
            "quiet": True
        }

        try:
            err = await asyncRunInThreadWithReturn(self._ydl.download, [ link ])
            DOWNLOADING.remove(filename)
            return isinstance(err, int) and err == 0
        except: # pylint: disable=bare-except
            self._logger.error("%s could not be downloaded (%s / %s)", filename, relName.replace("%(ext)s", "mp3"), link) # pylint: disable=line-too-long
            DOWNLOADING.remove(filename)
            return path.exists(relName.replace("%(ext)s", "mp3"))
