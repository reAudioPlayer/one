from typing import Optional
from pymitter import EventEmitter
from spotipy.client import Spotify
from spotipy.oauth2 import SpotifyClientCredentials
from db.dbManager import DbManager
from downloader.downloader import Downloader
from handler.playerHandler import PlayerHandler
from handler.playlistHandler import PlaylistHandler
from handler.collectionHandler import CollectionHandler
from handler.metaHandler import MetaHandler
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

#downloader.downloadSong("https://audius.co/Xdmrecords/broz-rodriguez-tequila")
#downloader.downloadSong("https://www.youtube.com/watch?v=l5s7h3yiWeY")
#downloader.downloadSong("https://soundcloud.com/basshouse-music/castion-reeva-never-be-forgotten-bhm044")
#downloader.downloadSong("https://open.spotify.com/track/6WXbZykcCejVs36zmIfxh5") # needs to be implemented first

dbManager = DbManager()

ee = EventEmitter()

downloader = Downloader()

playlistManager = PlaylistManager(dbManager)

player = Player(ee, dbManager, downloader, playlistManager)

spotify = Spotify(client_credentials_manager=SpotifyClientCredentials(client_id="c8e963f8a6a942b58712cc34e2ccc76d", client_secret="6ec48f7d1b574bd6b340384c50675447"))

playerHandler = PlayerHandler(player, playlistManager)
playlistHandler = PlaylistHandler(playlistManager)
collectionHandler = CollectionHandler(dbManager)
metaHandler = MetaHandler(spotify)

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
app.router.add_post('/api/loadPlaylist', playerHandler.loadPlaylist)
app.router.add_post('/api/updateSong', playerHandler.updateSong)

app.router.add_post('/api/metadata', metaHandler.get)

app.router.add_get('/api/collection/tracks', collectionHandler.tracks)

app.router.add_post('/api/add', playlistHandler.addSong)
app.router.add_get('/api/playlist/create', playlistHandler.createPlaylist)
app.router.add_post('/api/playlist', playlistHandler.getPlaylist)
app.router.add_get('/api/playlists', playlistHandler.getPlaylists)

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

MUSIC_END = pygame.USEREVENT+1
pygame.mixer.music.set_endevent(MUSIC_END)

async def main() -> None:
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

player.unload()
