# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = "Copyright (c) 2023 https://github.com/reAudioPlayer"

from abc import ABC, abstractmethod
from enum import Enum
from typing import List, Optional, Dict, Any, Generator
import random
import asyncio
from hashids import Hashids  # type: ignore
from dataModel.song import Song
from dataModel.playlist import Playlist
from db.table.iPlaylistModel import IPlaylistModel


class PlaylistType(Enum):
    """playlist type"""

    Classic = "classic"
    Smart = "smart"
    Special = "special"
    Unknown = "unknown"

    _HASHIDS = {
        Classic: Hashids(salt="reapOne.playlist", min_length=22),
        Smart: Hashids(salt="reapOne.smartPlaylist", min_length=22),
    }

    def generateId(self, index: int) -> str:
        assert self != PlaylistType.Unknown
        hashids = PlaylistType._HASHIDS.value[self.value]
        return hashids.encode(index)  # type: ignore


class IPlayerPlaylist(ABC):
    __slots__ = ("_songs", "_queue", "_type", "_cursor", "_model")

    def __init__(self, type_: PlaylistType, model: Optional[IPlaylistModel]) -> None:
        self._songs: List[Song] = []
        self._queue: List[int] = []
        self._cursor = -1
        self._type: PlaylistType = type_
        self._model: Optional[IPlaylistModel] = model
        asyncio.create_task(self._load())

    @abstractmethod
    async def _load(self) -> None:
        pass

    def _resetQueue(self) -> None:
        self._queue = list(range(len(self._songs)))

    @property
    def cursor(self) -> int:
        """position in playlist"""
        return self._cursor

    def _cursorPeek(self, increment: int = 1) -> int:
        return (self.cursor + increment) % len(self._songs)

    def _queueAt(self, index: int) -> Optional[Song]:
        assert len(self._songs) == len(self._queue)
        if index > len(self._queue):
            return None
        songIndex = self._queue[index]
        return self._songs[songIndex]

    @property
    def current(self) -> Song:
        assert len(self._songs)
        song = self._queueAt(self._cursor)
        assert song
        return song

    def next(self, peek: bool = False) -> Song:
        nextPosition = self._cursorPeek()
        if not peek:
            self._cursor = nextPosition
        song = self._queueAt(nextPosition)
        assert song
        return song

    def last(self, peek: bool = False) -> Song:
        lastPosition = self._cursorPeek(-1)
        if not peek:
            self._cursor = lastPosition
        song = self._queueAt(lastPosition)
        assert song
        return song

    def at(self, index: int) -> Optional[Song]:
        return self._queueAt(index)

    def shuffle(self) -> None:
        prevIndex = self._queue[self._cursor]
        random.shuffle(self._queue)
        for index, songIndex in enumerate(self._queue):
            if songIndex == prevIndex:
                self._cursor = index
                return

    @property
    def id(self) -> str:
        """return id"""
        assert self._model is not None
        return self._type.generateId(self._model.id)

    @property
    def href(self) -> str:
        """return href"""
        return f"/playlist/{self.id}"

    @property
    def queue(self) -> Generator[Song, None, None]:
        for index in self._queue:
            yield self._songs[index]

    def toDict(self) -> Dict[str, Any]:
        """serialise"""
        assert self._model is not None
        return {
            "name": self._model.name,
            "description": self._model.description,
            "cover": self._model.cover,
            "type": self._type.value,
            "cursor": self.cursor,
            "songs": [song.toDict() for song in self._songs],
            "queue": [song.toDict() for song in self.queue],
            "plays": self._model.plays,
            "id": self.id,
            "href": self.href,
        }

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, IPlayerPlaylist):
            return False
        return self.id == other.id

    def __hash__(self) -> int:
        return hash(self.id)

    def __iter__(self) -> Generator[Song, None, None]:
        for song in self._songs:
            yield song

    def __len__(self) -> int:
        return len(self._songs)
