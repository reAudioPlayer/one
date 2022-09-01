# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

import os
from os import environ as env
from os.path import exists
from queue import Empty
from typing import Awaitable, Callable


try:
    from typing import Optional, Tuple

    import spotipy # type: ignore
    from spotipy.oauth2 import  SpotifyOAuth # type: ignore

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

    from helper.dictTool import DictEx

    from config.config import PersistentConfig

    from player.player import Player
    from player.playlistManager import PlaylistManager

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
    import json

    import asyncio

except: # pylint: disable=bare-except
    print("you need to run setup.bat (or the documented commands) first")
    import time, sys # pylint: disable=ungrouped-imports, multiple-imports
    time.sleep(5)
    sys.exit()

mimetypes.init()
mimetypes.types_map['.js'] = 'application/javascript; charset=utf-8'

dbManager = DbManager()
downloader = Downloader()
config = PersistentConfig()
playlistManager = PlaylistManager(dbManager)
player = Player(dbManager, downloader, playlistManager, config)

SCOPE = "user-library-read user-follow-read user-follow-modify"

def _getSpotifyAuthData() -> Tuple[str, str]:
    with open("./config/spotify.json", encoding = "utf-8") as file:
        spotifyConfig = DictEx(json.load(file))
        return spotifyConfig.ensureString("id"), spotifyConfig.ensureString("secret")

def _getSpotifyAuth(id_: str, secret: str) -> Optional[SpotifyOAuth]: # pylint: disable=invalid-name
    if "restricted" in (id_, secret):
        return None
    return SpotifyOAuth(id_, secret, "http://reap.ml/", scope = SCOPE)

async def _exitHandler(_: web.Request) -> web.Response:
    """force quits the application"""
    logger = logging.getLogger()
    logger.info("quitting")
    os._exit(0) # pylint: disable=protected-access

@middleware
async def _exceptionMiddleware(request: web.Request,
                               handler: Callable[[web.Request],
                                            Awaitable[web.StreamResponse]]) -> web.StreamResponse:
    logger = logging.getLogger()
    start = time.time()
    resp: Optional[web.StreamResponse] = None
    try:
        resp = await handler(request)
    except Empty:
        os.unlink(".cache")
        resp = await handler(request)
    except Exception as exc: # pylint: disable=bare-except
        logger.exception(exc)
        resp = web.Response(status = 500, text = str(exc))
    logger.info("%s %s (%s s)", request.method, request.path, time.time() - start)
    assert resp is not None
    return resp

