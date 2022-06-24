# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

from typing import Any, Callable, Optional
from dataModel.playlist import Playlist
from dataModel.song import Song
from db.dbManager import DbManager
from player.playerPlaylist import PlayerPlaylist
from player.playerPlaylist import OrderedUniqueList


class PlaylistManager:
    """manages all playlists"""
    def __init__(self, dbManager: DbManager) -> None:
        self._dbManager = dbManager
        self._playlists: OrderedUniqueList[PlayerPlaylist] = OrderedUniqueList()
        self._loadPlaylists()

    def _loadPlaylists(self) -> None:
        playlists = self._dbManager.getPlaylists()
        for playlist in playlists:
            self._playlists.append(PlayerPlaylist(self._dbManager, playlist.id))

    def addToPlaylist(self, playlistIndex: int, song: Song) -> None:
        """adds a song to a playlist"""
        songsInDb = self._dbManager.getSongsByCustomFilter(f"source='{song.source}'")
        self._playlists[playlistIndex].add(song, len(songsInDb) > 0)

    def moveInPlaylist(self, playlistIndex: int, songIndex: int, newSongIndex: int) -> None:
        """moves a song in a playlist"""
        self._playlists[playlistIndex].move(songIndex, newSongIndex)

    def removefromPlaylist(self, playlistIndex: int, songId: int) -> None:
        """removes a song from a playlist"""
        self._playlists[playlistIndex].remove(songId)

    def get(self, playlistIndex: Any) -> Optional[PlayerPlaylist]:
        """gets a playlist at this index (if playlistIndex is an int)"""
        if not isinstance(playlistIndex, int):
            return None
        return self._playlists[playlistIndex]

    def ensure(self, playlistIndex: int) -> PlayerPlaylist:
        """gets a playlist at this index"""
        return self._playlists[playlistIndex]

    def updateSong(self, id_: int, updateFunction: Callable[[Song], Song]) -> None:
        """updates all songs with this id"""
        for playlist in self._playlists:
            songs = playlist.byId(id_)
            for song in songs:
                song.update(updateFunction(song))

    def updatePlaylist(self, id_: int, name: str, description: str, cover: str) -> None:
        """updates a playlist"""
        playlist: PlayerPlaylist = self._playlists[id_]
        playlist.name = name
        playlist.description = description
        playlist.cover = cover
        self._dbManager.updatePlaylist(playlist.toDMPlaylist())

    @property
    def playlists(self) -> OrderedUniqueList[PlayerPlaylist]:
        """return all playlists"""
        return self._playlists

    @property
    def playlistLength(self) -> int:
        """return number of playlists"""
        return len(self._playlists)

    def addPlaylist(self, name: Optional[str] = None) -> int:
        """creates a playlist"""
        plId = self.playlistLength
        name = name or f"My Playlist #{plId + 1}"
        self._dbManager.addPlaylist(Playlist(name, [], plId, "", "")) # TODO make args optional
        self._loadPlaylists()
        return plId

    def removePlaylist(self, playlistIndex: int) -> None:
        """removes a playlist"""
        if playlistIndex >= self.playlistLength:
            return
        playlistId = self._playlists[playlistIndex].playlistIndex
        self._playlists.remove(self._playlists[playlistIndex])
        assert playlistId is not None
        self._dbManager.removePlaylist(playlistId)
