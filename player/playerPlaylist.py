from typing import List
from pymitter import EventEmitter
from db.dbManager import DbManager


class PlayerPlaylist:
    def __init__(self, dbManager: DbManager) -> None:
        self._dbManager = dbManager
        self._playlist: List[str] = [ ]
        self._index: int = -1

    def load(self, playlist: List[str]) -> None:
        self._playlist = playlist

    @property
    def index(self) -> int:
        return self._index

    @property
    def playlistLength(self) -> int:
        return len(self._playlist)

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
