# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

import asyncio
from os import path
import os
from typing import Optional
import logging
import shutil

from yt_dlp import YoutubeDL # type: ignore

from helper.asyncThread import asyncRunInThreadWithReturn
from config.runtime import Runtime


SERVICE_NAME = "one-reap-one-1"
DOWNLOADING = [ ]


class Downloader:
    """downloader"""
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

    async def downloadSong(self, link: Optional[str], filename: str) -> bool:
        """downloads a song"""

        self._logger.warning("downloading %s (%s)", link, filename)

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

        # is local file
        if path.exists(link):
            self._logger.warning("copying %s to %s", link, dest)
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
        self._ydl.outtmpl_dict["default"] = relName

        try:
            err = await asyncRunInThreadWithReturn(self._ydl.download, [ link ])
            DOWNLOADING.remove(filename)
            return isinstance(err, int) and err == 0
        except: # pylint: disable=bare-except
            print(f"{filename} could not be downloaded ({relName.replace('%(ext)s', 'mp3')})")
            DOWNLOADING.remove(filename)
            return path.exists(relName.replace("%(ext)s", "mp3"))
