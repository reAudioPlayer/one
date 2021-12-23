from typing import Any, List, Optional, Union
import aiohttp
import json

from aiohttp.web_ws import WebSocketResponse
from dataModels.song import Song

from player.player import Player

class Message(dict):
    def __init__(self, data: Union[str, dict]) -> None:
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

    async def websocket_handler(self, request):
        ws = WebSocketResponse()
        self._connections.append(ws)
        await ws.prepare(request)

        if self._player._song:
            await self._onSongChange(self._player._song)
        await self._onPlayStateChange(self._player._playing)

        async for msg in ws:
            if msg.type == aiohttp.WSMsgType.TEXT:
                if msg.data == 'close':
                    await ws.close()
                else:
                    msg = Message(msg.data)
                    if not msg.valid:
                        await ws.send_str('invalid message')    
                        continue
                    await self._handle(ws, msg)
            elif msg.type == aiohttp.WSMsgType.ERROR:
                print('ws connection closed with exception %s' %
                    ws.exception())

        print('websocket connection closed')
        self._connections.remove(ws)

        return ws

    async def publish(self, msg: Message) -> None:
        for ws in self._connections:
            await ws.send_json(msg)

    async def _handle(self, ws: WebSocketResponse, msg: Message) -> None:
        await self.publish(msg)
