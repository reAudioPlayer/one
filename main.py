import pygame
from pymitter import EventEmitter
from dataModels.playlist import Playlist
from dataModels.song import Song
from db.dbManager import DbManager
from downloader.downloader import Downloader
from handler.playerHandler import PlayerHandler
from handler.playlistHandler import PlaylistHandler
from player.player import Player
from aiohttp import web
import asyncio
import aiohttp_cors
from aiohttp_index import IndexMiddleware

from player.playlistManager import PlaylistManager

#downloader.downloadSong("https://audius.co/Xdmrecords/broz-rodriguez-tequila")
#downloader.downloadSong("https://www.youtube.com/watch?v=l5s7h3yiWeY")
#downloader.downloadSong("https://soundcloud.com/basshouse-music/castion-reeva-never-be-forgotten-bhm044")
#downloader.downloadSong("https://open.spotify.com/track/6WXbZykcCejVs36zmIfxh5") # needs to be implemented first

dbManager = DbManager()

ee = EventEmitter()

downloader = Downloader()

player = Player(ee, dbManager, downloader)

playlistManager = PlaylistManager(dbManager)

playerHandler = PlayerHandler(player, playlistManager)
playlistHandler = PlaylistHandler(playlistManager)

app = web.Application(middlewares=[IndexMiddleware()])

app.router.add_get('/api/last', playerHandler.getLast)
app.router.add_get('/api/next', playerHandler.getNext)
app.router.add_get('/api/playPause', playerHandler.getPlayPause)
app.router.add_get('/api/pause', playerHandler.getPause)
app.router.add_get('/api/play', playerHandler.getPlay)
app.router.add_post('/api/loadPlaylist', playerHandler.loadPlaylist)
app.router.add_post('/api/add', playlistHandler.addSong)
app.router.add_post('/api/playlist', playlistHandler.getPlaylist)
app.router.add_get('/api/playlists', playlistHandler.getPlaylists)

# Configure default CORS settings.
"""cors = aiohttp_cors.setup(app, defaults={
    "*": aiohttp_cors.ResourceOptions(
            allow_credentials=True,
            expose_headers="*",
            allow_headers="*",
        )
})"""

#for route in list(app.router.routes()):
#    cors.add(route)

app.router.add_static('/', './ui/dist')
asyncio.run ( web._run_app(app, port=1234) )

player.unload()
