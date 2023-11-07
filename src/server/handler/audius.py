# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
from __future__ import annotations

__copyright__ = "Copyright (c) 2023 https://github.com/reAudioPlayer"

import os
from typing import Dict, List, Optional, Any
import asyncio
import json
import random
from dataclasses import dataclass

import aiohttp
from aiohttp import web
from pyaddict import JDict, JList
from pyaddict.schema import Object, String
from hashids import Hashids

from dataModel.track import ITrack, BasicSpotifyItem
from helper.logged import Logged
from helper.payloadParser import withObjectPayload
from helper.singleton import Singleton

HASH_SALT = "azowernasdfoia"
MIN_LENGTH = 5

hashids = Hashids(HASH_SALT, MIN_LENGTH)
CACHE_FILE = "audius.cache"


@dataclass
class AudiusUser:
    """Audius User"""

    userId: str
    email: str
    name: str
    handle: str
    verified: bool
    profilePicture: Optional[Dict[str, str]]
    sub: int
    iat: str

    @property
    def id(self) -> int:
        """returns the id"""
        (userId,) = hashids.decode(self.userId)
        return userId

    @classmethod
    def fromDict(cls, data: Dict[str, str]) -> AudiusUser:
        """sets the data from the cache"""
        return cls(
            data["userId"],
            data["email"],
            data["name"],
            data["handle"],
            data["verified"],
            data["profilePicture"],
            data["sub"],
            data["iat"],
        )

    @classmethod
    def fromCache(cls) -> Optional[AudiusUser]:
        """sets the data from the cache"""
        if not os.path.exists(CACHE_FILE):
            return None
        with open(CACHE_FILE, "r", encoding="utf8") as file:
            data = json.loads(file.read())
            return cls.fromDict(data)

    def cache(self) -> None:
        """caches the data"""
        with open(CACHE_FILE, "w", encoding="utf8") as file:
            file.write(json.dumps(self.__dict__))


class AudiusTrack(ITrack):
    def __init__(self, track: Dict[str, Any]) -> None:
        dex = JDict(track).chain()
        self._title = dex.ensure("title", str)
        self._cover = dex.optionalGet("artwork?.1000x1000", str)
        self._releaseDate = dex.ensure("release_date", str)
        self._artists = [BasicSpotifyItem(dex.ensure("user.id", str), dex.ensure("user.name", str))]
        self._id = dex.ensure("id", str)
        self._explicit = dex.ensure("explicit", bool)
        self._url = dex.ensure("permalink", str)

    @property
    def title(self) -> str:
        return self._title

    @property
    def album(self) -> str:
        return ""

    @property
    def artist(self) -> str:
        return ", ".join(self.artists)

    @property
    def artists(self) -> List[str]:
        """returns the artists"""
        return [artist.name for artist in self._artists]

    @property
    def cover(self) -> Optional[str]:
        """returns the cover"""
        return self._cover

    @property
    def url(self) -> str:
        """returns the url"""
        return "https://audius.co/" + self._url


class Audius(metaclass=Singleton):
    """download handler"""

    def __init__(self) -> None:
        self._host: str = "https://discoveryprovider.audius.co/"
        self._user = AudiusUser.fromCache()
        self._logger = Logged.getLogger(self.__class__.__name__)
        asyncio.create_task(self._selectHost())

    async def _selectHost(self) -> None:
        """selects the host"""
        self._logger.debug("selecting host")
        async with aiohttp.ClientSession() as session:
            async with session.get("https://api.audius.co") as response:
                self._logger.debug("host response: %s", response.status)
                data = await response.json()
                hosts: List[str] = data["data"]
                self._host = random.choice(hosts)
                self._logger.debug("selected host: %s", self._host)

    def _endpoint(self, endpoint: str) -> str:
        """returns the endpoint"""
        return f"{self._host}{endpoint}"

    @withObjectPayload(Object({"token": String()}), inQuery=True)
    async def callbackHandler(self, payload: Dict[str, Any]) -> web.Response:
        """get(/api/audius/callback)"""
        # /api/audius/callback?token={JWT}
        jwt: str = payload["token"]

        async with aiohttp.ClientSession() as session:
            async with session.get(
                self._endpoint(f"/v1/users/verify_token?token={jwt}")
            ) as response:
                data = await response.json()
                self._logger.debug("callback response: %s", data)
                self._user = AudiusUser.fromDict(data["data"])
                self._user.cache()
                return web.Response()

    async def getFeed(self, _: web.Request) -> web.Response:
        """get(/api/audius/feed)"""
        # /feed?offset=0&limit=8&with_users=true&filter=all
        endpoint = self._endpoint("/feed?offset=0&limit=8&with_users=true&filter=all")
        async with aiohttp.ClientSession() as session:
            async with session.get(endpoint, headers={"X-User-Id": str(self._user.id)}) as response:
                data = await response.json()
                return web.json_response(data)

    async def search(self, query: str) -> List[AudiusTrack]:
        """get(/api/audius/search)"""
        # /v1/tracks/search
        endpoint = self._endpoint(f"/v1/tracks/search?query={query}")
        async with aiohttp.ClientSession() as session:
            async with session.get(endpoint) as response:
                self._logger.debug("search response: %s", response.status)
                data = await response.json()
                if not data["data"]:
                    self._logger.debug("no data found")
                    return []
                return [
                    AudiusTrack(track)
                    for track in JDict(data).ensureCast("data", JList).iterator().ensure(dict)
                ]
