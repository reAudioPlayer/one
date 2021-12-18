from typing import List, Optional, Set
from pymitter import EventEmitter
from db.dbManager import DbManager
from ordered_set import OrderedSet


class PlayerPlaylist:
    def __init__(self, dbManager: DbManager, playlistIndex: int) -> None:
        self._dbManager = dbManager
        self._playlist: OrderedSet[str] = OrderedSet()
        self._index: int = -1
        self._playlistIndex = playlistIndex
        self._load(playlistIndex)

    def _load(self, playlistIndex: int) -> None: # TODO implement
        """loads from database"""
        pass

    @property
    def index(self) -> int:
        return self._index

    @property
    def playlistLength(self) -> int:
        return len(self._playlist)

    def at(self, index: int) -> Optional[str]:
        if index < 0 or index >= self.playlistLength:
            return None
        return self._playlist[index]

    def current(self) -> str:
        return self._playlist[self._index]

    def next(self, preview: bool = False, increment: int = 1) -> str:
        if self._index < self.playlistLength - increment:
            x = self._index + increment
        else:
            x = 0

        if not preview:
            self._index = x

        return self._playlist[x]

    def last(self, preview: bool = False, increment: int = 1) -> str:
        if self._index >= increment:
            x = self._index - increment
        else:
            x = self.playlistLength - 1

        if not preview:
            self._index = x

        return self._playlist[x]

    def add(self, link: str) -> None: # TODO save to db
        self._playlist.add(link)
