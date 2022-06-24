# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

import asyncio

import pygame
from aiohttp import web

from dataModel.song import Song
from db.dbManager import DbManager
from player.player import Player
from player.playerPlaylist import PlayerPlaylist
from player.playlistManager import PlaylistManager


class PlayerHandler:
    """player handler"""
    def __init__(self,
                 player: Player,
                 playlistManager: PlaylistManager,
                 dbManager: DbManager) -> None:
        self._player = player
        self._playlistManager = playlistManager
        self._dbManager = dbManager

    async def getPlay(self, _: web.Request) -> web.Response:
        """get(/api/play)"""
        asyncio.create_task(self._player.play())
        return web.Response(status = 200, text = "success!")

    async def getPause(self, _: web.Request) -> web.Response:
        """get(/api/pause)"""
        asyncio.create_task(self._player.pause())
        return web.Response(status = 200, text = "success!")

    async def getPlayPause(self, _: web.Request) -> web.Response:
        """get(/api/playPause)"""
        asyncio.create_task(self._player.playPause())
        return web.Response(status = 200, text = "success!")

    async def getNext(self, _: web.Request) -> web.Response:
        """get(/api/next)"""
        asyncio.create_task(self._player.next())
        return web.Response(status = 200, text = "success!")

    async def getLast(self, _: web.Request) -> web.Response:
        """get(/api/last)"""
        asyncio.create_task(self._player.last())
        return web.Response(status = 200, text = "success!")

    async def loadPlaylist(self, request: web.Request) -> web.Response:
        """post(/api/loadPlaylist)"""
        x = await request.json()
        if x.get("type") == "playlist":
            asyncio.create_task(self._player.loadPlaylist(self._playlistManager.get(x["id"])))
        elif x.get("type") == "collection":
            asyncio.create_task(self._player.loadPlaylist(PlayerPlaylist.liked(self._dbManager)))
        elif x.get("type") == "collection/breaking":
            asyncio.create_task(self._player.loadPlaylist(PlayerPlaylist.breaking(self._dbManager)))
        elif x.get("type") == "track":
            print(f"id={x['id']}")
            asyncio.create_task(self._player
                .loadPlaylist(PlayerPlaylist(self._dbManager,
                                             songs = self._dbManager\
                                                .getSongsByCustomFilter(f"id={x['id']}"),
                                             name = x['id'])))
        return web.Response(status = 200, text = "success!")

    async def setVolume(self, request: web.Request) -> web.Response:
        """post(/api/setVolume)"""
        x = await request.json()
        pygame.mixer.music.set_volume(int(x["value"]) / 100.0)
        return web.Response(status = 200, text = "success!")

    async def getVolume(self, _: web.Request) -> web.Response:
        """get(/api/getVolume)"""
        return web.Response(status = 200, text = str(round(pygame.mixer.music.get_volume() * 100)))

    async def loadSongAt(self, request: web.Request) -> web.Response:
        """post(/api/at)"""
        x = await request.json()
        async def _implement() -> None:
            print(x.get("type"))
            if "playlistIndex" in x:
                if not await self._player.loadPlaylist(
                        self._playlistManager.get(x.get("playlistIndex")),
                                                  x["index"]):
                    await self._player.at(x["index"])
            elif x.get("type") == "collection/breaking":
                print("do breaking!!")
                if not await self._player.loadPlaylist(PlayerPlaylist.breaking(self._dbManager),
                                                       x["index"]):
                    await self._player.at(x["index"])
                print("hello??")
            elif x.get("type") == "collection":
                if not await self._player.loadPlaylist(PlayerPlaylist.liked(self._dbManager),
                                                       x["index"]):
                    await self._player.at(x["index"])
            await self._player.at(x["index"])

        asyncio.create_task(_implement())
        return web.Response(status = 200, text = "success!")

    async def updateSong(self, request: web.Request) -> web.Response:
        """post(/api/updateSong)"""
        jdata = await request.json()
        self._player.updateSongMetadata(jdata["id"], Song.fromDict(jdata))
        return web.Response(status = 200, text = "success!")

    async def setShuffle(self, request: web.Request) -> web.Response:
        """post(/api/shuffle)"""
        x = await request.json()
        self._player.shuffle = bool(x["value"])
        return web.Response(status = 200, text = "success!")

    async def getShuffle(self, _: web.Request) -> web.Response:
        """get(/api/shuffle)"""
        return web.Response(status = 200, text = str(self._player.shuffle))

    async def setLoopSong(self, request: web.Request) -> web.Response:
        """post(/api/songLoop)"""
        x = await request.json()
        self._player.loopSong = bool(x["value"])
        return web.Response(status = 200, text = "success!")

    async def getLoopSong(self, _: web.Request) -> web.Response:
        """get(/api/songLoop)"""
        return web.Response(status = 200, text = str(self._player.loopSong))

    async def setPos(self, request: web.Request) -> web.Response:
        """post(/api/setPos)"""
        x = await request.json()
        self._player.setPos(x["value"])
        return web.Response(status = 200, text = "success!")

    async def getPos(self, _: web.Request) -> web.Response:
        """get(/api/getPos)"""
        return web.Response(status = 200, text = str(self._player.getPos()))
