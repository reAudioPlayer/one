from __future__ import annotations
import json
from typing import List, Optional
from dataModels.playlist import Playlist
from dataModels.song import Song
from db.dbManager import DbManager
from ordered_set import OrderedSet


class OrderedUniqueList(list):
    def append(self, __object) -> None:
        if __object in self:
            return None
        return super().append(__object)

    def update(self, objects: list) -> None:
        [ self.append(obj) for obj in objects ]

    def changeIndex(self, old: int, new: int) -> None:
        elem = self[old]
        self.remove(self[old])
        self.insert(new, elem)


class PlayerPlaylist:
    def __init__(self,
                 dbManager: DbManager,
                 playlistIndex: Optional[int] = None,
                 songs: Optional[List[Song]] = None,
                 name: Optional[str] = None,
                 description: Optional[str] = None) -> None:
        self._dbManager = dbManager
        self._playlist: OrderedUniqueList[Song] = OrderedUniqueList()
        self._index: int = -1
        self._playlistIndex = playlistIndex
        self._name: str = name or "N/A"
        self._description: str = description or "N/A"
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
        self._description = playlist.description

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

    def add(self, song: Song, alreadyInDb: bool = False) -> None:
        if not alreadyInDb:
            self._dbManager.addSong(song)
        x = self._dbManager.getSongByCustomFilter(f"source='{song.source}'")[0]
        self._playlist.append(x)
        songs = list(map(lambda x: x.id, self._playlist))
        self._dbManager.updatePlaylist(Playlist(self._name, songs, self._playlistIndex, self._description))

    def remove(self, songId: int) -> None:
        x = self._dbManager.getSongById(songId)
        self._playlist.remove(x)
        songs = list(map(lambda x: x.id, self._playlist))
        self._dbManager.updatePlaylist(Playlist(self._name, songs, self._playlistIndex, self._description))
        self._dbManager.removeSong(songId)

    def move(self, songIndex: int, newSongIndex: int) -> None:
        self._playlist.changeIndex(songIndex, newSongIndex)
        songs = list(map(lambda x: x.id, self._playlist))
        self._dbManager.updatePlaylist(Playlist(self._name, songs, self._playlistIndex, self._description))
        if self._index == songIndex:
            self._index = newSongIndex

    @property
    def name(self) -> str:
        return self._name

    @name.setter
    def name(self, value) -> None:
        self._name = value

    @property
    def description(self) -> str:
        return self._description

    @description.setter
    def description(self, value) -> None:
        self._description = value

    def toDict(self) -> dict:
        return {
            "name": self._name,
            "description": self._description,
            "index": self._index,
            "songs": list(map(lambda x: x.toDict(), self._playlist))
        }

    def byId(self, id: int) -> List[Song]:
        x = filter(lambda x: x.id == id, self._playlist)
        return x

    def __eq__(self, other: PlayerPlaylist) -> bool:
        return self._playlistIndex == other._playlistIndex

    def __hash__(self) -> str:
        return hash((self._name, self._playlistIndex))

    def __repr__(self) -> str:
        return f"(Player.PlayerPlaylist) name=[{self._name}] id=[{self._index}]"

    def ToDMPlaylist(self) -> Playlist:
        return Playlist(self.name, list(map(lambda x: x.id, self._playlist)), self._playlistIndex, self.description)
