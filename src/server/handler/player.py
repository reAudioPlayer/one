# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

import asyncio

from aiohttp import web

from dataModel.song import Song
from db.dbManager import DbManager
from player.player import Player
from player.playerPlaylist import PlayerPlaylist
from player.playlistManager import PlaylistManager
from config.runtime import Runtime


class PlayerHandler:
    """player handler"""
    def __init__(self,
                 player: Player,
                 playlistManager: PlaylistManager,
                 dbManager: DbManager) -> None:
        self._player = player
        self._playlistManager = playlistManager
        self._dbManager = dbManager

    async def supportsLocalPlayback(self, _: web.Request) -> web.Response:
        """get(/api/player/supports-local-playback)"""
        return web.json_response(Runtime.args.localPlayback)

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

    async def getPrevious(self, _: web.Request) -> web.Response:
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
        self._player.volume = int(x["value"])
        return web.Response(status = 200, text = "success!")

    async def getVolume(self, _: web.Request) -> web.Response:
        """get(/api/player/volume)"""
        return web.Response(status = 200, text = str(self._player.volume))

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

    async def postShuffle(self, request: web.Request) -> web.Response:
        """post(/api/player/shuffle)"""
        x = await request.json()
        self._player.shuffle = bool(x["value"])
        return web.Response(status = 200, text = "success!")

    async def getShuffle(self, _: web.Request) -> web.Response:
        """get(/api/player/shuffle)"""
        return web.Response(status = 200, text = str(self._player.shuffle))

    async def postRepeat(self, request: web.Request) -> web.Response:
        """post(/api/player/repeat)"""
        x = await request.json()
        self._player.loopSong = bool(x["value"])
        return web.Response(status = 200, text = "success!")

    async def getRepeat(self, _: web.Request) -> web.Response:
        """get(/api/player/repeat)"""
        return web.Response(status = 200, text = str(self._player.loopSong))

    async def postSeek(self, request: web.Request) -> web.Response:
        """post(/api/player/seek)"""
        x = await request.json()
        self._player.position = x["value"]
        return web.Response(status = 200, text = "success!")

    async def getSeek(self, _: web.Request) -> web.Response:
        """get(/api/player/seek)"""
        return web.Response(status = 200, text = str(self._player.position))

    async def getCurrentTrack(self, _: web.Request) -> web.Response:
        """get(/api/me/player/current-track)"""
        return web.json_response(self._player.currentSong.toDict())

    async def getCurrentPlaylist(self, _: web.Request) -> web.Response:
        """get(/api/me/player/current-playlist)"""
        return web.json_response(self._player.currentPlaylist.toDict())
