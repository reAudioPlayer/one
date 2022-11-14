# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

import asyncio
from os import path
import os
from typing import Optional
import logging
import tarfile

from yt_dlp import YoutubeDL # type: ignore

from helper.asyncThread import asyncRunInThreadWithReturn
from config.runtime import Runtime


SERVICE_NAME = "reap-one"
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

        if Runtime.args.withDocker:
            import docker # type: ignore
            self._docker = docker.from_env()

    async def downloadSong(self, link: Optional[str], filename: str) -> bool:
        """downloads a song"""
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
            os.link(os.path.normpath(link), os.path.normpath(relName.replace("%(ext)s", "mp3")))
            return True

        if Runtime.args.withDocker and not isLink:
            # attempt to copy via docker sdk
            self._copyToDocker(link, dest)

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

    def _copyToDocker(self, src: str, dst: str) -> bool:
        """copies a file to the docker container"""
        assert self._docker is not None
        service = self._docker.services.get(SERVICE_NAME)
        if service is None:
            print(f"Service {SERVICE_NAME} not found")
            return False

        from docker.models import containers, services # type: ignore
        assert isinstance(service, services.Service)
        container = service.tasks()[0]["Status"]["ContainerStatus"]["ContainerID"]
        assert isinstance(container, containers.Container)

        os.chdir(os.path.dirname(src))
        srcname = os.path.basename(src)
        with tarfile.open(src + '.tar', mode='w') as tar:
            tar.add(srcname)

        with open(src + '.tar', 'rb') as file:
            data = file.read()

        container.put_archive(os.path.dirname(dst), data)
        return True
