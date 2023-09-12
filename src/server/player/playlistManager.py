# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = "Copyright (c) 2022 https://github.com/reAudioPlayer"

from typing import Callable, Optional
from helper.logged import Logged
from dataModel.song import Song
from db.database import Database
from db.table.playlists import PlaylistModel
from player.iPlayerPlaylist import IPlayerPlaylist
from player.smartPlayerPlaylist import SmartPlayerPlaylist
from player.classicPlayerPlaylist import ClassicPlayerPlaylist
from player.playerPlaylist import OrderedUniqueList


class PlaylistManager(Logged):
    """manages all playlists"""

    __slots__ = ("_dbManager", "_playlists")

    def __init__(self) -> None:
        self._dbManager = Database()
        self._playlists: OrderedUniqueList[IPlayerPlaylist] = OrderedUniqueList()
        super().__init__(self.__class__.__name__)

    async def loadPlaylists(self) -> None:
        """loads all playlists"""
        playlists = await self._dbManager.playlists.all()
        for playlist in playlists:
            self._playlists.append(ClassicPlayerPlaylist(playlist))
        smartPlaylists = await self._dbManager.smartPlaylists.all()
        for smartPlaylist in smartPlaylists:
            self._playlists.append(SmartPlayerPlaylist(smartPlaylist))

    async def addToPlaylist(self, playlistId: int, song: Song) -> None:
        """adds a song to a playlist"""
        songsInDb = await self._dbManager.songs.select("*", f"WHERE source='{song.model.source}'")
        # if playlist := self.get(playlistId):
        # await playlist.add(song, len(songsInDb) > 0)

    def moveInPlaylist(self, playlistId: int, songIndex: int, newSongIndex: int) -> None:
        """moves a song in a playlist"""
        # if playlist := self.get(playlistId):
        # playlist.move(songIndex, newSongIndex)

    async def removefromPlaylist(self, playlistId: int, songId: int) -> None:
        """removes a song from a playlist"""
        pass
        # if playlist := self.get(playlistId):
        # await playlist.remove(songId)

    def get(self, id_: str) -> Optional[IPlayerPlaylist]:
        """gets the playlist with this id"""
        for playlist in self._playlists:
            if playlist.id == id_:
                return playlist
        return None

    def updateSong(self, id_: int, updateFunction: Callable[[Song], Song]) -> None:
        """updates all songs with this id"""
        # for playlist in self._playlists:
        # songs = playlist.byId(id_)
        # for song in songs:
        # song.update(updateFunction(song))

    def updatePlaylist(
        self,
        id_: str,
        name: Optional[str],
        description: Optional[str],
        cover: Optional[str],
    ) -> None:
        """updates a playlist"""
        playlist = self.get(id_)
        if not playlist:
            return
        # if name:
        #    playlist.name = name
        # if description:
        #    playlist.description = description
        # if cover:
        #    playlist.cover = cover

    @property
    def playlists(self) -> OrderedUniqueList[IPlayerPlaylist]:
        """return all playlists"""
        return self._playlists

    @property
    def playlistLength(self) -> int:
        """return number of playlists"""
        return len(self._playlists)

    async def addPlaylist(self, name: Optional[str] = None) -> int:
        """creates a playlist"""
        plId = self.playlistLength
        name = name or f"My Playlist #{plId + 1}"
        await self._dbManager.playlists.insert(PlaylistModel(name))
        await self.loadPlaylists()
        playlist = self._playlists[-1]
        # assert playlist.playlistIndex is not None
        # return playlist.playlistIndex
        return 0

    async def removePlaylist(self, playlistId: str) -> bool:
        """removes a playlist"""
        self._logger.info(
            "removing playlist %s, %s, %s",
            playlistId,
            self.get(playlistId),
            bool(self.get(playlistId)),
        )
        if playlist := self.get(playlistId):
            self._playlists.remove(playlist)
            assert playlist._model
            await self._dbManager.playlists.deleteById(playlist._model.id)
            return True
        return False
