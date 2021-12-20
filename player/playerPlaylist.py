import json
from typing import List, Optional, Set
from pymitter import EventEmitter
from dataModels.playlist import Playlist
from dataModels.song import Song
from db.dbManager import DbManager
from ordered_set import OrderedSet


class PlayerPlaylist:
    def __init__(self, dbManager: DbManager, playlistIndex: int) -> None:
        self._dbManager = dbManager
        self._playlist: OrderedSet[Song] = OrderedSet()
        self._index: int = -1
        self._playlistIndex = playlistIndex
        self._name: str = "N/A"
        self._load(playlistIndex)

    def _load(self, playlistIndex: int) -> None: # TODO implement
        """loads from database"""
        playlist = self._dbManager.getPlaylistById(playlistIndex)
        if not playlist:
            return
        self._playlist.update(self._dbManager.getSongsByIdList(playlist.songs))
        self._name = playlist.name

    @property
    def index(self) -> int:
        return self._index

    @property
    def playlistLength(self) -> int:
        return len(self._playlist)

    def at(self, index: int) -> Optional[str]:
        if index < 0 or index >= self.playlistLength:
            return None
        return self._playlist[index].source

    def current(self) -> str:
        return self._playlist[self._index].source

    def next(self, preview: bool = False, increment: int = 1) -> str:
        if self._index < self.playlistLength - increment:
            x = self._index + increment
        else:
            x = 0

        if not preview:
            self._index = x

        return self._playlist[x].source

    def last(self, preview: bool = False, increment: int = 1) -> str:
        if self._index >= increment:
            x = self._index - increment
        else:
            x = self.playlistLength - 1

        if not preview:
            self._index = x

        return self._playlist[x].source

    def add(self, song: Song) -> None:
        self._dbManager.addSong(song)
        x = self._dbManager.getSongByCustomFilter(f"source='{song.source}'")[0]
        self._playlist.add(x)
        songs = list(map(lambda x: x.id, self._playlist))
        self._dbManager.updatePlaylist(Playlist(self._name, songs, self._playlistIndex))

    @property
    def name(self) -> str:
        return self._name

    def toDict(self) -> dict:
        return {
            "name": self._name,
            "songs": list(map(lambda x: x.toDict(), self._playlist))
        }
