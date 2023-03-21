# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = "Copyright (c) 2022 https://github.com/reAudioPlayer"

from typing import Callable, Optional
import asyncio
from dataModel.song import Song
from db.database import Database
from db.table.playlists import PlaylistModel
from player.playerPlaylist import PlayerPlaylist
from player.playerPlaylist import OrderedUniqueList


class PlaylistManager:
    """manages all playlists"""
    __slots__ = ("_dbManager", "_playlists")

    def __init__(self) -> None:
        self._dbManager = Database()
        self._playlists: OrderedUniqueList[PlayerPlaylist] = OrderedUniqueList()

    async def loadPlaylists(self) -> None:
        """loads all playlists"""
        playlists = await self._dbManager.playlists.all()
        for playlist in playlists:
            self._playlists.append(PlayerPlaylist(playlist.id))

    async def addToPlaylist(self, playlistId: int, song: Song) -> None:
        """adds a song to a playlist"""
        songsInDb = await self._dbManager.songs.select("*", f"WHERE source='{song.model.source}'")
        if playlist := self.get(playlistId):
            await playlist.add(song, len(songsInDb) > 0)

    def moveInPlaylist(self, playlistId: int, songIndex: int, newSongIndex: int) -> None:
        """moves a song in a playlist"""
        if playlist := self.get(playlistId):
            playlist.move(songIndex, newSongIndex)

    async def removefromPlaylist(self, playlistId: int, songId: int) -> None:
        """removes a song from a playlist"""
        if playlist := self.get(playlistId):
            await playlist.remove(songId)

    def get(self, id_: int) -> Optional[PlayerPlaylist]:
        """gets a playlist at this index"""
        for playlist in self._playlists:
            if playlist.id == id_:
                return playlist
        return None

    def updateSong(self, id_: int, updateFunction: Callable[[Song], Song]) -> None:
        """updates all songs with this id"""
        for playlist in self._playlists:
            songs = playlist.byId(id_)
            for song in songs:
                song.update(updateFunction(song))

    def updatePlaylist(self,
                       id_: int,
                       name: Optional[str],
                       description: Optional[str],
                       cover: Optional[str]) -> None:
        """updates a playlist"""
        if id_ >= self.playlistLength:
            return
        playlist = self._playlists[id_]
        if name:
            playlist.name = name
        if description:
            playlist.description = description
        if cover:
            playlist.cover = cover

    @property
    def playlists(self) -> OrderedUniqueList[PlayerPlaylist]:
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
        return plId

    def removePlaylist(self, playlistId: int) -> bool:
        """removes a playlist"""
        if playlist := self.get(playlistId):
            self._playlists.remove(playlist)
            asyncio.create_task(self._dbManager.playlists.deleteById(playlistId))
            return True
        return False
