# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = "Copyright (c) 2024 https://github.com/reAudioPlayer"

from typing import List, Optional, Dict, Any, Generator
import random
from dataModel.song import Song
from player.iPlayerPlaylist import IPlayerPlaylist


class PlayerQueue:
    """the player queue"""

    __slots__ = ("_songs", "_queue", "_cursor", "_playlist")

    def __init__(self) -> None:
        self._songs: List[Song] = []
        self._queue: List[int] = []
        self._cursor = -1
        self._playlist: Optional[IPlayerPlaylist] = None

    def load(self, playlist: IPlayerPlaylist) -> None:
        """load playlist"""
        self._playlist = playlist
        self._songs = list(playlist)
        self._resetQueue()

    def _resetQueue(self) -> None:
        self._queue = list(range(len(self._songs)))

    @property
    def cursor(self) -> int:
        """position in playlist"""
        return self._cursor

    @property
    def playlist(self) -> Optional[IPlayerPlaylist]:
        """current playlist"""
        return self._playlist

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
        """returns the song currently selected"""
        assert len(self._songs) > 0
        song = self._queueAt(self._cursor)
        assert song
        return song

    def next(self, peek: bool = False) -> Song:
        """
        returns the next song
        :param peek: if true, the cursor will not be moved
        """
        nextPosition = self._cursorPeek()
        if not peek:
            self._cursor = nextPosition
        song = self._queueAt(nextPosition)
        assert song
        return song

    def last(self, peek: bool = False) -> Song:
        """
        returns the previous song
        :param peek: if true, the cursor will not be moved
        """
        lastPosition = self._cursorPeek(-1)
        if not peek:
            self._cursor = lastPosition
        song = self._queueAt(lastPosition)
        assert song
        return song

    def at(self, index: int) -> Optional[Song]:
        """return song at index"""
        return self._queueAt(index)

    def jumpTo(self, index: int) -> None:
        """jump to index"""
        self._cursor = index

    def shuffle(self) -> None:
        """shuffles the playlist"""
        prevIndex = self._queue[self._cursor]
        random.shuffle(self._queue)
        for index, songIndex in enumerate(self._queue):
            if songIndex == prevIndex:
                self._cursor = index
                return

    def unshuffle(self) -> None:
        """unshuffles the playlist"""
        prevIndex = self._queue[self._cursor]
        self._resetQueue()
        for index, songIndex in enumerate(self._queue):
            if songIndex == prevIndex:
                self._cursor = index
                return

    def hasSong(self, songId: int) -> bool:
        """checks if the playlist contains a song"""
        return songId in [song.model.id for song in self._songs]

    @property
    def queue(self) -> Generator[Song, None, None]:
        """return queue generator"""
        for index in self._queue:
            yield self._songs[index]

    def toDict(self) -> Dict[str, Any]:
        """serialise"""
        return {
            "queue": [song.toDict() for song in self.queue],
        }

    def __iter__(self) -> Generator[Song, None, None]:
        yield from self._songs

    def __len__(self) -> int:
        return len(self._songs)

    def __repr__(self) -> str:
        return f"<{self.__class__.__name__} ({len(self._songs)} songs)>"
