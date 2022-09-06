# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

import asyncio
from os import path
import os
from typing import Optional
from yt_dlp import YoutubeDL # type: ignore
from helper.asyncThread import asyncRunInThreadWithReturn


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

    async def downloadSong(self, link: Optional[str], filename: str) -> bool:
        """downloads a song"""
        if link is None:
            return False

        relName = f"./_cache/{filename}.%(ext)s"

        if not path.exists("./_cache"):
            os.mkdir("./_cache")

        if filename in DOWNLOADING:
            while filename in DOWNLOADING:
                await asyncio.sleep(1)
            return path.exists(relName.replace("%(ext)s", "mp3"))

        if path.exists(relName.replace("%(ext)s", "mp3")):
            return True
        if path.exists(link):
            os.link(os.path.normpath(link), os.path.normpath(relName.replace("%(ext)s", "mp3")))
            return True

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
