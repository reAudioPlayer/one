# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
from __future__ import annotations
__copyright__ = "Copyright (c) 2022 https://github.com/reAudioPlayer"

from random import randint
from typing import Any, Dict, List, Optional, Tuple, TypeVar
import asyncio
from hashids import Hashids # type: ignore
from dataModel.playlist import Playlist
from dataModel.song import Song
from db.database import Database
from db.table.songs import SongModel


hashids = Hashids(salt="reapOne.playlist", min_length=22)
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
    __slots__ = ("_dbManager", "_playlist", "_cursor", "_playlistIndex", "_loaded",
                 "_name", "_description", "_cover", "_iterCursor", "_dataPlaylist" )

    def __init__(self,
                 playlistIndex: Optional[int] = None,
                 songs: Optional[List[Song]] = None,
                 name: Optional[str] = None,
                 description: Optional[str] = None,
                 cover: Optional[str] = None) -> None:
        self._dbManager = Database()
        self._playlist: OrderedUniqueList[Song] = OrderedUniqueList()
        self._cursor: int = -1
        self._playlistIndex = playlistIndex
        self._name: Optional[str] = name
        self._description: Optional[str] = description
        self._cover: Optional[str] = cover
        self._updateCover(cover)
        self._loaded = False
        asyncio.create_task(self.load(playlistIndex, songs))
        self._iterCursor = 0
        self._dataPlaylist: Optional[Playlist] = None

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

    def onLoad(self) -> None:
        """called when the playlist is loaded"""
        if not self._dataPlaylist:
            return
        print("playlist loaded", self._dataPlaylist.model.name)
        print("plays: ", self._dataPlaylist.model.plays)
        self._dataPlaylist.model.plays += 1
        print("plays: ", self._dataPlaylist.model.plays)

    @staticmethod
    async def liked() -> PlayerPlaylist:
        """liked songs"""
        songs = await Database().songs.select(append = "WHERE favourite = 1")
        playlist = PlayerPlaylist(name="Liked Songs",
                                  description = f"your {len(songs)} favourite tracks, automatically updated", # pylint: disable=line-too-long
                                  playlistIndex = -1)
        await playlist.load(-1, Song.list(songs))
        return playlist

    @staticmethod
    async def breaking() -> PlayerPlaylist:
        """newest songs"""
        songs = await Database().songs.select("*", "ORDER BY id DESC LIMIT 25")
        playlist = PlayerPlaylist(name="Breaking",
                                  description = f"your {len(songs)} newest songs, automatically updated", # pylint: disable=line-too-long
                                  playlistIndex = -2)
        await playlist.load(-2, Song.list(songs))
        return playlist

    def _updateCover(self, cover: Optional[str]) -> None:
        self._cover = cover or (self._playlist[0].model.cover \
                                if len(self._playlist) > 0 \
                                else "")

    async def onSongChange(self, model: SongModel) -> None:
        """updates the playlist if a song changes"""
        for i, song in enumerate(self._playlist):
            if song.model.id == model.id:
                if song.model != model:
                    self._playlist[i] = Song(model)

    async def load(self,
                   playlistIndex: Optional[int],
                   songs: Optional[List[Song]] = None) -> None:
        """loads from database"""
        if self._loaded:
            return

        if self._dbManager.ready:
            self._dbManager.songs.onChanged.add(self.onSongChange)

        if playlistIndex is None or playlistIndex < 0:
            if songs is not None:
                self._playlist.update(songs)
            return

        model = await self._dbManager.playlists.byId(playlistIndex)
        assert model is not None, f"playlist {playlistIndex} not found"
        self._dataPlaylist = Playlist(model)
        self._playlist.update(
            Song.list(await self._dbManager.songs.allByIds(self._dataPlaylist.songs))
        )

        self._loaded = True

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

    async def add(self, song: Song, alreadyInDb: bool = False) -> None:
        """adds a song to the db"""
        if not alreadyInDb:
            await self._dbManager.songs.insert(song.model)
        x = await self._dbManager.songs.selectOne(append = f"WHERE source='{song.model.source}'")
        assert x is not None
        assert self._dataPlaylist is not None
        self._playlist.append(Song(x))
        self._dataPlaylist.addSong(x.id)
        assert self._playlistIndex is not None

    async def remove(self, songId: int) -> None:
        """removes a song (and optionally form the db)"""
        x = await self._dbManager.songs.byId(songId)
        assert x is not None
        self._playlist.remove(Song(x))
        assert self._playlistIndex is not None
        await self._dbManager.songs.delete(x)

    def move(self, songIndex: int, newSongIndex: int) -> None:
        """moves a song in this playlist"""
        self._playlist.changeIndex(songIndex, newSongIndex)
        if self._dataPlaylist:
            self._dataPlaylist.swap(songIndex, newSongIndex)
        assert self._playlistIndex is not None
        if self._cursor == songIndex:
            self._cursor = newSongIndex

    @property
    def name(self) -> str:
        """playlist name"""
        if self._dataPlaylist:
            return self._dataPlaylist.model.name
        return self._name or "N/A"

    @name.setter
    def name(self, value: str) -> None:
        self._name = value
        if self._dataPlaylist:
            self._dataPlaylist.model.name = value

    @property
    def description(self) -> str:
        """playlist description"""
        if self._dataPlaylist:
            return self._dataPlaylist.model.description
        return self._description or ""

    @description.setter
    def description(self, value: str) -> None:
        self._description = value
        if self._dataPlaylist:
            self._dataPlaylist.model.description = value

    @property
    def cover(self) -> str:
        """playlist cover"""
        if self._dataPlaylist:
            return self._dataPlaylist.model.cover

        return self._cover or ""

    @cover.setter
    def cover(self, value: str) -> None:
        self._cover = value
        if self._dataPlaylist:
            self._dataPlaylist.model.cover = value

    @property
    def id(self) -> int:
        """playlist id"""
        if self._dataPlaylist:
            return self._dataPlaylist.model.id
        return 0

    @property
    def _plays(self) -> int:
        """number of times this playlist has been played"""
        if self._dataPlaylist:
            return self._dataPlaylist.model.plays
        return 0

    @property
    def url(self) -> str:
        """return url"""
        return f"/playlist/{hashids.encode(self._playlistIndex)}"

    def toDict(self) -> Dict[str, Any]:
        """serialise"""
        return {
            "description": self.description,
            "index": self._cursor, # currently playing song
            "name": self.name,
            "cover": self.cover,
            "songs": list(map(lambda x: x.toDict(), self._playlist)),
            "plays": self._plays,
            "id": self._playlistIndex,
            "href": self.url
        }

    def byId(self, id_: int) -> List[Song]:
        """find all songs in this playlist with this id"""
        return [ x for x in self._playlist if x.model.id == id_ ]

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, PlayerPlaylist):
            return False
        return self._playlistIndex == other._playlistIndex and self._name == other._name

    def __hash__(self) -> int:
        return hash((self._name, self._playlistIndex))

    def __repr__(self) -> str:
        return f"(Player.PlayerPlaylist) name=[{self.name}] id=[{self._playlistIndex}]"
