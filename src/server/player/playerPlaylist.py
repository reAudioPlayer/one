# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
from __future__ import annotations
__copyright__ = "Copyright (c) 2022 https://github.com/reAudioPlayer"

from random import randint
from typing import Any, Dict, List, Optional, Tuple, TypeVar
from dataModel.playlist import Playlist
from dataModel.song import Song
from db.dbManager import DbManager


T = TypeVar('T') # pylint: disable=invalid-name


class OrderedUniqueList(List[T]):
    """ordered & unique list"""
    def append(self, __object: T) -> None:
        if __object in self:
            return
        super().append(__object)

    def update(self, objects: List[T]) -> None:
        """adds a list"""
        for obj in objects:
            self.append(obj)

    def changeIndex(self, old: int, new: int) -> None:
        """swaps two elements"""
        elem = self[old]
        self.remove(self[old])
        self.insert(new, elem)


class PlayerPlaylist: # pylint: disable=too-many-public-methods
    """player playlist (not to be confused with db (dataModel) playlist)"""
    __slots__ = ("_dbManager", "_playlist", "_cursor", "_playlistIndex",
                 "_name", "_description", "_cover", "_iterCursor")

    def __init__(self,
                 dbManager: DbManager,
                 playlistIndex: Optional[int] = None,
                 songs: Optional[List[Song]] = None,
                 name: Optional[str] = None,
                 description: Optional[str] = None,
                 cover: Optional[str] = None) -> None:
        self._dbManager = dbManager
        self._playlist: OrderedUniqueList[Song] = OrderedUniqueList()
        self._cursor: int = -1
        self._playlistIndex = playlistIndex
        self._name: str = name or "N/A"
        self._description: str = description or "N/A"
        self._cover: str = ""
        self._updateCover(cover)
        self._load(playlistIndex, songs)
        self._iterCursor = 0

    def __iter__(self) -> PlayerPlaylist:
        return self

    def __next__(self) -> Song:
        if self._iterCursor >= len(self._playlist):
            self._iterCursor = 0
            raise StopIteration
        self._iterCursor += 1
        return self._playlist[self._iterCursor - 1]

    def __len__(self) -> int:
        return len(self._playlist)

    @staticmethod
    def liked(dbManager: DbManager) -> PlayerPlaylist:
        """liked songs"""
        songs = dbManager.getLikedSongs()
        return PlayerPlaylist(dbManager,
                              songs = songs,
                              name="Liked Songs",
                              description = f"your {len(songs)} favourite tracks, automatically updated", # pylint: disable=line-too-long
                              playlistIndex = -1)

    @staticmethod
    def breaking(dbManager: DbManager) -> PlayerPlaylist:
        """newest songs"""
        songs = dbManager.getLatestSongs(25)
        return PlayerPlaylist(dbManager,
                              songs = songs,
                              name="Breaking",
                              description = f"your {len(songs)} newest songs, automatically updated", # pylint: disable=line-too-long
                              playlistIndex = -2)

    def _updateCover(self, cover: Optional[str]) -> None:
        self._cover = cover or (self._playlist[0].cover \
                                if len(self._playlist) > 0 \
                                else "")

    def _load(self, playlistIndex: Optional[int], songs: Optional[List[Song]]) -> None:
        """loads from database"""
        if (playlistIndex is None or playlistIndex < 0) and songs is not None:
            self._playlist.update(songs)
            return

        if playlistIndex is None:
            return

        playlist = self._dbManager.getPlaylistById(playlistIndex)
        if not playlist:
            return
        self._playlist.update(self._dbManager.getSongsByIdList(playlist.songs))
        self._name = playlist.name
        self._description = playlist.description
        self._updateCover(playlist.cover)

    @property
    def valid(self) -> bool:
        """valid state"""
        return len(self._playlist) > 0

    def __bool__(self) -> bool:
        return self.valid

    @property
    def cursor(self) -> int:
        """current cursor"""
        return self._cursor

    @property
    def playlistIndex(self) -> Optional[int]:
        """index of this playlist"""
        return self._playlistIndex

    @property
    def playlistLength(self) -> int:
        """number of songs in this playlist"""
        return len(self._playlist)

    def at(self, index: int) -> Optional[Song]:
        """play at index"""
        if index < 0 or index >= self.playlistLength:
            return None
        self._cursor = index
        return self._playlist[index]

    def current(self) -> Optional[Song]:
        """currently playing song"""
        if self._cursor < 0 or self._cursor >= self.playlistLength:
            return None
        return self._playlist[self._cursor]

    def random(self) -> Tuple[int, Optional[Song]]:
        """play random song"""
        index = randint(0, self.playlistLength - 1)
        return index, self._playlist[index]

    def nextIndex(self, preview: bool = False, increment: int = 1) -> int:
        """index of the next song"""
        if self._cursor < self.playlistLength - increment:
            x = self._cursor + increment
        else:
            x = 0

        if not preview:
            self._cursor = x

        return x

    def next(self, preview: bool = False, increment: int = 1) -> Song:
        """play next song"""
        return self._playlist[self.nextIndex(preview, increment)]

    def lastIndex(self, preview: bool = False, increment: int = 1) -> int:
        """index of the last song"""
        if self._cursor >= increment:
            x = self._cursor - increment
        else:
            x = self.playlistLength - 1

        if not preview:
            self._cursor = x
        return x

    def last(self, preview: bool = False, increment: int = 1) -> Optional[Song]:
        """play the last song"""
        return self._playlist[self.lastIndex(preview, increment)]

    def add(self, song: Song, alreadyInDb: bool = False) -> None:
        """adds a song to the db"""
        if not alreadyInDb:
            self._dbManager.addSong(song)
        x = self._dbManager.getSongsByCustomFilter(f"source='{song.source}'")[0]
        self._playlist.append(x)
        songs = list(map(lambda x: x.id, self._playlist))
        assert self._playlistIndex is not None
        self._dbManager.updatePlaylist(Playlist(self._name,
                                                songs,
                                                self._playlistIndex,
                                                self._description,
                                                self._cover))

    def remove(self, songId: int) -> None:
        """removes a song (and optionally form the db)"""
        x = self._dbManager.getSongById(songId)
        self._playlist.remove(x)
        songs = list(map(lambda x: x.id, self._playlist))
        assert self._playlistIndex is not None
        self._dbManager.updatePlaylist(Playlist(self._name,
                                                songs,
                                                self._playlistIndex,
                                                self._description,
                                                self._cover))
        self._dbManager.removeSong(songId)

    def move(self, songIndex: int, newSongIndex: int) -> None:
        """moves a song in this playlist"""
        self._playlist.changeIndex(songIndex, newSongIndex)
        songs = list(map(lambda x: x.id, self._playlist))
        assert self._playlistIndex is not None
        self._dbManager.updatePlaylist(Playlist(self._name,
                                                songs,
                                                self._playlistIndex,
                                                self._description,
                                                self._cover))
        if self._cursor == songIndex:
            self._cursor = newSongIndex

    @property
    def name(self) -> str:
        """playlist name"""
        return self._name

    @name.setter
    def name(self, value: str) -> None:
        self._name = value

    @property
    def description(self) -> str:
        """playlist description"""
        return self._description

    @description.setter
    def description(self, value: str) -> None:
        self._description = value

    @property
    def cover(self) -> str:
        """playlist cover"""
        return self._cover

    @cover.setter
    def cover(self, value: str) -> None:
        self._cover = value

    def toDict(self) -> Dict[str, Any]:
        """serialise"""
        return {
            "description": self._description,
            "index": self._cursor, # currently playing song
            "name": self._name,
            "cover": self._cover,
            "songs": list(map(lambda x: x.toDict(), self._playlist))
        }

    def byId(self, id_: int) -> List[Song]:
        """find all songs in this playlist with this id"""
        return [ x for x in self._playlist if x.id == id_ ]

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, PlayerPlaylist):
            return False
        return self.name == other.name and self._playlistIndex == other._playlistIndex

    def __hash__(self) -> int:
        return hash((self._name, self._playlistIndex))

    def __repr__(self) -> str:
        return f"(Player.PlayerPlaylist) name=[{self._name}] id=[{self._cursor}]"

    def toDMPlaylist(self) -> Playlist:
        """converts to database playlist"""
        assert self._playlistIndex is not None
        return Playlist(self.name,
                        [ x.id for x in self._playlist],
                        self._playlistIndex,
                        self.description,
                        self._cover)
