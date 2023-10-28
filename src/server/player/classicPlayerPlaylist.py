# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = "Copyright (c) 2023 https://github.com/reAudioPlayer"

from typing import Any, Optional, List
import asyncio
from db.database import Database
from db.table.playlists import PlaylistModel
from player.iPlayerPlaylist import IPlayerPlaylist, PlaylistType
from dataModel.song import Song


class ClassicPlayerPlaylist(IPlayerPlaylist):
    """classic playlist"""

    def __init__(self, model: PlaylistModel) -> None:
        super().__init__(model)

        async def callback(_: Any) -> None:
            self._loadTask = asyncio.create_task(self._load())

        Database().playlists.onChanged.add(callback)

    @property
    def _playlistModel(self) -> PlaylistModel:
        assert isinstance(self._model, PlaylistModel)
        return self._model

    @property
    def type(self) -> PlaylistType:
        return PlaylistType.Classic

    async def _load(self) -> None:
        songIdList = self._playlistModel.songsList
        songs = Song.list(await Database().songs.allByIds(songIdList))
        songs.sort(key=lambda s: songIdList.index(s.model.id))
        self._songs = songs
        self._resetQueue()

    async def _addOrGetSongFromDb(self, song: Song) -> Song:
        songsInDb = await Database().songs.select("*", f"WHERE source='{song.model.source}'")
        if len(songsInDb) > 0:
            song.model.id = songsInDb[0].id
        elif len(songsInDb) == 0:
            id_ = await Database().songs.insert(song.model)
            if id_:
                song.model.id = id_
        return song

    async def add(self, song: Song) -> None:
        """add a song"""
        song = await self._addOrGetSongFromDb(song)
        songs = self._playlistModel.songsList
        songs.append(song.model.id)
        self._queue.append(len(self._songs))
        self._songs.append(song)
        self._playlistModel.songsList = songs

    async def addAll(self, songs: List[Song]) -> None:
        """adds all songs"""
        newSongs = [await self._addOrGetSongFromDb(s) for s in songs]
        songs = self._playlistModel.songsList
        songs.extend(s.model.id for s in newSongs)
        self._queue.extend(range(len(self._songs), len(self._songs) + len(newSongs)))
        self._songs.extend(newSongs)
        self._playlistModel.songsList = songs        

    async def remove(self, songId: int) -> Optional[Song]:
        """removes a song"""
        songs = self._playlistModel.songsList
        if songId not in songs:
            return None
        songs.remove(songId)
        song = next(s
                    for s in self._songs
                    if s.model.id == songId)
        indexInSongs = self._songs.index(song)
        self._songs.remove(song)
        self._queue.remove(indexInSongs)
        self._playlistModel.songsList = songs
        return song

    async def move(self, old: int, new: int) -> None:
        """moves a song"""
        songs = self._playlistModel.songsList
        if not 0 <= old < len(songs):
            return
        if not 0 <= new < len(songs):
            return
        songs.insert(new, songs.pop(old))
        self._songs.insert(new, self._songs.pop(old))
        self._playlistModel.songsList = songs
