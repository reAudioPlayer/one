# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = "Copyright (c) 2024 https://github.com/reAudioPlayer"

import asyncio
from enum import StrEnum
from os import path
import os
from typing import Any, Dict, Optional
import logging
import shutil
from queue import Queue, Empty
import subprocess

from pyaddict import JDict
import aiohttp
from aiohttp import web
import eyed3  # type: ignore
from eyed3.id3.frames import ImageFrame  # type: ignore
from eyed3.id3 import Tag  # type: ignore

from helper.asyncThread import asyncRunInThreadWithReturn
from helper.singleton import Singleton
from config.customData import LocalTrack, LocalCover
from db.database import Database
from db.table.songs import SongModel
from dataModel.song import Song


DOWNLOADING = []


class DownloadState(StrEnum):
    """download state"""

    DOWNLOADING = "downloading"
    FINISHED = "finished"
    ERROR = "error"


class DownloadStatus:
    """download status"""

    __slots__ = (
        "_status",
        "_song",
        "_internal",
    )

    def __init__(self, status: DownloadState, song: Song, internal: bool = False) -> None:
        self._status = status
        self._song = song
        self._internal = internal

    @property
    def showInUI(self) -> bool:
        """show in ui"""
        return not self._internal

    def toDict(self) -> Dict[str, Any]:
        """to dict"""
        res = {
            "id": self._song.model.hash,
            "song": self._song.toDict(),
            "status": self._status,
            "internal": not self.showInUI,
        }
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
    )

    def __init__(self) -> None:
        self._opts = {
            "noplaylist": True,
            "postprocessors": [{"key": "FFmpegExtractAudio", "preferredcodec": "mp3"}],
        }
        self._logger = logging.getLogger("downloader")
        self._statusQueue: Queue[DownloadStatus] = Queue()
        self._websocketClients: set[web.WebSocketResponse] = set()
        self._downloadStatusTask: Optional[asyncio.Task[None]] = None
        self._db = Database()

        if not path.exists("./_cache"):
            os.mkdir("./_cache")

    async def _getCover(self, song: SongModel) -> bytes:
        if song.cover.startswith("local:"):
            cover = LocalCover.fromDisplayPath(song.cover)
            with open(cover.absPath, "rb") as file:
                return file.read()

        async with aiohttp.ClientSession() as session:
            async with session.get(song.cover) as resp:
                if resp.status != 200:
                    raise LookupError()
                return await resp.read()

    async def _applyMetadata(self, filename: str, song: SongModel) -> None:
        file = eyed3.load(filename)
        tag = file.tag or Tag()

        if song.artists:
            tag.artist = ", ".join(song.artists)
        tag.title = song.name
        tag.album = song.album

        tag.images.set(ImageFrame.FRONT_COVER, await self._getCover(song), "image/jpeg", "Cover")

        file.tag = tag
        tag.save(version=eyed3.id3.ID3_V2_3)

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
        ws = web.WebSocketResponse(heartbeat=10)
        await ws.prepare(request)
        self._websocketClients.add(ws)

        async def _handleMessage(data: JDict) -> Optional[Dict[str, Any]]:
            if data.ensure("action", str) == "download":
                if data.ensure("source", str) == "db":
                    songId = data.ensure("songId", int, -1)
                    songModel = await self._db.songs.byId(songId)
                    if not songModel:
                        return {
                            "action": "download",
                            "status": "error",
                            "message": "song not found",
                            "songId": songId,
                        }
                    song = Song(songModel)
                else:
                    song = Song.fromDict(data)
                    self._logger.info("download custom song %s", song)
                asyncio.create_task(self.downloadSong(song))
                return {"action": "download", "status": "ok", "songId": song.model.id}
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

    def _hook(self, status: DownloadStatus) -> None:
        self._statusQueue.put(status)

    def pop(self, songId: int) -> bool:
        """checks if a song is ready"""
        if not path.exists(f"./_cache/{songId}.mp3"):
            return False
        return True

    async def downloadSong(self, song: Song, internal: bool = False) -> bool:
        """downloads a song"""
        self._hook(
            DownloadStatus(
                DownloadState.DOWNLOADING,
                song,
                internal=internal,
            )
        )
        result = await self.download(song)
        self._hook(
            DownloadStatus(
                DownloadState.FINISHED if result else DownloadState.ERROR,
                song,
                internal=internal,
            )
        )
        if not result:
            return False
        return True

    async def download(self, song: Song) -> bool:
        """downloads a song from a link (low level)"""

        if self._downloadStatusTask is None:
            self._downloadStatusTask = asyncio.create_task(self._downloadStatusLoop())

        filename = song.downloadPath()
        link = song.model.source
        self._logger.info("downloading %s (%s)", link, filename)

        # relative dest path
        relName = f"./_cache/{filename}.%(ext)s"
        dest = relName.replace("%(ext)s", "mp3")

        isLink = link.startswith("http")

        # don't download twice
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
            await self._applyMetadata(dest, song.model)
            return True

        # already at dest
        if path.exists(dest):
            self._logger.debug("already at dest %s", dest)
            return True

        # copy failed, can't download
        if not isLink:
            self._logger.error("can't download %s", link)
            return False

        # download
        DOWNLOADING.append(filename)

        def _implement() -> int:
            return subprocess.run(
                ["yt-dlp", "--extract-audio", "--audio-format", "mp3", link, "-o", relName],
                check=False,
            ).returncode

        try:
            err = await asyncRunInThreadWithReturn(_implement)
            await self._applyMetadata(dest, song.model)
            DOWNLOADING.remove(filename)
            return isinstance(err, int) and err == 0
        except Exception as err:  # pylint: disable=broad-except
            self._logger.exception(err)
            self._logger.error(
                "%s could not be downloaded (%s / %s)",
                filename,
                relName.replace("%(ext)s", "mp3"),
                link,
            )  # pylint: disable=line-too-long
            DOWNLOADING.remove(filename)
            return path.exists(relName.replace("%(ext)s", "mp3"))
