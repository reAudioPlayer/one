# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = "Copyright (c) 2022 https://github.com/reAudioPlayer"

import asyncio
from typing import Dict, Optional, List, TypeVar, Any
from helper.logged import Logged
from dataModel.song import Song
from db.database import Database
from db.table.playlists import PlaylistModel
from db.table.albums import AlbumModel
from db.table.smartPlaylists import SmartPlaylistModel
from meta.spotify import Spotify
from player.iPlayerPlaylist import IPlayerPlaylist, PlaylistType
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
        asyncio.create_task(self._fetchAllAlbums())

    async def _fetchAllAlbums(self) -> None:
        """fetches all albums"""

        async def _implement(song: Song) -> None:
            album = await AlbumModel.forSong(song, Spotify(), self._dbManager)
            self._logger.debug("found album %s", album)
            if album is None:
                return
            song.model.albumHash = album.hash
            self._logger.debug("updating song %s", song.model.albumHash)

        playlists = self._playlists.values()
        for playlist in playlists:
            for song in playlist:
                self._logger.debug("fetch album for %s", song)
                if song.albumInDb:
                    continue
                await _implement(song)

    async def addToPlaylist(self, playlistId: str, song: Song) -> bool:
        """adds a song to a playlist"""
        playlist = self.get(playlistId)
        if not isinstance(playlist, ClassicPlayerPlaylist):
            return False
        await playlist.add(song)
        return True

    async def addAllToPlaylist(self, playlistId: str, songs: List[Song]) -> bool:
        """adds a song to a playlist"""
        playlist = self.get(playlistId)
        if not isinstance(playlist, ClassicPlayerPlaylist):
            return False
        await playlist.addAll(songs)
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
        song = await playlist.remove(songId)
        if song is None:
            return False
        await self._deleteSongIfNotInPlaylists(song)
        return True

    async def _deleteSongIfNotInPlaylists(self, song: Song) -> None:
        """deletes a song if it is not in any playlist"""
        for playlist in self._playlists.values():
            if playlist.type != PlaylistType.Classic:
                continue
            if playlist.hasSong(song.model.id):
                self._logger.debug("song %s is still in playlist %s", song.model.id, playlist.id)
                return
        self._logger.debug("deleting song %s", song.model.id)
        await Database().songs.delete(song.model)

    def get(self, id_: str) -> Optional[IPlayerPlaylist]:
        """gets the playlist with this id"""
        return self._playlists.get(id_)

    def updatePlaylist(
        self,
        id_: str,
        name: Optional[str],
        description: Optional[str],
        cover: Optional[str],
    ) -> bool:
        """updates a playlist"""
        playlist = self.get(id_)
        if playlist is None:
            return False
        playlist.updateMeta(name, description, cover)
        return True

    @property
    def playlists(self) -> List[IPlayerPlaylist]:
        """return all playlists"""
        return list(self._playlists.values())

    @property
    def playlistLength(self) -> int:
        """return number of playlists"""
        return len(self._playlists)

    async def addClassicPlaylist(self, name: Optional[str] = None) -> str:
        """creates a playlist"""
        plId = self.playlistLength
        name = name or f"My Playlist #{plId + 1}"
        playlist = PlaylistModel(name)
        id_ = await self._dbManager.playlists.insert(playlist)
        if id_:
            playlist.id = id_
            await self.reloadPlaylists()
        return ClassicPlayerPlaylist(playlist).href

    async def addSmartPlaylist(self, name: Optional[str] = None) -> str:
        """creates a playlist"""
        plId = self.playlistLength
        name = name or f"My Smart Playlist #{plId + 1}"
        playlist = SmartPlaylistModel(name, definition='{"limit": 25}')
        id_ = await self._dbManager.smartPlaylists.insert(playlist)
        if id_:
            playlist.id = id_
            await self.reloadPlaylists()
        return SmartPlayerPlaylist(playlist).href

    async def removePlaylist(self, playlistId: str) -> bool:
        """removes a playlist"""
        self._logger.info("removing playlist %s", playlistId)
        playlist = self.get(playlistId)
        if playlist is None:
            return False
        if not await playlist.delete():
            return False
        for song in playlist:
            asyncio.create_task(self._deleteSongIfNotInPlaylists(song))
        del self._playlists[playlistId]
        return True
