# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

import os
from queue import Empty
from typing import Awaitable, Callable

try:
    from typing import Optional

    from db.dbManager import DbManager

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

    from config.config import PersistentConfig
    from config.runtime import Runtime
    from config.config import Migrator

    from player.player import Player
    from player.playlistManager import PlaylistManager

    from router.router import Router

    from aiohttp import web
    from aiohttp.web import middleware

    from aiohttp_index import IndexMiddleware # type: ignore

    import aiohttp_cors # type: ignore

    import pygame

    import logging
    import time
    import atexit

    import mimetypes
    import shutil

    import asyncio

except Exception as e: # pylint: disable=bare-except, broad-except
    print(e)
    print("you need to run setup.bat (or the documented commands) first")
    import time, sys # pylint: disable=ungrouped-imports, multiple-imports
    time.sleep(5)
    sys.exit()

mimetypes.init()
mimetypes.types_map['.js'] = 'application/javascript; charset=utf-8'

Migrator.migrate()
dbManager = DbManager()
downloader = Downloader()
config = PersistentConfig()
playlistManager = PlaylistManager(dbManager)
player = Player(dbManager, downloader, playlistManager, config)


@middleware
async def _exceptionMiddleware(request: web.Request,
                               handler: Callable[[web.Request],
                                            Awaitable[web.StreamResponse]]) -> web.StreamResponse:
    logger = logging.getLogger()
    start = time.time()
    resp: Optional[web.StreamResponse] = None
    try:
        resp = await handler(request)
    except Empty as exc:
        #os.unlink(".cache")
        logger.exception(exc)
        resp = web.Response(status = 500, text = str(exc))
    except Exception as exc: # pylint: disable=bare-except
        logger.exception(exc)
        resp = web.Response(status = 500, text = str(exc))
    logger.info("%s %s (%s s)", request.method, request.path, time.time() - start)
    assert resp is not None
    return resp

async def _init() -> web.Application: # pylint: disable=too-many-statements
    spotify = Spotify()

    playerHandler = PlayerHandler(player, playlistManager, dbManager)
    playlistHandler = PlaylistHandler(player, playlistManager)
    collectionHandler = CollectionHandler(dbManager)
    metaHandler = MetaHandler(dbManager, spotify)
    downloadHandler = DownloadHandler(dbManager, downloader, player)
    configHandler = ConfigHandler(dbManager)
    newsHandler = NewsHandler()
    sportsHandler = SportsHandler()
    websocket = Websocket(player)

    logging.basicConfig(level = logging.INFO)

    app = web.Application(middlewares=[IndexMiddleware(), _exceptionMiddleware])

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

MUSIC_END = pygame.USEREVENT + 1 # pylint: disable=no-member
pygame.mixer.music.set_endevent(MUSIC_END)

async def main() -> None:
    """MAIN"""
    app = await _init()
    runner = web.AppRunner(app)
    await runner.setup()
    site = web.TCPSite(runner, host = Runtime.args.host, port = Runtime.args.port)
    await site.start()

    while True: # endless loop
        await asyncio.sleep(1)

        if Runtime.args.noLocalPlayback:
            continue

        event = pygame.event.poll()
        if event.type == MUSIC_END:
            await player.onSongEnd()

def _cleanCache() -> None:
    pygame.mixer.music.unload()
    if os.path.exists("./_cache"):
        shutil.rmtree("./_cache")

atexit.register(_cleanCache)

asyncio.run(main())
