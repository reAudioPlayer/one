# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

import asyncio
from os import path
from typing import Optional
from yt_dlp import YoutubeDL # type: ignore
from helper.asyncThread import asyncRunInThreadWithReturn


"""
class OnDownloadFinishedPP(postprocessor.PostProcessor):
    def __init__(self, player: Player, downloader=None):
        super().__init__(downloader=downloader)
        self._player = player

    def run(self, info):
        self._player.next()
        return [], info
"""

DOWNLOADING = [ ]


class Downloader:
    def __init__(self) -> None:
        self._ydl_opts = {
            'noplaylist': True,
            "outtmpl": "./_cache/upNow.%(ext)s",
            "postprocessors": [{
                "key": "FFmpegExtractAudio",
                "preferredcodec": "mp3"
            }]
        }
        self._ydl = YoutubeDL(self._ydl_opts)
        #self._ydl.add_post_processor(OnDownloadFinishedPP(player))

    async def downloadSong(self, link: Optional[str], filename: str = "upNow") -> bool:
        if link is None:
            return False

        relName = f"./_cache/{filename}.%(ext)s"

        if filename in DOWNLOADING:
            while filename in DOWNLOADING:
                await asyncio.sleep(1)
            return path.exists(relName.replace("%(ext)s", "mp3"))

        if path.exists(relName.replace("%(ext)s", "mp3")):
            return True
        DOWNLOADING.append(filename)
        self._ydl.outtmpl_dict["default"] = relName
        try:
            err = await asyncRunInThreadWithReturn(self._ydl.download, [ link ])
            DOWNLOADING.remove(filename)
            return isinstance(err, int) and err == 0
        except:
            print(f"{filename} could not be downloaded ({relName.replace('%(ext)s', 'mp3')})")
            DOWNLOADING.remove(filename)
            return path.exists(relName.replace("%(ext)s", "mp3"))
