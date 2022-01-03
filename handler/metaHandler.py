from aiohttp import web
from spotipy import Spotify
from meta.metadata import Metadata
from meta.search import Search

class MetaHandler:
    def __init__(self, spotify: Spotify) -> None:
        self._spotify = spotify

    async def get(self, request: web.Request):
        jdata = await request.json()
        metadata = Metadata(self._spotify, jdata["url"])
        return web.json_response(data = metadata.toDict())

    async def search(self, request: web.Request):
        jdata = await request.json()
        search = Search(self._spotify, jdata["query"])
        return web.json_response(data = search.toDict())
