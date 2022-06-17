# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

from aiohttp import web
from db.dbManager import DbManager
from player.playerPlaylist import PlayerPlaylist

class CollectionHandler:
    def __init__(self, dbManager: DbManager) -> None:
        self._dbManager = dbManager

    async def tracks(self, _: web.Request):
        tracks = PlayerPlaylist.Liked(self._dbManager)
        return web.json_response(data = tracks.toDict())

    async def breaking(self, _: web.Request):
        tracks = PlayerPlaylist.Breaking(self._dbManager)
        return web.json_response(data = tracks.toDict())
