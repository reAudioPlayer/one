# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
from __future__ import annotations
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")


from abc import ABC, abstractmethod
from pathlib import Path
import logging


PATH = "/opt/reAudioPlayer/usr"
TRACKS = PATH + "/tracks/"
COVERS = PATH + "/covers/"


class LocalFile(ABC):
    """local file"""
    def __init__(self, absPath: str) -> None:
        self._absPath = absPath

    @property
    def absPath(self) -> str:
        """absolute path"""
        return self._absPath

    @property
    @abstractmethod
    def displayPath(self) -> str:
        """path to file for display"""

    @property
    @abstractmethod
    def dir(self) -> str:
        """directory"""

    def delete(self) -> None:
        """delete file"""
        logging.getLogger("localFile").info("deleting %s", self.absPath)
        Path(self.absPath).unlink(missing_ok=True)

    def createDir(self) -> None:
        """create directory"""
        Path(self.dir).mkdir(parents = True, exist_ok = True)

    def write(self, data: bytes) -> None:
        """write data"""
        self.createDir()
        logging.getLogger("localFile").info("writing %s", self.absPath)
        with open(self.absPath, "wb") as file:
            file.write(data)


class LocalTrack(LocalFile):
    """local track"""
    @property
    def displayPath(self) -> str:
        """display path"""
        return self._absPath.replace(TRACKS, "local:")

    @property
    def dir(self) -> str:
        """directory"""
        return TRACKS

    @staticmethod
    def fromDisplayPath(displayPath: str) -> LocalTrack:
        """from display path"""
        return LocalTrack(displayPath.replace("local:", TRACKS))

    @staticmethod
    def createNew(name: str) -> LocalTrack:
        """create new"""
        return LocalTrack(TRACKS + name)

    @staticmethod
    def getAll() -> list[LocalTrack]:
        """get all"""
        return [LocalTrack(str(path)) for path in Path(TRACKS).glob("**/*")]


class LocalCover(LocalFile):
    """local cover"""
    @property
    def displayPath(self) -> str:
        """display path"""
        return self._absPath.replace(COVERS, "local:")

    @property
    def dir(self) -> str:
        """directory"""
        return COVERS

    @staticmethod
    def fromDisplayPath(displayPath: str) -> LocalCover:
        """from display path"""
        return LocalCover(displayPath.replace("local:", COVERS))

    @staticmethod
    def createNew(name: str) -> LocalCover:
        """create new"""
        return LocalCover(COVERS + name)

    @staticmethod
    def getAll() -> list[LocalCover]:
        """get all"""
        return [LocalCover(str(path)) for path in Path(COVERS).glob("**/*")]
