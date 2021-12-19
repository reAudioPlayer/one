from aiohttp import web
from player.player import Player
from player.playerPlaylist import PlayerPlaylist
from player.playlistManager import PlaylistManager

class PlayerHandler:
    def __init__(self, player: Player, playlistManager: PlaylistManager) -> None:
        self._player = player
        self._playlistManager = playlistManager

    async def getPlay(self, _: web.Request):
        self._player.play()
        return web.Response(status = 200, text = "success!")

    async def getPause(self, _: web.Request):
        self._player.pause()
        return web.Response(status = 200, text = "success!")

    async def getPlayPause(self, _: web.Request):
        self._player.playPause()
        return web.Response(status = 200, text = "success!")

    async def getNext(self, _: web.Request):
        self._player.next()
        return web.Response(status = 200, text = "success!")

    async def getLast(self, _: web.Request):
        self._player.last()
        return web.Response(status = 200, text = "success!")

    async def loadPlaylist(self, request: web.Request):
        x = await request.json()
        self._player.loadPlaylist(self._playlistManager.get(x["id"]))
        return web.Response(status = 200, text = "success!")
