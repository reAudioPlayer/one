# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = "Copyright (c) 2022 https://github.com/reAudioPlayer"

import asyncio
from os import path
import os
from typing import Optional
import logging
import shutil

import aiohttp
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


class Downloader(metaclass = Singleton):
    """downloader"""
    __slots__ = ("_opts", "_ydl", "_logger")

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
        self._logger = logging.getLogger("downloader")

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

        # download
        DOWNLOADING.append(filename)
        self._ydl.params["outtmpl"] = {
            "default": relName,
        }

        try:
            err = await asyncRunInThreadWithReturn(self._ydl.download, [ link ])
            DOWNLOADING.remove(filename)
            return isinstance(err, int) and err == 0
        except: # pylint: disable=bare-except
            self._logger.error("%s could not be downloaded (%s / %s)", filename, relName.replace("%(ext)s", "mp3"), link) # pylint: disable=line-too-long
            DOWNLOADING.remove(filename)
            return path.exists(relName.replace("%(ext)s", "mp3"))
