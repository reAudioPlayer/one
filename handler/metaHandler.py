import asyncio
from typing import Optional
from aiohttp import web
from spotipy import Spotify
from meta.metadata import Metadata
from meta.releases import Releases
from meta.search import Search

from dataModels.track import SpotifyPlaylist, SpotifyTrack


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

    async def spotifyAlbum(self, request: web.Request):
        jdata = await request.json()
        tracks = SpotifyTrack.FromAlbum(self._spotify, jdata["albumId"])
        metadatas = [ Metadata(self._spotify, track.url) for track in tracks ]
        return web.json_response(data = [ metadata.toDict() for metadata in metadatas ])

    async def spotifyPlaylists(self, _: web.Request):
        playlists = self._spotify.current_user_playlists()["items"]
        return web.json_response(data = [ SpotifyPlaylist(playlist).toDict() for playlist in playlists ])

    async def spotifyPlaylist(self, request: web.Request):
        jdata = await request.json()
        tracks = SpotifyTrack.FromPlaylist(self._spotify, jdata["playlistId"])
        metadatas = [ Metadata(self._spotify, track.url) for track in tracks ]
        return web.json_response(data = [ metadata.toDict() for metadata in metadatas ])

    async def releases(self, _: web.Request):
        if not self._releaseCache:
            self._releaseCache = Releases(self._spotify)

            async def invalidateCache() -> None:
                await asyncio.sleep(3600) # 1h
                self._releaseCache = None

            asyncio.create_task(invalidateCache())

        return web.json_response(data = self._releaseCache.toDict())
