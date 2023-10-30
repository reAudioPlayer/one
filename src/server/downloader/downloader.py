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

from pyaddict import JDict
import aiohttp
from aiohttp import web
import eyed3  # type: ignore
from eyed3.id3.frames import ImageFrame  # type: ignore
from eyed3.id3 import Tag  # type: ignore
from yt_dlp import YoutubeDL  # type: ignore

from helper.asyncThread import asyncRunInThreadWithReturn
from helper.singleton import Singleton
from config.customData import LocalTrack
from db.database import Database
from db.table.songs import SongModel
from dataModel.song import Song


DOWNLOADING = []


class DownloadStatus:
    """download status"""

    __slots__ = (
        "_total",
        "_downloaded",
        "_percent",
        "_speed",
        "_elapsed",
        "_songId",
        "_eta",
        "_status",
        "_filename",
        "_chunk",
    )

    def __init__(self, data: Dict[str, Any]) -> None:
        dex = JDict(data)
        self._status = dex.ensure("status", str)
        self._downloaded = dex.ensure("downloaded_bytes", int, 0)
        self._total = dex.ensure("total_bytes", int, self._downloaded)
        self._percent = float(
            dex.ensure("_percent_str", str, "0%").replace("%", "").replace(" ", "")
        )
        self._speed = dex.ensure("_speed_str", str, "0")
        self._elapsed = dex.ensure("_elapsed_str", str, "0")
        self._eta = dex.ensure("eta", int, 0)
        self._filename = dex.ensure("filename", str, "")
        # './_cache/159.dl.mp3' -> 159
        # consider chunks!

        nameNoPath = self._filename.split("/")[-1]
        self._songId = int(nameNoPath.split(".")[0])
        self._chunk: Optional[str] = None
        if len(nameNoPath.split(".")) > 3:
            self._chunk = nameNoPath.split(".")[2]

    @property
    def showInUI(self) -> bool:
        """show in ui"""
        return ".dl" in self._filename

    def toDict(self, downloaded: Dict[int, SongModel]) -> Dict[str, Any]:
        """to dict"""
        res = {
            "songId": self._songId,
            "filename": self._filename,
            "status": self._status,
            "total": self._total,
            "downloaded": self._downloaded,
            "percent": round(self._percent, 2),
            "speed": self._speed,
            "elapsed": self._elapsed,
            "eta": self._eta,
            "chunk": self._chunk,
            "internal": not self.showInUI,
        }
        if self._songId in downloaded:
            res["song"] = downloaded[self._songId].toDict()
        return res


