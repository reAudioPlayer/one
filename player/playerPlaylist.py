from __future__ import annotations
import json
from typing import List, Optional, Set
from pymitter import EventEmitter
from dataModels.playlist import Playlist
from dataModels.song import Song
from db.dbManager import DbManager
from ordered_set import OrderedSet


class PlayerPlaylist:
    def __init__(self,
                 dbManager: DbManager,
                 playlistIndex: Optional[int] = None,
                 songs: Optional[List[Song]] = None,
                 name: Optional[str] = None) -> None:
        self._dbManager = dbManager
        self._playlist: OrderedSet[Song] = OrderedSet()
        self._index: int = -1
        self._playlistIndex = playlistIndex
        self._name: str = name or "N/A"
        self._load(playlistIndex, songs)

    def _load(self, playlistIndex: Optional[int], songs: Optional[List[Song]]) -> None:
        """loads from database"""
        if playlistIndex is None and songs is not None:
            self._playlist.update(songs)
            return

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

    def at(self, index: int) -> Optional[Song]:
        if index < 0 or index >= self.playlistLength:
            return None
        self._index = index
        return self._playlist[index]

    def current(self) -> Optional[Song]:
        if self._index < 0 or self._index >= self.playlistLength:
            return None
        return self._playlist[self._index]

    def next(self, preview: bool = False, increment: int = 1) -> Optional[Song]:
        if self._index < self.playlistLength - increment:
            x = self._index + increment
        else:
            x = 0

        if not preview:
            self._index = x

        return self._playlist[x]

    def last(self, preview: bool = False, increment: int = 1) -> Optional[Song]:
        if self._index >= increment:
            x = self._index - increment
        else:
            x = self.playlistLength - 1

        if not preview:
            self._index = x

        return self._playlist[x]

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

    def byId(self, id: int) -> List[Song]:
        x = filter(lambda x: x.id == id, self._playlist)
        print(type(x))
        print(x)
        return x

    def __eq__(self, other: PlayerPlaylist) -> bool:
        return self._playlistIndex == other._playlistIndex

    def __hash__(self) -> str:
        return hash((self._name, self._playlistIndex))

    def __repr__(self) -> str:
        return f"(Player.PlayerPlaylist) name=[{self._name}] id=[{self._index}]"
