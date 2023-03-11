# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
from __future__ import annotations
__copyright__ = "Copyright (c) 2023 https://github.com/reAudioPlayer"

from typing import List, Optional, Dict, Any
from enum import Enum
import time

from aiohttp import web
import aiohttp
import hashids # type: ignore

from helper.logged import Logged


class ConnectionType(Enum):
    """The type of connection"""
    Client = 0
    Player = 1


class Connection(Logged):
    """A websocket connection"""
    __slots__ = ("_request", "_response", "_type", "_id", "_player")

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
        super().__init__(self.__class__.__name__)
        self._request = request
        self._response = response
        self._type = ConnectionType.Player
        self._id: str = Connection._hashids.encode(int(time.time()))
        self._logger.debug("New connection: %s", self._id)
        self._player: Optional[Connection] = None

    @classmethod
    async def broadcast(cls, message: str) -> None:
        """Broadcast a message to all connections"""
        for connection in cls._connections:
            await connection.send(message)

    @classmethod
    async def broadcastJson(cls, message: Dict[str, Any]) -> None:
        """Broadcast a json message to all connections"""
        for connection in cls._connections:
            await connection.sendJson(message)

    @classmethod
    async def broadcastConnections(cls) -> None:
        """Broadcast the current connections to all connections"""
        for connection in cls._connections:
            await connection.sendConnections()

    async def sendConnections(self) -> None:
        """Send the current connections to this connection"""
        connections = []
        for connection in Connection._connections:
            connections.append(connection.toDict(self))
        await self.sendJson({
            "type": "connections",
            "data": connections
        })

    async def _handleCommand(self, data: Dict[str, Any]) -> None:
        async def _handle() -> bool:
            if not self._type == ConnectionType.Client:
                return False
            if self._player is None:
                return False
            await self._player.sendJson({
                "type": "command",
                "data": data
            })
            return True

        await self._response.send_json({
            "type": "command",
            "data": await _handle()
        })

    async def _handleInfo(self, data: Dict[str, Any]) -> None:
        async def _handle() -> bool:
            if not self._type == ConnectionType.Player:
                return False
            for connection in Connection._connections:
                if connection.type != ConnectionType.Client:
                    continue
                if connection.player != self:
                    continue
                await connection.sendJson({
                    "type": "info",
                    "data": data
                })
            return True

        await self._response.send_json({
            "type": "info",
            "data": await _handle()
        })

    async def _handleSetPlayer(self, id_: str) -> None:
        async def _handle() -> bool:
            if not self._type == ConnectionType.Client:
                self._type = ConnectionType.Player
            if self._player is not None:
                return False
            for connection in Connection._connections:
                if id_ == connection.id and connection.type == ConnectionType.Player:
                    self._player = connection
                    self._type = ConnectionType.Client
                    await connection.sendJson({
                        "type": "new client",
                        "data": self.toDict()
                    })
                    await Connection.broadcastConnections()
                    return True
            return False

        await self._response.send_json({
            "type": "set player",
            "data": await _handle()
        })

    async def _handleSetType(self, type_: str) -> None:
        async def _handle() -> bool:
            if type_ != "Player":
                return False
            self._type = ConnectionType.Player
            await Connection.broadcastConnections()
            return True

        await self._response.send_json({
            "type": "type",
            "data": await _handle()
        })

    async def _handleDisconnect(self) -> None:
        if self._type == ConnectionType.Client:
            if self._player is not None:
                await self._player.sendJson({
                    "type": "client disconnect",
                    "data": self.toDict()
                })
        elif self._type == ConnectionType.Player:
            for connection in Connection._connections:
                if connection == self:
                    continue
                if connection.type != ConnectionType.Client:
                    continue
                if connection.player != self:
                    continue
                connection.removePlayer()
                await connection.sendJson({
                    "type": "player disconnect",
                    "data": self.toDict()
                })

        Connection._connections.remove(self)
        await Connection.broadcastConnections()

    async def _handle(self) -> None:
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
                    await self._handleSetPlayer(jdata["data"])
                elif jdata["type"] == "command":
                    await self._handleCommand(jdata["data"])
                elif jdata["type"] == "info":
                    await self._handleInfo(jdata["data"])

            elif message.type == aiohttp.WSMsgType.ERROR:
                self._logger.error("Connection error: %s", self._response.exception())
        await self._handleDisconnect()

    def removePlayer(self) -> None:
        """Remove the player from this connection"""
        self._player = None
        self._type = ConnectionType.Player

    @property
    def player(self) -> Optional[Connection]:
        """The player"""
        return self._player

    @property
    def userAgent(self) -> str:
        """The user agent"""
        return self._request.headers.get("User-Agent", "Unknown")

    @property
    def device(self) -> str:
        """The device"""
        return self.userAgent.split("(")[1].split(";")[0]

    @property
    def friendlyName(self) -> str:
        """The friendly name"""
        return Connection._deviceLookup.get(self.device, "Unknown")

    @property
    def id(self) -> str:
        """The id"""
        return self._id

    @property
    def type(self) -> ConnectionType:
        """The type"""
        return self._type

    def toDict(self, me: Optional[Connection] = None) -> Dict[str, Any]: # pylint: disable=invalid-name
        """Convert this connection to a dict"""
        data = {
            "id": self._id,
            "type": self._type.name,
            "friendlyName": self.friendlyName
        }
        if me is not None and me.id == self.id:
            data["friendlyName"] += " (You)"
        return data

    def __eq__(self, other: object) -> bool:
        if isinstance(other, Connection):
            return bool(self._id == other._id)
        return False

    async def send(self, message: str) -> None:
        """Send a message"""
        try:
            await self._response.send_str(message)
        except ConnectionResetError:
            #await self._handleDisconnect()
            Connection._connections.remove(self)

    async def sendJson(self, message: Dict[str, Any]) -> None:
        """Send a json message"""
        try:
            await self._response.send_json(message)
        except ConnectionResetError:
            #await self._handleDisconnect()
            Connection._connections.remove(self)

    @classmethod
    async def websocketEndpoint(cls, request: web.Request) -> web.WebSocketResponse:
        """The websocket endpoint"""
        ws = web.WebSocketResponse(heartbeat = 10)
        await ws.prepare(request)

        connection = cls(request, ws)
        await connection._handle()
        return ws
