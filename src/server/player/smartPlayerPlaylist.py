# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
from __future__ import annotations

__copyright__ = "Copyright (c) 2023 https://github.com/reAudioPlayer"

from typing import Any, Dict, Optional, List
from pyaddict import JDict, JList
from dataModel.song import Song
from db.table.smartPlaylists import SmartPlaylistModel
from db.database import Database
from player.iPlayerPlaylist import IPlayerPlaylist, PlaylistType

BREAKING = {
    "limit": 25,
    "sort": "id",
    "direction": "desc",
}

LIKED = {"sort": "id", "direction": "desc", "filter": {"favourite": True}}


class SmartPlayerPlaylist(IPlayerPlaylist):
    """smart playlist"""

    def __init__(self, model: Optional[SmartPlaylistModel]) -> None:
        super().__init__(model)

    @property
    def _playlistModel(self) -> Optional[SmartPlaylistModel]:
        assert isinstance(self._model, SmartPlaylistModel)
        return self._model

    @property
    def definition(self) -> Dict[str, Any]:
        """playlist definition"""
        assert self._playlistModel
        return self._playlistModel.definitionDict

    @definition.setter
    def definition(self, value: Dict[str, Any]) -> None:
        assert self._playlistModel
        self._playlistModel.definitionDict = value

    @property
    def type(self) -> PlaylistType:
        return PlaylistType.Smart

    def _query(self, definition: Dict[str, Any]) -> str:
        definition = JDict(definition)
        limit = definition.optionalGet("limit", int)
        direction = definition.ensure("direction", str, "asc")
        sort = definition.ensure("sort", str, "id").replace("title", "name")
        filter_ = definition.ensureCast("filter", JDict)

        query = "WHERE 1=1"

        def _addList(key: str) -> str:
            value = filter_.optionalCast(key, JList)
            if not value:
                return ""
            query = " AND "
            items = value.iterator().optionalGet(str)
            for i, item in enumerate(items):
                if not item:
                    continue
                if i > 0:
                    query += " OR "
                encodedItem = item.replace("'", "''")
                query += f"{key} LIKE '%{encodedItem}%'"
            return query

        query += _addList("title").replace("title LIKE", "name LIKE")
        query += _addList("artist")
        query += _addList("album")
        filterDuration = filter_.get("duration", {})
        filterDurationFrom = filterDuration.get("from", None)
        filterDurationTo = filterDuration.get("to", None)
        favourite = filter_.get("favourite", False)
        songs = filter_.get("songs", None)

        if filterDurationFrom is not None:
            query += f" AND duration >= {filterDurationFrom}"
        if filterDurationTo is not None:
            query += f" AND duration <= {filterDurationTo}"
        if favourite:
            query += " AND favourite = 1"
        if songs:
            query += f" AND songs in {songs}"

        query += f" ORDER BY {sort} {direction}"
        if limit is not None:
            query += f" LIMIT {limit}"
        return query

    async def _load(self) -> None:
        assert self._playlistModel
        query = self._query(self._playlistModel.definitionDict)
        self._songs = Song.list(await Database().songs.select("*", query))
        self._resetQueue()


class SpecialPlayerPlaylist(SmartPlayerPlaylist):
    """special playlist (e.g. breaking, liked)"""

    def __init__(
        self, name: str, description: str, definition: Dict[str, Any], id_: str, href: str
    ) -> None:
        self._name = name
        self._description = description
        self._definition = definition
        self._id = id_
        self._href = href
        super().__init__(None)

    async def _load(self) -> None:
        query = self._query(self._definition)
        self._songs = Song.list(await Database().songs.select("*", query))
        self._resetQueue()

    @property
    def type(self) -> PlaylistType:
        return PlaylistType.Special

    @property
    def id(self) -> str:
        return self._id

    @property
    def href(self) -> str:
        return self._href

    def toDict(self) -> Dict[str, Any]:
        return {
            "name": self._name,
            "description": self._description,
            "type": self.type.value,
            "cursor": self.cursor,
            "songs": [song.toDict() for song in self._songs],
            "queue": [song.toDict() for song in self.queue],
            "id": self._id,
            "href": self._href,
        }

    @classmethod
    def breaking(cls) -> SpecialPlayerPlaylist:
        """breaking tracks"""
        return cls(
            "Breaking",
            "your 25 newest tracks, automatically updated",
            BREAKING,
            "breaking",
            "/collection/tracks/breaking",
        )

    @classmethod
    def liked(cls) -> SpecialPlayerPlaylist:
        """liked tracks"""
        return cls(
            "Liked Tracks",
            "your favourite tracks, automatically updated",
            LIKED,
            "liked",
            "/collection/tracks",
        )

    @classmethod
    def all(cls) -> List[SpecialPlayerPlaylist]:
        """all special playlists"""
        return [cls.liked(), cls.breaking()]

    @classmethod
    def track(cls, songId: int) -> SpecialPlayerPlaylist:
        """a single track"""
        return cls(
            "Track", "Track", {"filter": {"songs": f"({songId})"}}, str(songId), f"/tracks/{songId}"
        )
