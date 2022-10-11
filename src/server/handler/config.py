# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

from aiohttp import web

from config.runtime import Runtime
from helper.dictTool import DictEx


class ConfigHandler:
    """back end configuration handler"""
    async def ready(self, _: web.Request) -> web.Response:
        """get(/api/config)"""
        spotifyConfig = Runtime.spotifyConfig()
        if spotifyConfig is None:
            return web.Response(status = 400)
        valid = None not in (spotifyConfig.get("id"), spotifyConfig.get("secret"))
        return web.Response(status = 200 if valid else 400)

    async def spotifyConfig(self, request: web.Request) -> web.Response:
        """post(/api/config/spotify)"""
        jdata = await request.json()
        if None in (jdata.get("id"), jdata.get("secret")):
            return web.Response(status = 400)

        Runtime.spotifyConfig = DictEx(jdata)
        return web.Response()
