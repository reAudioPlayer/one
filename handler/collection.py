# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

from aiohttp import web
from db.dbManager import DbManager
from player.playerPlaylist import PlayerPlaylist

class CollectionHandler:
    """handles all collection endpoints"""
    def __init__(self, dbManager: DbManager) -> None:
        self._dbManager = dbManager

    async def tracks(self, _: web.Request) -> web.Response:
        """get(/api/collection/tracks)"""
        tracks = PlayerPlaylist.liked(self._dbManager)
        return web.json_response(data = tracks.toDict())

    async def breaking(self, _: web.Request) -> web.Response:
        """get(/api/collection/tracks/breaking)"""
        tracks = PlayerPlaylist.breaking(self._dbManager)
        return web.json_response(data = tracks.toDict())
