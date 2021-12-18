from aiohttp import web
from player.player import Player

class PlayerHandler:
    def __init__(self, player: Player) -> None:
        self._player = player

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
