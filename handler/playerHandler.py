from aiohttp import web
from dataModels.song import Song
from player.player import Player
from player.playlistManager import PlaylistManager
import pygame


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

    async def setVolume(self, request: web.Request):
        x = await request.json()
        pygame.mixer.music.set_volume(int(x["value"]) / 100.0)
        return web.Response(status = 200, text = "success!")

    async def loadSongAt(self, request: web.Request):
        x = await request.json()
        self._player.at(x["index"])
        return web.Response(status = 200, text = "success!")

    async def updateSong(self, request: web.Request) -> None:
        jdata = await request.json()
        self._player.updateSongMetadata(jdata["id"], Song.FromDict(jdata))
        return web.Response(status = 200, text = "success!")
