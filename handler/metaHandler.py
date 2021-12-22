from aiohttp import web
from spotipy import Spotify
from metadata.metadata import Metadata

class MetaHandler:
    def __init__(self, spotify: Spotify) -> None:
        self._spotify = spotify

    async def get(self, request: web.Request):
        jdata = await request.json()
        metadata = Metadata(self._spotify, jdata["url"])
        return web.json_response(data = metadata.toDict())
