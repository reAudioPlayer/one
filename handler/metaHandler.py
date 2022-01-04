import asyncio
from typing import Optional
from aiohttp import web
from spotipy import Spotify
from meta.metadata import Metadata
from meta.releases import Releases
from meta.search import Search

class MetaHandler:
    def __init__(self, spotify: Spotify) -> None:
        self._spotify = spotify
        self._releaseCache: Optional[Releases] = None

    async def get(self, request: web.Request):
        jdata = await request.json()
        metadata = Metadata(self._spotify, jdata["url"])
        return web.json_response(data = metadata.toDict())

    async def search(self, request: web.Request):
        jdata = await request.json()
        search = Search(self._spotify, jdata["query"])
        return web.json_response(data = search.toDict())

    async def releases(self, _: web.Request):
        if not self._releaseCache:
            self._releaseCache = Releases(self._spotify)

            async def invalidateCache() -> None:
                await asyncio.sleep(3600) # 1h
                self._releaseCache = None

        return web.json_response(data = self._releaseCache.toDict())
