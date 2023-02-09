# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = "Copyright (c) 2023 https://github.com/reAudioPlayer"

import os
from typing import List, Optional, Union
from config.runtime import Runtime
from dataModel.song import Song
from player.playerPlaylist import PlayerPlaylist


CACHE_PATH = os.path.abspath("./_cache")


class SongCache:
    """SongCache"""
    @staticmethod
    def deleteFiles(files: List[str]) -> None:
        """pass w/o CACHE_PATH, relative file name only"""
        for file in files:
            os.remove(os.path.join(CACHE_PATH, file))

    @staticmethod
    def _songsToFiles(songs: Union[List[Song], PlayerPlaylist]) -> List[str]:
        return [ song.downloadPath() + ".mp3"
                 for song in songs ]

    @classmethod
    def deleteSongs(cls, songs: List[Song]) -> None:
        """delete songs from cache"""
        cls.deleteFiles(cls._songsToFiles(songs))

    @staticmethod
    def getAll() -> List[str]:
        """get all files in cache"""
        return os.listdir(CACHE_PATH)

    @classmethod
    def forcePrune(cls, allow: Optional[Union[List[Song], PlayerPlaylist]]) -> None:
        """force prune, even if preserve is True"""
        allowFiles = cls._songsToFiles(allow or [])
        toDelete = [ file
                     for file in cls.getAll()
                     if file not in allowFiles ]
        cls.deleteFiles(toDelete)

    @classmethod
    def prune(cls, allow: Optional[Union[List[Song], PlayerPlaylist]]) -> None:
        """prune cache, if preserve is False"""
        if Runtime.cache.preserveInSession:
            return
        cls.forcePrune(allow)