async def _init() -> web.Application: # pylint: disable=too-many-statements
    spotify = spotipy.Spotify()

    if exists("./config/spotify.json"):
        spotify.auth_manager = _getSpotifyAuth(*_getSpotifyAuthData())
    else:
        async def _implement() -> None:
            while True:
                await asyncio.sleep(1)
                if exists("./config/spotify.json"):
                    spotify.auth_manager = _getSpotifyAuth(*_getSpotifyAuthData())
                    return
        asyncio.create_task(_implement())

    playerHandler = PlayerHandler(player, playlistManager, dbManager)
    playlistHandler = PlaylistHandler(player, playlistManager)
    collectionHandler = CollectionHandler(dbManager)
    metaHandler = MetaHandler(dbManager, spotify)
    downloadHandler = DownloadHandler(dbManager, downloader, player)
    configHandler = ConfigHandler()
    newsHandler = NewsHandler()
    sportsHandler = SportsHandler()
    websocket = Websocket(player)

    logging.basicConfig(level = logging.INFO)

    app = web.Application(middlewares=[IndexMiddleware(), _exceptionMiddleware])

    # /api/player/
    app.router.add_get('/api/player/previous', playerHandler.getPrevious)
    app.router.add_get('/api/player/next', playerHandler.getNext)

    app.router.add_get('/api/player/playPause', playerHandler.getPlayPause)
    app.router.add_get('/api/player/pause', playerHandler.getPause)
    app.router.add_get('/api/player/play', playerHandler.getPlay)

    app.router.add_post('/api/player/at', playerHandler.loadSongAt)

    app.router.add_post('/api/player/volume', playerHandler.setVolume)
    app.router.add_get('/api/player/volume', playerHandler.getVolume)

    app.router.add_post('/api/player/load', playerHandler.loadPlaylist)

    app.router.add_post('/api/player/seek', playerHandler.postSeek)
    app.router.add_get('/api/player/seek', playerHandler.getSeek)

    app.router.add_post('/api/player/repeat', playerHandler.postRepeat)
    app.router.add_get('/api/player/repeat', playerHandler.getRepeat)

    app.router.add_post('/api/player/shuffle', playerHandler.postShuffle)
    app.router.add_get('/api/player/shuffle', playerHandler.getShuffle)

    app.router.add_get('/api/player/stream', downloadHandler.stream)
    app.router.add_get('/api/player/stream/{id}', downloadHandler.streamFromCache)

    # UNGROUPED
    app.router.add_post('/api/browse/track', metaHandler.getMetadata)

    app.router.add_post('/api/search', metaHandler.search)

    app.router.add_get('/api/releases', metaHandler.releases)

    app.router.add_post('/api/sports', sportsHandler.getMatches)

    # /api/spotify/
    app.router.add_get('/api/spotify/albums/{id}', metaHandler.spotifyAlbum)
    app.router.add_get('/api/spotify/artists/{id}', metaHandler.spotifyArtist)
    app.router.add_get('/api/spotify/artists', metaHandler.spotifyArtists)
    app.router.add_get('/api/spotify/playlists/{id}', metaHandler.spotifyPlaylist)
    app.router.add_get('/api/spotify/playlists', metaHandler.spotifyPlaylists)
    app.router.add_post('/api/spotify/following', metaHandler.spotifyFollow)
    app.router.add_delete('/api/spotify/following', metaHandler.spotifyUnfollow)
    app.router.add_post('/api/spotify/recommendations', metaHandler.spotifyRecommend)

    # /api/me/
    app.router.add_get('/api/me/liked', collectionHandler.tracks)
    app.router.add_get('/api/me/new', collectionHandler.breaking)

    # /api/me/player
    app.router.add_get('/api/me/player/current-track', playerHandler.getCurrentTrack)
    app.router.add_get('/api/me/player/current-playlist', playerHandler.getCurrentPlaylist)

    # /api/news/articles/
    app.router.add_get('/api/news/articles', newsHandler.getSomeNews)
    app.router.add_get('/api/news/articles/{hash}', newsHandler.getArticle)

    # /api/tracks
    app.router.add_get('/api/tracks/{id}', metaHandler.getTrack)
    app.router.add_put('/api/tracks/{id}', playerHandler.updateSong)
    app.router.add_get('/api/tracks/{id}/download', downloadHandler.downloadTrack)

    # /api/playlists/
    app.router.add_get('/api/playlists/new', playlistHandler.createPlaylist)
    app.router.add_get('/api/playlists', playlistHandler.getPlaylists)

    app.router.add_get('/api/playlists/{id}', playlistHandler.getPlaylist)
    app.router.add_delete('/api/playlists/{id}', playlistHandler.deletePlaylist)
    app.router.add_post('/api/playlists/{id}', playlistHandler.updatePlaylist)

    app.router.add_post('/api/playlists/{id}/tracks', playlistHandler.addSong)
    app.router.add_put('/api/playlists/{id}/tracks', playlistHandler.moveSong)
    app.router.add_delete('/api/playlists/{id}/tracks', playlistHandler.removeSong)

    # /api/config
    app.router.add_get('/api/config', configHandler.ready)

    app.router.add_post('/api/config/images', metaHandler.upload)
    app.router.add_post('/api/config/spotify', configHandler.spotifyConfig)

    # /api/system
    app.router.add_get('/api/system/kill', _exitHandler)

    app.router.add_get('/ws', websocket.wsHandler)

    app.router.add_static('/', './ui/dist')

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
    site = web.TCPSite(runner, port=1234)
    await site.start()
    while True:
        await asyncio.sleep(1)
        if env.get("TEST_MODE"):
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
