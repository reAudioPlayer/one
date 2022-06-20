# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
from __future__ import annotations
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

from random import randint
from typing import Any, Dict, List, Optional, Tuple, TypeVar
from dataModels.playlist import Playlist
from dataModels.song import Song
from db.dbManager import DbManager


T = TypeVar('T', bound=Any)


class OrderedUniqueList(List[T]):
    def append(self, __object: T) -> None:
        if __object in self:
            return
        super().append(__object)

    def update(self, objects: List[T]) -> None:
        for obj in objects:
            self.append(obj)

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
                 description: Optional[str] = None,
                 cover: Optional[str] = None) -> None:
        self._dbManager = dbManager
        self._playlist: OrderedUniqueList[Song] = OrderedUniqueList()
        self._index: int = -1
        self._playlistIndex = playlistIndex
        self._name: str = name or "N/A"
        self._description: str = description or "N/A"
        self._cover: str = ""
        self._updateCover(cover)
        self._load(playlistIndex, songs)

    @staticmethod
    def Liked(dbManager: DbManager) -> PlayerPlaylist:
        print("liked")
        return PlayerPlaylist(dbManager, songs = dbManager.getLikedSongs(), name="Liked Songs", playlistIndex = -1)

    @staticmethod
    def Breaking(dbManager: DbManager) -> PlayerPlaylist:
        print("breaking")
        return PlayerPlaylist(dbManager, songs = dbManager.getLatestSongs(25), name="Breaking", playlistIndex = -2)

    def _updateCover(self, cover: Optional[str]) -> None:
        self._cover = cover or (self._playlist[0].cover if len(self._playlist) > 0 else "/assets/img/music_placeholder.png")

    def _load(self, playlistIndex: Optional[int], songs: Optional[List[Song]]) -> None:
        """loads from database"""
        if (playlistIndex is None or playlistIndex < 0) and songs is not None:
            self._playlist.update(songs)
            return

        assert playlistIndex is not None

        playlist = self._dbManager.getPlaylistById(playlistIndex)
        if not playlist:
            return
        self._playlist.update(self._dbManager.getSongsByIdList(playlist.songs))
        self._name = playlist.name
        self._description = playlist.description
        self._updateCover(playlist.cover)

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

    def random(self) -> Tuple[int, Optional[Song]]:
        index = randint(0, self.playlistLength - 1)
        return index, self._playlist[index]

    def nextIndex(self, preview: bool = False, increment: int = 1) -> int:
        if self._index < self.playlistLength - increment:
            x = self._index + increment
        else:
            x = 0

        if not preview:
            self._index = x

        return x

    def next(self, preview: bool = False, increment: int = 1) -> Song:
        return self._playlist[self.nextIndex(preview, increment)]

    def lastIndex(self, preview: bool = False, increment: int = 1) -> int:
        if self._index >= increment:
            x = self._index - increment
        else:
            x = self.playlistLength - 1

        if not preview:
            self._index = x
        return x

    def last(self, preview: bool = False, increment: int = 1) -> Optional[Song]:
        return self._playlist[self.lastIndex(preview, increment)]

    def add(self, song: Song, alreadyInDb: bool = False) -> None:
        if not alreadyInDb:
            self._dbManager.addSong(song)
        x = self._dbManager.getSongByCustomFilter(f"source='{song.source}'")[0]
        self._playlist.append(x)
        songs = list(map(lambda x: x.id, self._playlist))
        assert self._playlistIndex is not None
        self._dbManager.updatePlaylist(Playlist(self._name, songs, self._playlistIndex, self._description, self._cover))

    def remove(self, songId: int) -> None:
        x = self._dbManager.getSongById(songId)
        self._playlist.remove(x)
        songs = list(map(lambda x: x.id, self._playlist))
        assert self._playlistIndex is not None
        self._dbManager.updatePlaylist(Playlist(self._name, songs, self._playlistIndex, self._description, self._cover))
        self._dbManager.removeSong(songId)

    def move(self, songIndex: int, newSongIndex: int) -> None:
        self._playlist.changeIndex(songIndex, newSongIndex)
        songs = list(map(lambda x: x.id, self._playlist))
        assert self._playlistIndex is not None
        self._dbManager.updatePlaylist(Playlist(self._name, songs, self._playlistIndex, self._description, self._cover))
        if self._index == songIndex:
            self._index = newSongIndex

    @property
    def name(self) -> str:
        return self._name

    @name.setter
    def name(self, value: str) -> None:
        self._name = value

    @property
    def description(self) -> str:
        return self._description

    @description.setter
    def description(self, value: str) -> None:
        self._description = value

    @property
    def cover(self) -> str:
        return self._cover

    @cover.setter
    def cover(self, value: str) -> None:
        self._cover = value
    
    def toDict(self) -> Dict[str, Any]:
        return {
            "description": self._description,
            "index": self._index, # currently playing song
            "name": self._name,
            "cover": self._cover,
            "songs": list(map(lambda x: x.toDict(), self._playlist))
        }

    def byId(self, id: int) -> List[Song]:
        return [ x for x in self._playlist if x.id == id ]

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, PlayerPlaylist):
            return False
        return self._playlistIndex == other._playlistIndex

    def __hash__(self) -> int:
        return hash((self._name, self._playlistIndex))

    def __repr__(self) -> str:
        return f"(Player.PlayerPlaylist) name=[{self._name}] id=[{self._index}]"

    def ToDMPlaylist(self) -> Playlist:
        assert self._playlistIndex is not None
        return Playlist(self.name, list(map(lambda x: x.id, self._playlist)), self._playlistIndex, self.description, self._cover)
