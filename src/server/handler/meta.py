# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = "Copyright (c) 2022 https://github.com/reAudioPlayer"

from typing import Any, Dict, List, Optional

from aiohttp import web
from pyaddict import JDict
from pyaddict.schema import Object, String, Integer, Array, Boolean

from db.dbManager import DbManager
from helper.asyncThread import asyncRunInThreadWithReturn
from helper.cacheDecorator import useCache
from helper.payloadParser import withObjectPayload
from meta.metadata import Metadata
from meta.releases import Releases
from meta.search import Search
from meta.spotify import Spotify, SpotifyResult, SpotifyTrack
from dataModel.track import SpotifyPlaylist
from dataModel.metadata import SongMetadata, SpotifyMetadata
from config.runtime import Runtime
from config.customData import LocalTrack, LocalCover


class MetaHandler:
    """handler for different 'meta' features (e.g. metadata, spotify, search)"""
    def __init__(self, dbManager: DbManager, spotify: Spotify) -> None:
        self._spotify = spotify
        self._dbManager = dbManager

    @withObjectPayload(Object({
        "url": String().url()
    }), inBody = True)
    async def getMetadata(self, payload: Dict[str, Any]) -> web.Response:
        """post(/api/browse/track)"""
        metadata = await asyncRunInThreadWithReturn(Metadata, self._spotify, payload["url"])
        if not metadata:
            return web.HTTPNotFound(text = "no metadata found")
        return web.json_response(data = metadata.toDict())

    @withObjectPayload(Object({
        "id": Integer().coerce()
    }), inPath = True)
    async def getTrack(self, payload: Dict[str, Any]) -> web.Response:
        """post(/api/tracks/{id})"""
        id_: int = payload["id"]
        try:
            song = self._dbManager.getSongById(id_)
            return web.json_response(song.toDict())
        except IndexError:
            return web.Response(status = 404)

    @withObjectPayload(Object({
        "query": String().min(1)
    }), inBody = True)
    async def search(self, payload: Dict[str, Any]) -> web.Response:
        """post(/api/search)"""
        query: str = payload["query"]
        search = await asyncRunInThreadWithReturn(Search,
                                                  Search.searchTracks(self._dbManager,
                                                                      query),
                                                  self._spotify,
                                                  query)
        return web.json_response(data = search.toDict())

    @withObjectPayload(Object({
        "id": String().min(22).max(22)
    }), inPath = True)
    async def spotifyAlbum(self, payload: Dict[str, Any]) -> web.Response:
        """post(/api/spotify/albums/{id})"""
        id_: str = payload["id"]
        def _implement() -> SpotifyResult[List[ Dict[str, Any] ]]:
            result = self._spotify.albumTracks(id_)
            if not result:
                return result.transform([ ])

            tracks = result.unwrap()
            metadatas = [ Metadata(self._spotify, track.url) for track in tracks ]
            return result.transform([ metadata.toDict() for metadata in metadatas ])

        data = await asyncRunInThreadWithReturn(_implement)

        if not data:
            return data.httpResponse()

        return web.json_response(data = data.unwrap())

    @useCache(900) # type: ignore
    async def spotifyPlaylists(self, _: web.Request) -> web.Response:
        """get(/api/spotify/playlists)"""
        def _implement() -> SpotifyResult[List[SpotifyPlaylist]]:
            result = self._spotify.userPlaylists()
            if not result:
                return result.transform([ ])

            return result
        data = await asyncRunInThreadWithReturn(_implement)

        if not data:
            return data.httpResponse()

        return web.json_response(data = [ pl.toDict() for pl in data.unwrap() ])

    @withObjectPayload(Object({
        "id": String().min(22).max(22)
    }), inPath = True)
    async def spotifyPlaylist(self, payload: Dict[str, Any]) -> web.Response:
        """post(/api/spotify/playlists/{id})"""
        id_: str = payload["id"]
        def _implement() -> SpotifyResult[List[Dict[str, Any]]]:
            result = self._spotify.playlistTracks(id_)
            if not result:
                return result.transform([ ])

            tracks = result.unwrap()
            metadatas = [ Metadata(self._spotify, track.url) for track in tracks ]
            return result.transform([ metadata.toDict() for metadata in metadatas ])
        data = await asyncRunInThreadWithReturn(_implement)

        if not data:
            return data.httpResponse()

        return web.json_response(data = data.unwrap())

    @useCache(1800) # type: ignore
    async def releases(self, _: web.Request) -> web.Response:
        """get(/api/releases)"""
        data = await asyncRunInThreadWithReturn(Releases, self._spotify)
        return web.json_response(data = data.toDict())

    @useCache(900) # type: ignore
    async def spotifyArtists(self, _: web.Request) -> web.Response:
        """get(/api/spotify/artists)"""
        def _implement() -> SpotifyResult[List[Dict[str, Any]]]:
            result = self._spotify.allUserArtists()
            if not result:
                return result.transform([ ])

            return result.transform([ artist.toDict() for artist in result.unwrap() ])
        data = await asyncRunInThreadWithReturn(_implement)

        if not data:
            return data.httpResponse()

        return web.json_response(data = data.unwrap())

    @withObjectPayload(Object({
        "id": String().min(22).max(22)
    }), inPath = True)
    async def spotifyArtist(self, payload: Dict[str, Any]) -> web.Response:
        """post(/api/spotify/artists/{id})"""
        id_: str = payload["id"]

        def _implement() -> SpotifyResult[List[Dict[str, Any]]]:
            result = self._spotify.artistTracks(id_)
            if not result:
                return result.transform([ ])

            tracks = result.unwrap()
            metadatas = [ Metadata(self._spotify, track.url) for track in tracks ]
            return result.transform([ metadata.toDict() for metadata in metadatas ])
        data = await asyncRunInThreadWithReturn(_implement)

        if not data:
            return data.httpResponse()

        return web.json_response(data = data.unwrap())

    async def spotifyFollow(self, request: web.Request) -> web.Response:
        """post(/api/spotify/following)"""
        jdata = await request.json()
        self._spotify.follow(jdata.get("artistId"))
        return web.json_response(status=200)

    async def spotifyUnfollow(self, request: web.Request) -> web.Response:
        """delete(/api/spotify/following)"""
        jdata = await request.json()
        self._spotify.unfollow(jdata.get("artistId"))
        return web.json_response(status=200)

    async def upload(self, request: web.Request) -> web.Response:
        """post(/api/config/images)"""
        if not Runtime.args.withDocker:
            return web.HTTPExpectationFailed(text = "must run in docker")

        async for obj in (await request.multipart()):
            if obj.filename:
                file = LocalCover.createNew(obj.filename)
                file.write(await obj.read())
                return web.Response(text = file.displayPath)
        return web.Response(status = 400)

    async def uploadSong(self, request: web.Request) -> web.Response:
        """post(/api/config/tracks)"""
        if not Runtime.args.withDocker:
            return web.HTTPExpectationFailed(text = "must run in docker")

        async for obj in (await request.multipart()):
            if obj.filename:
                file = LocalTrack.createNew(obj.filename)
                file.write(await obj.read())
                return web.Response(text = file.displayPath)
        return web.Response(status = 400)

    @withObjectPayload(Object({
        "id": Integer().min(1),
        "forceFetch": Boolean().optional(),
        "spotifyId": String().optional().min(22).max(22)
    }), inBody = True)
    async def fetchSongMeta(self, payload: Dict[str, Any]) -> web.Response:
        """post(/api/spotify/meta)"""
        id_ = payload["id"]
        forceFetch = payload.get("forceFetch", False)
        spotifyId: Optional[str] = payload.get("spotifyId", None)
        song = self._dbManager.getSongById(id_)

        if not song:
            return web.HTTPNotFound(text = "song not found")

        if not forceFetch:
            if song.metadata:
                return web.json_response(song.metadata.toDict())

        onSpotify: Optional[str] = None
        spotifySong: Optional[SpotifyTrack] = None

        if song.metadata and song.metadata.spotify:
            onSpotify = song.metadata.spotify.id

        if spotifyId:
            onSpotify = spotifyId

        if onSpotify and (spotifyId or forceFetch):
            trackResult = self._spotify.track(onSpotify)
            if not trackResult:
                return trackResult.httpResponse()
            spotifySong = trackResult.unwrap()

        if not onSpotify:
            query = f"{song.artist} {song.title}"
            searchResult = await self._searchOnSpotify(query, 1)
            if not searchResult:
                return searchResult.httpResponse()
            spotifySong = searchResult.unwrap()[0]
            onSpotify = spotifySong.id

        if not onSpotify:
            return web.HTTPNotFound(text = "metadata not found")

        metadata = SongMetadata(id_)
        metadata.spotify = SpotifyMetadata(onSpotify) # type: ignore

        spotifyFeatures = self._spotify.audioFeatures(onSpotify)

        if not spotifyFeatures:
            return spotifyFeatures.httpResponse()

        metadata.spotify.update(
            features = spotifyFeatures.unwrap()
        )

        if spotifySong:
            metadata.spotify.update(
                album = spotifySong.albumItem,
                artists = spotifySong.artistItems,
                explicit = spotifySong.explicit,
                popularity = spotifySong.popularity,
                releaseDate = spotifySong.releaseDate,
            )

        self._dbManager.updateMeta(metadata)
        return web.json_response(metadata.toDict())

    async def _searchOnSpotify(self, query: str, limit: int) -> SpotifyResult[List[SpotifyTrack]]:
        def _implement() -> SpotifyResult[List[SpotifyTrack]]:
            return self._spotify.searchTrack(query, limit)
        return await asyncRunInThreadWithReturn(_implement)

    @withObjectPayload(Object({
        "id": Integer().min(1).coerce()
    }), inPath = True)
    async def spotifyRecommendSong(self, payload: Dict[str, Any]) -> web.Response:
        """post(/api/spotify/recommendations/{id})"""
        id_: int = payload["id"]
        song = self._dbManager.getSongById(id_)
        if not song:
            return web.HTTPNotFound(text = "song not found")
        if not song.metadata:
            return web.HTTPNotFound(text = "metadata not found")
        if not song.metadata.spotify:
            return web.HTTPNotFound(text = "spotify metadata not found")
        if not song.metadata.spotify.id:
            return web.HTTPNotFound(text = "spotify id not found")

        result = self._spotify.recommendations(
            [ artist.id for artist in song.metadata.spotify.artists or [] ],
            [ song.metadata.spotify.id ],
            []
        )
        if not result:
            return result.httpResponse()
        tracks = result.unwrap()
        return web.json_response([ track.toDict() for track in tracks ])

    @withObjectPayload(Object({
        "query": String().min(1).optional(),
        "artists": Array(String().min(22).max(22)).optional(),
        "tracks": Array(String().min(22).max(22)).optional(),
        "genres": Array(String().min(1)).optional()
    }), inBody = True)
    async def spotifyRecommend(self, payload: Dict[str, Any]) -> web.Response:
        """post(/api/spotify/recommendations)"""
        def _implement() -> SpotifyResult[List[Dict[str, Any]]]:
            dex = JDict(payload)
            query = dex.optionalGet("query", str)

            artists = dex.ensure("artists", list)
            tracks = dex.ensure("tracks", list)
            genres = dex.ensure("genres", list)

            if query: # find track first
                result = self._spotify.searchTrack(query)
                if result:
                    queryTracks = result.unwrap()
                    if len(queryTracks) > 0:
                        tracks.append(queryTracks[0].id)

            result = self._spotify.recommendations(artists, tracks, genres)

            if not result:
                return result.transform([ ])

            return result.transform([ track.toDict() for track in result.unwrap() ])
        data = await asyncRunInThreadWithReturn(_implement)

        if not data:
            return data.httpResponse()

        return web.json_response(data = data.unwrap())
