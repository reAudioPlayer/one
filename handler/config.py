# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

import json
import os
from os.path import exists
from aiohttp import web


class ConfigHandler:
    """back end configuration handler"""
    async def ready(self, _: web.Request) -> web.Response:
        """get(/api/config/ready)"""
        if not exists("./config/spotify.json"):
            return web.Response(status = 400)
        with open("./config/spotify.json", encoding = "utf8") as file:
            config = json.load(file)
            valid = None not in (config.get("id"), config.get("secret"))
        return web.Response(status = 200 if valid else 400)

    async def spotifyConfig(self, request: web.Request) -> web.Response:
        """post(/api/config/spotify)"""
        jdata = await request.json()
        if None in (jdata.get("id"), jdata.get("secret")):
            return web.Response(status = 400)

        if not exists('./config'):
            os.makedirs('./config')

        with open("./config/spotify.json", "w", encoding = "utf8") as file:
            json.dump({
                "id": jdata.get("id"),
                "secret": jdata.get("secret")
            }, file, indent=4)
        return web.Response(status = 200)
