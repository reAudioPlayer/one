# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = "Copyright (c) 2023 https://github.com/reAudioPlayer"

from db.database import Database
from db.table.playlists import PlaylistModel
from player.iPlayerPlaylist import IPlayerPlaylist, PlaylistType
from dataModel.song import Song


class ClassicPlayerPlaylist(IPlayerPlaylist):
    def __init__(self, model: PlaylistModel) -> None:
        super().__init__(PlaylistType.Classic, model)

    @property
    def _playlistModel(self) -> PlaylistModel:
        assert isinstance(self._model, PlaylistModel)
        return self._model

    async def _load(self) -> None:
        self._songs = Song.list(await Database().songs.allByIds(self._playlistModel.songsList))
        self._resetQueue()
