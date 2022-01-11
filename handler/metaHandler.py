import asyncio
from typing import Dict, List, Optional
from aiohttp import web
from spotipy import Spotify
from helpers.asyncThread import asyncRunInThreadWithReturn
from meta.metadata import Metadata
from meta.releases import Releases
from meta.search import Search

from dataModels.track import SpotifyArtist, SpotifyPlaylist, SpotifyTrack


class MetaHandler:
    def __init__(self, spotify: Spotify) -> None:
        self._spotify = spotify
        self._releaseCache: Optional[Releases] = None

    async def get(self, request: web.Request):
        jdata = await request.json()
        metadata = await asyncRunInThreadWithReturn(Metadata, self._spotify, jdata["url"])
        return web.json_response(data = metadata.toDict())

    async def search(self, request: web.Request):
        jdata = await request.json()
        search = await asyncRunInThreadWithReturn(Search, self._spotify, jdata["query"])
        return web.json_response(data = search.toDict())

    async def spotifyAlbum(self, request: web.Request):
        jdata = await request.json()
        def _implement() -> List[Dict]:
            tracks = SpotifyTrack.FromAlbum(self._spotify, jdata["albumId"])
            metadatas = [ Metadata(self._spotify, track.url) for track in tracks ]
            return [ metadata.toDict() for metadata in metadatas ]
        data = await asyncRunInThreadWithReturn(_implement)
        return web.json_response(data = data)

    async def spotifyPlaylists(self, _: web.Request):
        def _implement() -> List[SpotifyPlaylist]:
            playlists = self._spotify.current_user_playlists()["items"]
            return [ SpotifyPlaylist(playlist).toDict() for playlist in playlists ]
        data = await asyncRunInThreadWithReturn(_implement)
        return web.json_response(data = data)

    async def spotifyPlaylist(self, request: web.Request):
        jdata = await request.json()
        def _implement() -> List[Dict]:
            tracks = SpotifyTrack.FromPlaylist(self._spotify, jdata["playlistId"])
            metadatas = [ Metadata(self._spotify, track.url) for track in tracks ]
            return [ metadata.toDict() for metadata in metadatas ]
        data = await asyncRunInThreadWithReturn(_implement)
        return web.json_response(data = data)

    async def releases(self, _: web.Request):
        if not self._releaseCache:
            self._releaseCache = await asyncRunInThreadWithReturn(Releases, self._spotify)

            async def invalidateCache() -> None:
                await asyncio.sleep(3600) # 1h
                self._releaseCache = None

            asyncio.create_task(invalidateCache())

        return web.json_response(data = self._releaseCache.toDict())

    async def spotifyArtists(self, _: web.Request):
        def _implement() -> List[Dict]:
            artists = Releases.followedArtists(self._spotify)
            return [ SpotifyArtist(artist).toDict() for artist in artists ]
        data = await asyncRunInThreadWithReturn(_implement)
        return web.json_response(data = data)

    async def spotifyArtist(self, request: web.Request):
        jdata = await request.json()
        def _implement() -> List[Dict]:
            tracks = SpotifyTrack.FromArtist(self._spotify, jdata["artistId"])
            metadatas = [ Metadata(self._spotify, track.url) for track in tracks ]
            return [ metadata.toDict() for metadata in metadatas ]
        data = await asyncRunInThreadWithReturn(_implement)
        return web.json_response(data = data)

    async def spotifyFollow(self, request: web.Request):
        jdata = await request.json()
        self._spotify.user_follow_artists([jdata.get("artistId")])
        return web.json_response(status=200)

    async def spotifyUnfollow(self, request: web.Request):
        jdata = await request.json()
        self._spotify.user_unfollow_artists([jdata.get("artistId")])
        return web.json_response(status=200)

    async def spotifyRecommend(self, request: web.Request):
        jdata = await request.json()
        def _implement() -> List[Dict]:
            tracks = SpotifyTrack.FromRecommendation(self._spotify, jdata.get("artists"), jdata.get("tracks"))
            metadatas = [ Metadata(self._spotify, track.url) for track in tracks ]
            return [ metadata.toDict() for metadata in metadatas ]
        data = await asyncRunInThreadWithReturn(_implement)
        return web.json_response(data = data)
