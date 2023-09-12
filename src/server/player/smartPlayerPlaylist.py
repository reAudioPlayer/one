# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
from __future__ import annotations

__copyright__ = "Copyright (c) 2023 https://github.com/reAudioPlayer"

from typing import Any, Dict, Optional
from pyaddict import JDict, JList
from dataModel.song import Song
from db.table.smartPlaylists import SmartPlaylistModel
from db.database import Database
from player.iPlayerPlaylist import IPlayerPlaylist, PlaylistType

"""
smart playlist DEFINITION

{
    "limit": Integer().min(1).optional(),
    "direction": String().enum("asc", "desc").optional(),
    "sort": String().enum("title", "artist", "album", "duration", "id").optional(),
    "filter": Object({
        "title": String().optional(),
        "artist": String().optional(),
        "album": String().optional(),
        "duration": Object({
            "from": Integer().min(0).optional(),
            "to": Integer().min(0).optional()
        }).optional()
    }
}
"""


BREAKING = {
    "limit": 25,
    "sort": "id",
    "direction": "desc",
}


class SmartPlayerPlaylist(IPlayerPlaylist):
    """smart playlist"""

    def __init__(self, model: Optional[SmartPlaylistModel]) -> None:
        super().__init__(PlaylistType.Smart, model)

    @property
    def _playlistModel(self) -> Optional[SmartPlaylistModel]:
        assert isinstance(self._model, SmartPlaylistModel)
        return self._model

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

        if filterDurationFrom is not None:
            query += f" AND duration >= {filterDurationFrom}"
        if filterDurationTo is not None:
            query += f" AND duration <= {filterDurationTo}"

        query += f" ORDER BY {sort} {direction}"
        if limit is not None:
            query += f" LIMIT {limit}"
        return query

    async def _load(self) -> None:
        assert self._playlistModel
        query = self._query(self._playlistModel.definitionDict)
        self._songs = Song.list(await Database().songs.select("*", query))
        self._resetQueue()


class BreakingPlaylist(SmartPlayerPlaylist):
    """breaking special playlist"""

    def __init__(self) -> None:
        super().__init__(None)

    async def _load(self) -> None:
        query = self._query(BREAKING)
        self._songs = Song.list(await Database().songs.select("*", query))
        self._resetQueue()

    def toDict(self) -> Dict[str, Any]:
        return {
            "name": "Breaking",
            "description": "your {len(songs)} newest songs, automatically updated",
            "type": self._type.value,
            "cursor": self.cursor,
            "queue": list(self.queue),
            "id": "breaking",
            "href": "/collection/breaking",
        }
