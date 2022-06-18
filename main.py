# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

import os


try:
    from typing import Optional, Tuple

    import spotipy
    from spotipy.oauth2 import  SpotifyOAuth

    from db.dbManager import DbManager

    from downloader.downloader import Downloader

    from handler.downloadHandler import DownloadHandler
    from handler.newsHandler import NewsHandler
    from handler.sportsHandler import SportsHandler
    from handler.playerHandler import PlayerHandler
    from handler.playlistHandler import PlaylistHandler
    from handler.collectionHandler import CollectionHandler
    from handler.metaHandler import MetaHandler
    from handler.configHandler import ConfigHandler
    from handler.websocket import Websocket

    from player.player import Player
    from player.playlistManager import PlaylistManager

    from aiohttp import web
    from aiohttp.web import middleware

    from aiohttp_index import IndexMiddleware

    import aiohttp_cors

    import pygame

    import logging
    import time
    import atexit

    from os.path import exists

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

@middleware
async def _exceptionMiddleware(request: web.Request, handler):
    logger = logging.getLogger()
    start = time.time()
    resp: Optional[web.Response] = None
    try:
        resp = await handler(request)
    except Exception as exc: # pylint: disable=bare-except
        logger.exception(exc)
        resp  = web.Response(status = 500, text = str(exc))
    logger.info("%s %s (%s s)", request.method, request.path, time.time() - start)
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

    app.router.add_get('/api/last', playerHandler.getLast)
    app.router.add_get('/api/next', playerHandler.getNext)
    app.router.add_get('/api/playPause', playerHandler.getPlayPause)
    app.router.add_get('/api/pause', playerHandler.getPause)
    app.router.add_get('/api/play', playerHandler.getPlay)
    app.router.add_post('/api/at', playerHandler.loadSongAt)
    app.router.add_post('/api/setVolume', playerHandler.setVolume)
    app.router.add_get('/api/getVolume', playerHandler.getVolume)
    app.router.add_post('/api/loadPlaylist', playerHandler.loadPlaylist)
    app.router.add_post('/api/updateSong', playerHandler.updateSong)
    app.router.add_post('/api/setPos', playerHandler.setPos)
    app.router.add_get('/api/getPos', playerHandler.getPos)
    app.router.add_post('/api/songLoop', playerHandler.setLoopSong)
    app.router.add_get('/api/songLoop', playerHandler.getLoopSong)
    app.router.add_post('/api/shuffle', playerHandler.setShuffle)
    app.router.add_get('/api/shuffle', playerHandler.getShuffle)

    app.router.add_post('/api/metadata', metaHandler.get)
    app.router.add_post('/api/track', metaHandler.getTrack)
    app.router.add_post('/api/search', metaHandler.search)
    app.router.add_get('/api/releases', metaHandler.releases)
    app.router.add_post('/api/upload', metaHandler.upload)

    app.router.add_post('/api/spotify/album', metaHandler.spotifyAlbum)
    app.router.add_post('/api/spotify/artist', metaHandler.spotifyArtist)
    app.router.add_get('/api/spotify/artists', metaHandler.spotifyArtists)
    app.router.add_post('/api/spotify/playlist', metaHandler.spotifyPlaylist)
    app.router.add_get('/api/spotify/playlists', metaHandler.spotifyPlaylists)
    app.router.add_post('/api/spotify/follow', metaHandler.spotifyFollow)
    app.router.add_post('/api/spotify/unfollow', metaHandler.spotifyUnfollow)
    app.router.add_post('/api/spotify/recommend', metaHandler.spotifyRecommend)

    app.router.add_get('/api/collection/tracks', collectionHandler.tracks)
    app.router.add_get('/api/collection/tracks/breaking', collectionHandler.breaking)

    app.router.add_post('/api/match', sportsHandler.getMatch)
    app.router.add_get('/api/match/volley/{hash}', sportsHandler.getVolleyMatch)

    app.router.add_get('/api/news', newsHandler.getSomeNews)
    app.router.add_get('/api/news/article/{hash}', newsHandler.getArticle)

    app.router.add_get('/api/download/{id}', downloadHandler.download)
    app.router.add_get('/api/stream', downloadHandler.stream)
    app.router.add_get('/api/stream/{id}', downloadHandler.streamFromCache)

    app.router.add_post('/api/add', playlistHandler.addSong)
    app.router.add_post('/api/remove', playlistHandler.removeSong)
    app.router.add_post('/api/rearrange', playlistHandler.moveSong)
    app.router.add_get('/api/playlist/create', playlistHandler.createPlaylist)
    app.router.add_post('/api/playlist', playlistHandler.getPlaylist)
    app.router.add_delete('/api/playlist/{id}', playlistHandler.deletePlaylist)
    app.router.add_get('/api/playlists', playlistHandler.getPlaylists)
    app.router.add_post('/api/updatePlaylist', playlistHandler.updatePlaylist)

    app.router.add_get('/api/config/ready', configHandler.ready)
    app.router.add_post('/api/config/spotify', configHandler.spotifyConfig)

    app.router.add_get('/ws', websocket.websocket_handler)

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
        event = pygame.event.poll()
        if event.type == MUSIC_END:
            await player.onSongEnd()

def _cleanCache() -> None:
    pygame.mixer.music.unload()
    if os.path.exists("./_cache"):
        shutil.rmtree("./_cache")

atexit.register(_cleanCache)

asyncio.run(main())
