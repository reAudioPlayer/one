# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

from typing import Any, Dict, List, Optional, Union
import json

import aiohttp
from aiohttp import web

from aiohttp.web_ws import WebSocketResponse
from dataModel.song import Song

from player.player import Player

class Message(Dict[str, Any]):
    """websocket message"""
    def __init__(self, data: Union[str, Dict[str, Any]]) -> None:
        if isinstance(data, str):
            super().__init__(json.loads(data))
        else:
            super().__init__(data)

    @property
    def path(self) -> Optional[str]:
        """return path"""
        return self.get("path")

    @property
    def data(self) -> Optional[Any]:
        """return data"""
        return self.get("data")

    @property
    def valid(self) -> bool:
        """return valid"""
        return self.path is not None

class Websocket:
    """websocket handler"""
    def __init__(self, player: Player) -> None:
        self._connections: List[WebSocketResponse] = [ ]
        self._player = player
        self._player._songChangeCallback = self._onSongChange
        self._player._playStateChangeCallback = self._onPlayStateChange
        self._player._positionSyncCallback = self._onPositionSync

    async def _onSongChange(self, song: Song) -> None:
        await self.publish(Message({
            "path": "player.song",
            "data": song.toDict()
        }))

    async def _onPlayStateChange(self, playing: bool) -> None:
        await self.publish(Message({
            "path": "player.playState",
            "data": playing
        }))

    async def _onPositionSync(self, pos: float) -> None:
        await self.publish(Message({
            "path": "player.posSync",
            "data": pos
        }))

    async def wsHandler(self, request: web.Request) -> WebSocketResponse:
        """get(/ws)"""
        ws = WebSocketResponse()
        self._connections.append(ws)
        await ws.prepare(request)

        if self._player.currentSong:
            await self._onSongChange(self._player.currentSong)
        await self._onPlayStateChange(self._player.playing)
        await self._onPositionSync(self._player.getPos())

        async for msg in ws:
            if msg.type == aiohttp.WSMsgType.TEXT:
                if msg.data == 'close':
                    await ws.close()
                else:
                    data = Message(msg.data)
                    if not data.valid:
                        await ws.send_str('invalid message')
                        continue
                    await self._handle(ws, data)
            elif msg.type == aiohttp.WSMsgType.ERROR:
                print(f"ws connection closed with exception {ws.exception()}")

        print('websocket connection closed')
        self._connections.remove(ws)

        return ws

    async def publish(self, msg: Message) -> None:
        """publishs to all connected ws clients"""
        for ws in self._connections:
            try:
                await ws.send_json(msg)
            except: # pylint: disable=bare-except
                pass

    async def _handle(self, _: WebSocketResponse, msg: Message) -> None:
        await self.publish(msg)
