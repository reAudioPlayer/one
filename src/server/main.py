# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = "Copyright (c) 2022 https://github.com/reAudioPlayer"

import os
from typing import Optional
import signal
import mimetypes
import asyncio

import uvloop # type: ignore
from aiohttp import web
from aiohttp_index import IndexMiddleware # type: ignore
import aiohttp_cors # type: ignore

from db.database import Database

from downloader.downloader import Downloader

from handler.download import DownloadHandler
from handler.news import NewsHandler
from handler.sports import SportsHandler
from handler.player import PlayerHandler
from handler.playlist import PlaylistHandler
from handler.collection import CollectionHandler
from handler.meta import MetaHandler
from handler.config import ConfigHandler
from handler.websocket import Websocket

from meta.spotify import Spotify

from config.runtime import Runtime
from config.config import Migrator

from player.player import Player
from player.playlistManager import PlaylistManager

from router.router import Router

from helper.nginx import Nginx
from helper.logged import Logged

from middleware.exception import exceptionMiddleware


Logged.init()
mimetypes.init()
mimetypes.types_map['.js'] = 'application/javascript; charset=utf-8'

Migrator.migrate()
downloader = Downloader()
playlistManager = PlaylistManager()
player = Player(downloader, playlistManager)


async def _init() -> web.Application: # pylint: disable=too-many-statements
    Nginx.init()

    spotify = Spotify()

    playerHandler = PlayerHandler(player, playlistManager)
    playlistHandler = PlaylistHandler(player, playlistManager)
    collectionHandler = CollectionHandler()
    metaHandler = MetaHandler(spotify)
    downloadHandler = DownloadHandler(downloader, player)
    configHandler = ConfigHandler()
    newsHandler = NewsHandler()
    sportsHandler = SportsHandler()
    websocket = Websocket(player)

    app = web.Application(middlewares=[IndexMiddleware(), exceptionMiddleware])

    Router.applyRoutes(app,
                       playerHandler,
                       downloadHandler,
                       metaHandler,
                       sportsHandler,
                       collectionHandler,
                       newsHandler,
                       playlistHandler,
                       configHandler,
                       websocket,
                       spotify.auth)

    # Configure default CORS settings.
    cors = aiohttp_cors.setup(app, defaults={
        "*": aiohttp_cors.ResourceOptions(
                allow_credentials=True,
                expose_headers="*",
                allow_headers="*",
            )
    })

    # Configure CORS on all routes.
    for route in list(app.router.routes()):
        cors.add(route)

    return app

async def main() -> None:
    """MAIN"""
    logger = Logged.getLogger("main")
    Runtime.setEventLoop(asyncio.get_event_loop())

    app = await _init()
    runner = web.AppRunner(app)
    await runner.setup()
    site = web.TCPSite(runner, host = Runtime.args.host, port = Runtime.args.port)
    await site.start()

    logger.info("Server started at http://%s:%s", Runtime.args.host, Runtime.args.port)

    await Database().init()
    logger.debug("Database initialised")
    await playlistManager.loadPlaylists()
    logger.debug("Playlists loaded")
    await Runtime.cache.init()
    logger.debug("Cache initialised")

    while True: # endless loop
        await asyncio.sleep(1)

def _cleanCache() -> None:
    cachePath = os.path.abspath("./_cache")
    if Runtime.cache.preserve:
        return

    if not os.path.exists(cachePath):
        return

    Nginx.stop()
    for file in os.listdir(cachePath):
        os.remove(os.path.join(cachePath, file))

def _exitHandler(sig: int, frame: Optional[object]) -> None: # pylint: disable=unused-argument
    _cleanCache()

signal.signal(signal.SIGTERM, _exitHandler)

with asyncio.Runner(loop_factory=uvloop.new_event_loop) as runner:
    runner.run(main())
