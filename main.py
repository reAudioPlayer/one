import pygame
from pymitter import EventEmitter
from dataModels.playlist import Playlist
from dataModels.song import Song
from db.dbManager import DbManager
from downloader.downloader import Downloader
from handler.playerHandler import PlayerHandler
from player.player import Player
from aiohttp import web
import asyncio

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

playerHandler = PlayerHandler(player)

app = web.Application()

app.router.add_get('/last', playerHandler.getLast)
app.router.add_get('/next', playerHandler.getNext)
app.router.add_get('/pause', playerHandler.getPause)
app.router.add_get('/play', playerHandler.getPlay)

app.router.add_static('/', './ui')
asyncio.run ( web._run_app(app, port=1234) )

player.unload()
