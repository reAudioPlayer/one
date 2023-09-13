# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = "Copyright (c) 2022 https://github.com/reAudioPlayer"

from typing import Dict, Optional, List, TypeVar, Any
from helper.logged import Logged
from dataModel.song import Song
from db.database import Database
from db.table.playlists import PlaylistModel
from player.iPlayerPlaylist import IPlayerPlaylist
from player.smartPlayerPlaylist import SmartPlayerPlaylist, SpecialPlayerPlaylist
from player.classicPlayerPlaylist import ClassicPlayerPlaylist


T = TypeVar("T")  # pylint: disable=invalid-name


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

    def move(self, old: int, new: int) -> None:
        """moves an element"""
        elem = self[old]
        self.remove(elem)
        self.insert(new, elem)


class PlaylistManager(Logged):
    """manages all playlists"""

    __slots__ = ("_dbManager", "_playlists")

    def __init__(self) -> None:
        self._dbManager = Database()
        self._playlists: Dict[str, IPlayerPlaylist] = {}
        super().__init__(self.__class__.__name__)

    async def init(self) -> None:
        """initialises the playlist manager"""

        async def callback(_: Any) -> None:
            await self.reloadPlaylists()

        Database().playlists.onChanged.add(callback)
        Database().smartPlaylists.onChanged.add(callback)
        await self.reloadPlaylists()

    async def reloadPlaylists(self) -> None:
        """loads all playlists"""
        for specialPlaylist in SpecialPlayerPlaylist.all():
            self._playlists[specialPlaylist.id] = specialPlaylist
        playlists = await self._dbManager.playlists.all()
        for playlist in playlists:
            classic = ClassicPlayerPlaylist(playlist)
            self._playlists[classic.id] = classic
        smartPlaylists = await self._dbManager.smartPlaylists.all()
        for smartPlaylist in smartPlaylists:
            smart = SmartPlayerPlaylist(smartPlaylist)
            self._playlists[smart.id] = smart

    async def addToPlaylist(self, playlistId: str, song: Song) -> bool:
        """adds a song to a playlist"""
        playlist = self.get(playlistId)
        if not isinstance(playlist, ClassicPlayerPlaylist):
            return False
        await playlist.add(song)
        return True

    async def moveInPlaylist(self, playlistId: str, songIndex: int, newSongIndex: int) -> bool:
        """moves a song in a playlist"""
        playlist = self.get(playlistId)
        if not isinstance(playlist, ClassicPlayerPlaylist):
            return False
        await playlist.move(songIndex, newSongIndex)
        return True

    async def removefromPlaylist(self, playlistId: str, songId: int) -> bool:
        """removes a song from a playlist"""
        playlist = self.get(playlistId)
        if not isinstance(playlist, ClassicPlayerPlaylist):
            return False
        await playlist.remove(songId)
        return True

    def get(self, id_: str) -> Optional[IPlayerPlaylist]:
        """gets the playlist with this id"""
        return self._playlists.get(id_)

    def updatePlaylist(
        self,
        id_: str,
        name: Optional[str],
        description: Optional[str],
        cover: Optional[str],
    ) -> None:
        """updates a playlist"""
        if playlist := self.get(id_):
            playlist.updateMeta(name, description, cover)

    @property
    def playlists(self) -> List[IPlayerPlaylist]:
        """return all playlists"""
        return list(self._playlists.values())

    @property
    def playlistLength(self) -> int:
        """return number of playlists"""
        return len(self._playlists)

    async def addPlaylist(self, name: Optional[str] = None) -> str:
        """creates a playlist"""
        plId = self.playlistLength
        name = name or f"My Playlist #{plId + 1}"
        playlist = PlaylistModel(name)
        id_ = await self._dbManager.playlists.insert(playlist)
        if id_:
            playlist.id = id_
        return ClassicPlayerPlaylist(playlist).href

    async def removePlaylist(self, playlistId: str) -> bool:
        """removes a playlist"""
        self._logger.info("removing playlist %s", playlistId)
        if playlist := self.get(playlistId):
            return await playlist.delete()
        return False
