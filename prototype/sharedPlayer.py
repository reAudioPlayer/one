from __future__ import annotations
from typing import List, Optional
from aiohttp import web
import aiohttp
from enum import Enum
import hashids


class ConnectionType(Enum):
    Client = 0
    Player = 1


class Connection:
    _deviceLookup = {
        "X11": "Linux",
        "Macintosh": "Mac",
        "Windows NT 10.0": "Windows 10",
        "iPhone": "iPhone",
        "iPad": "iPad",
        "iPod": "iPod",
        "Android": "Android"
    }
    _connections: List[Connection] = []
    _hashids = hashids.Hashids(salt = "sharedPlayer", min_length = 4)

    def __init__(self,
                 request: web.Request,
                 response: web.WebSocketResponse) -> None:
        self._request = request
        self._response = response
        self._type = ConnectionType.Player
        self._id = Connection._hashids.encode(len(Connection._connections))
        self._player: Optional[Connection] = None

    @classmethod
    async def broadcast(cls, message: str) -> None:
        for connection in cls._connections:
            await connection.send(message)

    @classmethod
    async def broadcastJson(cls, message: dict) -> None:
        for connection in cls._connections:
            await connection.sendJson(message)

    @classmethod
    async def broadcastConnections(cls) -> None:
        await cls.broadcastJson({
            "type": "connections",
            "data": [connection.toDict() for connection in cls._connections]
        })

    async def handle(self) -> None:
        Connection._connections.append(self)
        await Connection.broadcastConnections()

        async for message in self._response:
            if message.type == aiohttp.WSMsgType.TEXT:
                jdata = message.json()
                if jdata["type"] == "type":
                    if jdata["data"] != "Player":
                        await self.sendJson({
                            "type": "type",
                            "data": False
                        })
                        continue
                    self._type = ConnectionType.Player
                    self._player = None
                    await Connection.broadcastConnections()
                elif jdata["type"] == "set player":
                    id_ = jdata["data"]
                    for connection in Connection._connections:
                        if id_ == connection.id and connection.type == ConnectionType.Player:
                            self._player = connection
                            self._type = ConnectionType.Client
                            await connection.sendJson({
                                "type": "new client",
                                "data": self.toDict()
                            })
                            break
                    await self._response.send_json({
                        "type": "set player",
                        "data": self._player is not None
                    })
                elif jdata["type"] == "command":
                    done = False
                    if self._player is not None:
                        await self._player.sendJson({
                            "type": "command",
                            "data": jdata["data"]
                        })
                    await self._response.send_json({
                        "type": "command",
                        "data": done
                    })

            elif message.type == aiohttp.WSMsgType.ERROR:
                print('ws connection closed with exception %s' %
                      self._response.exception())
        Connection._connections.remove(self)
        await Connection.broadcastConnections()

    @property
    def userAgent(self) -> str:
        return self._request.headers.get("User-Agent")

    @property
    def device(self) -> str:
        return self.userAgent.split("(")[1].split(";")[0]

    @property
    def friendlyName(self) -> str:
        return Connection._deviceLookup.get(self.device, "Unknown")

    @property
    def id(self) -> str:
        return self._id

    @property
    def type(self) -> ConnectionType:
        return self._type

    def toDict(self) -> dict:
        return {
            "id": self._id,
            "type": self._type.name,
            "friendlyName": self.friendlyName
        }

    def __eq__(self, other: object) -> bool:
        if isinstance(other, Connection):
            return self._id == other._id
        return False

    async def send(self, message: str) -> None:
        await self._response.send_str(message)

    async def sendJson(self, message: dict) -> None:
        await self._response.send_json(message)


async def websocket_handler(request):
    ws = web.WebSocketResponse()
    await ws.prepare(request)

    connection = Connection(request, ws)
    await connection.handle()
    return ws

app = web.Application()
app.router.add_static('/ui', 'ui', name = 'static')
app.add_routes([web.get('/ws', websocket_handler)])

web.run_app(app, port = 8080)
