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
        """get(/api/player/play)"""
        asyncio.create_task(self._player.play())
        return web.Response(status = 200, text = "success!")

    async def getPause(self, _: web.Request) -> web.Response:
        """get(/api/player/pause)"""
        asyncio.create_task(self._player.pause())
        return web.Response(status = 200, text = "success!")

    async def getPlayPause(self, _: web.Request) -> web.Response:
        """get(/api/player/playPause)"""
        asyncio.create_task(self._player.playPause())
        return web.Response(status = 200, text = "success!")

    async def getNext(self, _: web.Request) -> web.Response:
        """get(/api/player/next)"""
        asyncio.create_task(self._player.next())
        return web.Response(status = 200, text = "success!")

    async def getLast(self, _: web.Request) -> web.Response:
        """get(/api/player/previous)"""
        asyncio.create_task(self._player.last())
        return web.Response(status = 200, text = "success!")

    async def loadPlaylist(self, request: web.Request) -> web.Response:
        """post(/api/player/load)"""
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
        """post(/api/player/volume)"""
        x = await request.json()
        pygame.mixer.music.set_volume(int(x["value"]) / 100.0)
        return web.Response(status = 200, text = "success!")

    async def getVolume(self, _: web.Request) -> web.Response:
        """get(/api/player/volume)"""
        return web.Response(status = 200, text = str(round(pygame.mixer.music.get_volume() * 100)))

    async def loadSongAt(self, request: web.Request) -> web.Response:
        """post(/api/player/at)"""
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
        """post(/api/tracks/{id})"""
        id_ = int(request.match_info['id'])
        jdata = await request.json()
        self._player.updateSongMetadata(id_, Song.fromDict(jdata))
        return web.Response(status = 200, text = "success!")

    async def setShuffle(self, request: web.Request) -> web.Response:
        """post(/api/player/shuffle)"""
        x = await request.json()
        self._player.shuffle = bool(x["value"])
        return web.Response(status = 200, text = "success!")

    async def getShuffle(self, _: web.Request) -> web.Response:
        """get(/api/player/shuffle)"""
        return web.Response(status = 200, text = str(self._player.shuffle))

    async def setLoopSong(self, request: web.Request) -> web.Response:
        """post(/api/player/repeat)"""
        x = await request.json()
        self._player.loopSong = bool(x["value"])
        return web.Response(status = 200, text = "success!")

    async def getLoopSong(self, _: web.Request) -> web.Response:
        """get(/api/player/repeat)"""
        return web.Response(status = 200, text = str(self._player.loopSong))

    async def setPos(self, request: web.Request) -> web.Response:
        """post(/api/player/seek)"""
        x = await request.json()
        self._player.setPos(x["value"])
        return web.Response(status = 200, text = "success!")

    async def getPos(self, _: web.Request) -> web.Response:
        """get(/api/player/seek)"""
        return web.Response(status = 200, text = str(self._player.getPos()))
