# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

import os
from os import environ as env
from os.path import exists
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

playlistManager = PlaylistManager(dbManager)

player = Player(dbManager, downloader, playlistManager)

SCOPE = "user-library-read user-follow-read user-follow-modify"

def _getSpotifyAuthData() -> Tuple[str, str]:
    with open("./config/spotify.json", encoding = "utf-8") as file:
        config = json.load(file)
        return config.get("id"), config.get("secret")

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

    # TODO improve endpoint names

    # /api/player/
    app.router.add_get('/api/last', playerHandler.getLast) # /api/player/previous
    app.router.add_get('/api/next', playerHandler.getNext) # /api/player/next

    app.router.add_get('/api/playPause', playerHandler.getPlayPause) # /api/player/playPause
    app.router.add_get('/api/pause', playerHandler.getPause) # /api/player/pause
    app.router.add_get('/api/play', playerHandler.getPlay) # /api/player/play

    app.router.add_post('/api/at', playerHandler.loadSongAt)  # /api/player/at

    app.router.add_post('/api/setVolume', playerHandler.setVolume) # /api/player/volume
    app.router.add_get('/api/getVolume', playerHandler.getVolume) # /api/player/volume

    app.router.add_post('/api/loadPlaylist', playerHandler.loadPlaylist)  # /api/player/load

    app.router.add_post('/api/setPos', playerHandler.setPos) # /api/player/seek
    app.router.add_get('/api/getPos', playerHandler.getPos) # /api/player/seek

    app.router.add_post('/api/songLoop', playerHandler.setLoopSong) # /api/player/repeat
    app.router.add_get('/api/songLoop', playerHandler.getLoopSong) # /api/player/repeat

    app.router.add_post('/api/shuffle', playerHandler.setShuffle) # /api/player/shuffle
    app.router.add_get('/api/shuffle', playerHandler.getShuffle) # /api/player/shuffle

    app.router.add_get('/api/stream', downloadHandler.stream) # /api/player/stream
    app.router.add_get('/api/stream/{id}', downloadHandler.streamFromCache) # /api/player/stream/{id}

    # UNGROUPED
    app.router.add_post('/api/metadata', metaHandler.get)  # /api/browse/track

    app.router.add_post('/api/search', metaHandler.search) # /api/search

    app.router.add_get('/api/releases', metaHandler.releases) # /api/releases

    app.router.add_post('/api/match', sportsHandler.getMatch) # /api/sports

    # /api/spotify/
    app.router.add_post('/api/spotify/album', metaHandler.spotifyAlbum) # /api/spotify/albums/{id}
    app.router.add_post('/api/spotify/artist', metaHandler.spotifyArtist) # /api/spotify/artists/{id}
    app.router.add_get('/api/spotify/artists', metaHandler.spotifyArtists) # /api/spotify/albums
    app.router.add_post('/api/spotify/playlist', metaHandler.spotifyPlaylist) # /api/spotify/playlists/{id}
    app.router.add_get('/api/spotify/playlists', metaHandler.spotifyPlaylists) # /api/spotify/playlists
    app.router.add_post('/api/spotify/follow', metaHandler.spotifyFollow) # /api/spotify/following
    app.router.add_post('/api/spotify/unfollow', metaHandler.spotifyUnfollow) # /api/spotify/following (delete)
    app.router.add_post('/api/spotify/recommend', metaHandler.spotifyRecommend)  # /api/spotify/recommendations

    # /api/me/
    app.router.add_get('/api/collection/tracks', collectionHandler.tracks) # /api/me/liked
    app.router.add_get('/api/collection/tracks/breaking', collectionHandler.breaking) # /api/me/new

    # /api/news/
    app.router.add_get('/api/news', newsHandler.getSomeNews) # /api/news/articles
    app.router.add_get('/api/news/article/{hash}', newsHandler.getArticle) # /api/news/articles/{hash}

    # /api/tracks
    app.router.add_post('/api/track', metaHandler.getTrack)  # /api/tracks/{id}
    app.router.add_post('/api/updateSong', playerHandler.updateSong)  # /api/tracks/{id}
    app.router.add_get('/api/download/{id}', downloadHandler.download) # /api/tracks/{id}/download

    # /api/playlists/
    app.router.add_get('/api/playlist/create', playlistHandler.createPlaylist) # /api/playlists/new
    app.router.add_get('/api/playlists', playlistHandler.getPlaylists) # /api/playlists

    app.router.add_post('/api/playlist', playlistHandler.getPlaylist) # /api/playlists/{id} (get)
    app.router.add_delete('/api/playlist/{id}', playlistHandler.deletePlaylist) # /api/playlists/{id} (delete)
    app.router.add_post('/api/updatePlaylist', playlistHandler.updatePlaylist) # /api/playlists/{id} (post)

    app.router.add_post('/api/add', playlistHandler.addSong) # /api/playlists/{id}/tracks (post)
    app.router.add_post('/api/rearrange', playlistHandler.moveSong) # /api/playlists/{id}/tracks (put)
    app.router.add_post('/api/remove', playlistHandler.removeSong) # /api/playlists/{id}/tracks (delete)

    # /api/config
    app.router.add_get('/api/config/ready', configHandler.ready) # /api/config

    app.router.add_post('/api/upload', metaHandler.upload) # /api/config/images
    app.router.add_post('/api/config/spotify', configHandler.spotifyConfig) # /api/config/spotify

    # /api/system
    app.router.add_get('/api/kill', _exitHandler) # /api/system/kill

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
