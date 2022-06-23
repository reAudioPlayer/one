# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

from typing import Any, Dict, List, Optional, Union
import aiohttp
from aiohttp import web
import json

from aiohttp.web_ws import WebSocketResponse
from dataModel.song import Song

from player.player import Player

class Message(dict): # type: ignore
    def __init__(self, data: Union[str, Dict[str, Any]]) -> None:
        if isinstance(data, str):
            super().__init__(json.loads(data))
        else:
            super().__init__(data)

    @property
    def path(self) -> Optional[str]:
        return self.get("path")

    @property
    def data(self) -> Optional[Any]:
        return self.get("data")

    @property
    def valid(self) -> bool:
        return self.path is not None

class Websocket:
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

    async def websocket_handler(self, request: web.Request) -> WebSocketResponse:
        ws = WebSocketResponse()
        self._connections.append(ws)
        await ws.prepare(request)

        if self._player._song:
            await self._onSongChange(self._player._song)
        await self._onPlayStateChange(self._player._playing)
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
                print('ws connection closed with exception %s' %
                    ws.exception())

        print('websocket connection closed')
        self._connections.remove(ws)

        return ws

    async def publish(self, msg: Message) -> None:
        for ws in self._connections:
            try:
                await ws.send_json(msg)
            except:
                pass

    async def _handle(self, ws: WebSocketResponse, msg: Message) -> None:
        await self.publish(msg)
