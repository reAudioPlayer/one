from optparse import Option
from typing import Optional
from aiohttp import web
from dataModels.song import Song
from db.dbManager import DbManager
from player.player import Player
from player.playerPlaylist import PlayerPlaylist
from player.playlistManager import PlaylistManager
import pygame
import asyncio


class PlayerHandler:
    def __init__(self, player: Player, playlistManager: PlaylistManager, dbManager: DbManager) -> None:
        self._player = player
        self._playlistManager = playlistManager
        self._dbManager = dbManager

    async def getPlay(self, _: web.Request):
        asyncio.create_task(self._player.play())
        return web.Response(status = 200, text = "success!")

    async def getPause(self, _: web.Request):
        asyncio.create_task(self._player.pause())
        return web.Response(status = 200, text = "success!")

    async def getPlayPause(self, _: web.Request):
        asyncio.create_task(self._player.playPause())
        return web.Response(status = 200, text = "success!")

    async def getNext(self, _: web.Request):
        asyncio.create_task(self._player.next())
        return web.Response(status = 200, text = "success!")

    async def getLast(self, _: web.Request):
        asyncio.create_task(self._player.last())
        return web.Response(status = 200, text = "success!")

    async def loadPlaylist(self, request: web.Request):
        x = await request.json()
        if x.get("type") == "playlist":
            asyncio.create_task(self._player.loadPlaylist(self._playlistManager.get(x["id"])))
        elif x.get("type") == "collection":
            asyncio.create_task(self._player.loadPlaylist(PlayerPlaylist(self._dbManager, songs = self._dbManager.getSongByCustomFilter("favourite=1"), name = "Liked Songs")))
        elif x.get("type") == "track":
            print(f"id={x['id']}")
            asyncio.create_task(self._player.loadPlaylist(PlayerPlaylist(self._dbManager, songs = self._dbManager.getSongByCustomFilter(f"id={x['id']}"), name = x['id'])))
        return web.Response(status = 200, text = "success!")

    async def setVolume(self, request: web.Request):
        x = await request.json()
        pygame.mixer.music.set_volume(int(x["value"]) / 100.0)
        return web.Response(status = 200, text = "success!")

    async def getVolume(self, _: web.Request):
        return web.Response(status = 200, text = str(round(pygame.mixer.music.get_volume() * 100.0)))

    async def loadSongAt(self, request: web.Request):
        x = await request.json()
        collection: Optional[PlayerPlaylist] = None
        if x.get("type") == "collection":
            collection = PlayerPlaylist(self._dbManager, songs = self._dbManager.getSongByCustomFilter("favourite=1"), name = "Liked Songs")
        async def _implement() -> None:
            if "playlistIndex" in x:
                if not await self._player.loadPlaylist(self._playlistManager.get(x.get("playlistIndex")), x["index"]):
                    await self._player.at(x["index"])
            elif x.get("type") == "collection":
                if not await self._player.loadPlaylist(collection, x["index"]):
                    await self._player.at(x["index"])
            await self._player.at(x["index"])

        asyncio.create_task(_implement())
        return web.Response(status = 200, text = "success!")

    async def updateSong(self, request: web.Request) -> None:
        jdata = await request.json()
        self._player.updateSongMetadata(jdata["id"], Song.FromDict(jdata))
        return web.Response(status = 200, text = "success!")

    async def setShuffle(self, request: web.Request):
        x = await request.json()
        self._player.shuffle = bool(x["value"])
        return web.Response(status = 200, text = "success!")

    async def getShuffle(self, _: web.Request):
        return web.Response(status = 200, text = str(self._player.shuffle))

    async def setLoopSong(self, request: web.Request):
        x = await request.json()
        self._player.loopSong = bool(x["value"])
        return web.Response(status = 200, text = "success!")

    async def getLoopSong(self, _: web.Request):
        return web.Response(status = 200, text = str(self._player.loopSong))

    async def setPos(self, request: web.Request):
        x = await request.json()
        self._player.setPos(x["value"])
        return web.Response(status = 200, text = "success!")

    async def getPos(self, _: web.Request):
        return web.Response(status = 200, text = str(self._player.getPos()))
