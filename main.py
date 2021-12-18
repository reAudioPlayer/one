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

downloader = Downloader()
#downloader.downloadSong("https://www.youtube.com/watch?v=6iRJFfEVUB8", "upNow")
#downloader.downloadSong("https://www.youtube.com/watch?v=l5s7h3yiWeY")

#while True:
#    import time
#    time.sleep(5)

dbManager = DbManager()
#dbManager.addSong(Song("songname", "byme", "spotifylink...", "youtubelink", None))
#dbManager.addSong(Song("songname", "byme", "spotifylink2", "youtubelink", None))
#dbManager.addPlaylist(Playlist("playlistname", [1, 2, 3, 5]))
for row in dbManager.getSongByCustomFilter("spotify = 'spotifylink2'"):
    print(row)
for row in dbManager.getPlaylists():
    print(row)

ee = EventEmitter()
player = Player(ee, dbManager, downloader)
playlistManager = PlaylistManager(dbManager)

playerHandler = PlayerHandler(player)
playlistHandler = PlaylistHandler(playlistManager)

player.loadPlaylist(playlistManager.get(0))

app = web.Application(middlewares=[IndexMiddleware()])

app.router.add_get('/last', playerHandler.getLast)
app.router.add_get('/next', playerHandler.getNext)
app.router.add_get('/playPause', playerHandler.getPlayPause)
app.router.add_get('/pause', playerHandler.getPause)
app.router.add_get('/play', playerHandler.getPlay)
app.router.add_post('/add', playlistHandler.addSong)

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
