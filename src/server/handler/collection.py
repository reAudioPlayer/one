# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = "Copyright (c) 2022 https://github.com/reAudioPlayer"

from aiohttp import web
from player.playerPlaylist import PlayerPlaylist

class CollectionHandler:
    """handles all collection endpoints"""
    async def tracks(self, _: web.Request) -> web.Response:
        """get(/api/me/liked)"""
        tracks = await PlayerPlaylist.liked()
        return web.json_response(data = tracks.toDict())

    async def breaking(self, _: web.Request) -> web.Response:
        """get(/api/me/new)"""
        tracks = await PlayerPlaylist.breaking()
        return web.json_response(data = tracks.toDict())