class Downloader(metaclass=Singleton):
    """downloader"""

    __slots__ = (
        "_opts",
        "_ydl",
        "_statusQueue",
        "_logger",
        "_websocketClients",
        "_downloadStatusTask",
        "_db",
        "_downloaded",
    )

    def __init__(self) -> None:
        self._opts = {
            "noplaylist": True,
            "outtmpl": "./_cache/upNow.%(ext)s",
            "postprocessors": [{"key": "FFmpegExtractAudio", "preferredcodec": "mp3"}],
        }
        self._ydl = YoutubeDL(self._opts)
        self._ydl.add_progress_hook(self._hook)
        self._logger = logging.getLogger("downloader")
        self._statusQueue: Queue[DownloadStatus] = Queue()
        self._websocketClients: set[web.WebSocketResponse] = set()
        self._downloadStatusTask: Optional[asyncio.Task[None]] = None
        self._db = Database()
        self._downloaded: Dict[int, SongModel] = {}

    async def _downloadStatusLoop(self) -> None:
        while True:
            try:
                status = self._statusQueue.get(False)
                for client in self._websocketClients:
                    await client.send_json(status.toDict(self._downloaded))
                self._statusQueue.task_done()
            except Empty:
                pass
            await asyncio.sleep(0.1)

    async def websocketEndpoint(self, request: web.Request) -> web.WebSocketResponse:
        """websocket status"""
        ws = web.WebSocketResponse(heartbeat=10)
        await ws.prepare(request)
        self._websocketClients.add(ws)

        async def _handleMessage(data: JDict) -> Optional[Dict[str, Any]]:
            if data.ensure("action", str) == "download":
                if data.ensure("source", str) == "db":
                    songId = data.ensure("songId", int, -1)
                    song = await self._db.songs.byId(songId)
                    if not song:
                        return {
                            "action": "download",
                            "status": "error",
                            "message": "song not found",
                            "songId": songId,
                        }
                else:
                    song = Song.fromDict(data).model
                    self._logger.info("download custom song %s", song)
                asyncio.create_task(self.downloadSong(song, True, True))
                return {"action": "download", "status": "ok", "songId": song.id}
            return {
                "action": data.optionalGet("action", str),
                "status": "error",
                "message": "unknown action",
            }

        async for message in ws:
            if message.type == web.WSMsgType.TEXT:
                if message.data == "close":
                    await ws.close()
                jdata = JDict(message.json())
                response = await _handleMessage(jdata)
                if response:
                    await ws.send_json(response)
            elif message.type == web.WSMsgType.ERROR:
                self._logger.error("ws connection closed with exception %s", ws.exception())
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

        tag.images.set(ImageFrame.FRONT_COVER, await self._getCover(song), "image/jpeg", "Cover")

        file.tag = tag
        tag.save(version=eyed3.id3.ID3_V2_3)

    async def downloadSong(
        self, song: SongModel, forExport: bool = False, withMetadata: bool = False
    ) -> bool:
        """downloads a song"""
        filename = Song(song).downloadPath(forExport)
        self._downloaded[song.id] = song
        result = await self.download(song.source, filename)
        if not result:
            return False
        if withMetadata:
            await self._applyMetadata(filename, song)
        self._emulateHook("finished", filename)
        return True

    def _hook(self, data: Dict[str, Any]) -> None:
        if not data.get("emulated") and data["status"] != "downloading":
            return
        self._statusQueue.put(DownloadStatus(data))

    def _emulateHook(self, status: str, filename: str) -> None:
        self._hook({"status": status, "filename": filename, "emulated": True})

    def getSongById(self, songId: int) -> Optional[SongModel]:
        """gets a song by id"""
        return self._downloaded.get(songId)

    def pop(self, songId: int) -> bool:
        """checks if a song is ready"""
        if songId not in self._downloaded:
            return False
        if not path.exists(f"./_cache/{songId}.dl.mp3"):
            return False
        self._downloaded.pop(songId)
        return True

    async def download(self, link: Optional[str], filename: str) -> bool:
        """downloads a song from a link (low level)"""

        if self._downloadStatusTask is None:
            self._downloadStatusTask = asyncio.create_task(self._downloadStatusLoop())

        self._logger.info("downloading %s (%s)", link, filename)

        if link is None:
            self._logger.warning("link is None")
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
            self._logger.debug("already downloading %s", filename)
            return path.exists(dest)

        if link.startswith("local:"):
            link = LocalTrack.fromDisplayPath(link).absPath
            self._logger.debug("using local file %s", link)

        # is local file
        if path.exists(link):
            self._logger.debug("copying %s to %s", link, dest)
            shutil.copy(os.path.normpath(link), os.path.normpath(relName.replace("%(ext)s", "mp3")))
            self._emulateHook("finished", filename)
            return True

        # already at dest
        if path.exists(dest):
            self._logger.debug("already at dest %s", dest)
            self._emulateHook("finished", filename)
            return True

        # copy failed, can't download
        if not isLink:
            self._logger.error("can't download %s", link)
            return False

        # download
        DOWNLOADING.append(filename)
        self._ydl.params["outtmpl"] = {"default": relName, "noplaylist": True}

        try:
            err = await asyncRunInThreadWithReturn(self._ydl.download, [link])
            DOWNLOADING.remove(filename)
            return isinstance(err, int) and err == 0
        except Exception as err:  # pylint: disable=broad-except
            self._emulateHook("error", filename)
            self._logger.exception(err)
            self._logger.error(
                "%s could not be downloaded (%s / %s)",
                filename,
                relName.replace("%(ext)s", "mp3"),
                link,
            )  # pylint: disable=line-too-long
            DOWNLOADING.remove(filename)
            return path.exists(relName.replace("%(ext)s", "mp3"))
