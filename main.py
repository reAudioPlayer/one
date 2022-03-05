from handler.downloadHandler import DownloadHandler


try:
    from typing import Optional, Tuple
    import spotipy
    from spotipy.oauth2 import  SpotifyOAuth
    from db.dbManager import DbManager
    from downloader.downloader import Downloader
    from handler.newsHandler import NewsHandler
    from handler.sportsHandler import SportsHandler
    from handler.playerHandler import PlayerHandler
    from handler.playlistHandler import PlaylistHandler
    from handler.collectionHandler import CollectionHandler
    from handler.metaHandler import MetaHandler
    from handler.configHandler import ConfigHandler
    from handler.websocket import Websocket
    from player.player import Player
    from aiohttp import web
    import asyncio
    import aiohttp_cors
    from aiohttp_index import IndexMiddleware
    from aiohttp.web import middleware

    import pygame

    import logging
    import time

    from player.playlistManager import PlaylistManager

    from os.path import exists

    import json
except:
    print("you need to run setup.bat (or the documented commands) first")
    import time
    time.sleep(5)
    exit()

# TODO spotify always opening

dbManager = DbManager()

downloader = Downloader()

playlistManager = PlaylistManager(dbManager)

player = Player(dbManager, downloader, playlistManager)

scope = "user-library-read user-follow-read user-follow-modify"

async def init() -> web.Application:
    def _getSpotifyAuthData() -> Tuple[str, str]:
        with open("./config/spotify.json") as file:
            config = json.load(file)
            return config.get("id"), config.get("secret")

    def _getSpotifyAuth(id: str, secret: str) -> Optional[SpotifyOAuth]:
        if "restricted" in (id, secret):
            return None
        return SpotifyOAuth(id, secret, "http://reap.ml/", scope=scope)

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
    downloadHandler = DownloadHandler(dbManager, downloader)
    configHandler = ConfigHandler()
    newsHandler = NewsHandler()
    sportsHandler = SportsHandler()
    websocket = Websocket(player)

    logging.basicConfig(level = logging.INFO)

    @middleware
    async def exceptionMiddleware(request: web.Request, handler):
        logger = logging.getLogger()
        t1 = time.time()
        resp: Optional[web.Response] = None
        try:
            resp = await handler(request)
        except Exception as e:
            logger.exception(e)
            resp  = web.Response(status = 500, text = str(e))
        logger.info(f"{request.method} {request.path} ({time.time() - t1} s)")
        return resp

    app = web.Application(middlewares=[IndexMiddleware(), exceptionMiddleware])

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

    app.router.add_post('/api/metadata', metaHandler.get)
    app.router.add_post('/api/track', metaHandler.getTrack)
    app.router.add_post('/api/search', metaHandler.search)
    app.router.add_get('/api/releases', metaHandler.releases)

    app.router.add_post('/api/spotify/album', metaHandler.spotifyAlbum)
    app.router.add_post('/api/spotify/artist', metaHandler.spotifyArtist)
    app.router.add_get('/api/spotify/artists', metaHandler.spotifyArtists)
    app.router.add_post('/api/spotify/playlist', metaHandler.spotifyPlaylist)
    app.router.add_get('/api/spotify/playlists', metaHandler.spotifyPlaylists)
    app.router.add_post('/api/spotify/follow', metaHandler.spotifyFollow)
    app.router.add_post('/api/spotify/unfollow', metaHandler.spotifyUnfollow)
    app.router.add_post('/api/spotify/recommend', metaHandler.spotifyRecommend)

    app.router.add_get('/api/collection/tracks', collectionHandler.tracks)

    app.router.add_post('/api/match', sportsHandler.getMatch)
    app.router.add_get('/api/match/volley/{hash}', sportsHandler.getVolleyMatch)

    app.router.add_get('/api/news', newsHandler.getSomeNews)
    app.router.add_get('/api/news/article/{hash}', newsHandler.getArticle)

    app.router.add_get('/api/download/{id}', downloadHandler.download)

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

    app.add_routes([web.get('/ws', websocket.websocket_handler)])

    # Configure default CORS settings.
    cors = aiohttp_cors.setup(app, defaults={
        "*": aiohttp_cors.ResourceOptions(
                allow_credentials=True,
                expose_headers="*",
                allow_headers="*",
            )
    })

    for route in list(app.router.routes()):
        cors.add(route)

    app.router.add_static('/', './ui/dist')
    return app

MUSIC_END = pygame.USEREVENT+1
pygame.mixer.music.set_endevent(MUSIC_END)

async def main() -> None:
    app = await init()
    runner = web.AppRunner(app)
    await runner.setup()
    site = web.TCPSite(runner, port=1234)
    await site.start()
    while True:
        await asyncio.sleep(1)
        event = pygame.event.poll()
        if event.type == MUSIC_END:
            await player.next()

asyncio.run(main())
