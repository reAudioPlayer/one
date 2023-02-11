# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = "Copyright (c) 2022 https://github.com/reAudioPlayer"

import logging
import os
from aiohttp import web

from config.runtime import Runtime

from handler.download import DownloadHandler
from handler.meta import MetaHandler
from handler.player import PlayerHandler
from handler.collection import CollectionHandler
from handler.config import ConfigHandler
from handler.news import NewsHandler
from handler.playlist import PlaylistHandler
from handler.sports import SportsHandler
from handler.websocket import Websocket
from handler.spotifyAuth import SpotifyAuth
from handler.sharedPlayer import Connection


class Router:
    """Router class"""
    @staticmethod
    async def _exitHandler(_: web.Request) -> web.Response:
        """force quits the application"""
        logger = logging.getLogger()
        logger.info("quitting")
        os._exit(0) # pylint: disable=protected-access

    @staticmethod
    def applyRoutes(app: web.Application, # pylint: disable=too-many-statements, too-many-arguments
                    playerHandler: PlayerHandler,
                    downloadHandler: DownloadHandler,
                    metaHandler: MetaHandler,
                    sportsHandler: SportsHandler,
                    collectionHandler: CollectionHandler,
                    newsHandler: NewsHandler,
                    playlistHandler: PlaylistHandler,
                    configHandler: ConfigHandler,
                    websocket: Websocket,
                    spotify: SpotifyAuth) -> None:
        """Apply routes to the app"""
        # /api/player/
        app.router.add_get('/api/player/previous', playerHandler.getPrevious)
        app.router.add_get('/api/player/next', playerHandler.getNext)

        app.router.add_post('/api/player/at', playerHandler.loadSongAt)

        app.router.add_post('/api/player/load', playerHandler.loadPlaylist)

        app.router.add_post('/api/player/shuffle', playerHandler.postShuffle)
        app.router.add_get('/api/player/shuffle', playerHandler.getShuffle)

        app.router.add_get('/api/player/stream', downloadHandler.stream)
        app.router.add_get('/api/player/stream/{id}', downloadHandler.streamFromCache)

        # UNGROUPED
        app.router.add_post('/api/browse/track', metaHandler.getMetadata)

        app.router.add_post('/api/search', metaHandler.search)

        app.router.add_get('/api/releases', metaHandler.releases)

        app.router.add_post('/api/sports', sportsHandler.getMatches)

        # /api/spotify/
        app.router.add_get('/api/spotify/albums/{id}', metaHandler.spotifyAlbum)
        app.router.add_get('/api/spotify/artists/{id}', metaHandler.spotifyArtist)
        app.router.add_get('/api/spotify/artists', metaHandler.spotifyArtists)
        app.router.add_get('/api/spotify/playlists/{id}', metaHandler.spotifyPlaylist)
        app.router.add_get('/api/spotify/playlists', metaHandler.spotifyPlaylists)
        app.router.add_post('/api/spotify/following', metaHandler.spotifyFollow)
        app.router.add_delete('/api/spotify/following', metaHandler.spotifyUnfollow)
        app.router.add_post("/api/spotify/meta", metaHandler.fetchSongMeta)
        app.router.add_post('/api/spotify/recommendations', metaHandler.spotifyRecommend)
        app.router.add_get('/api/spotify/recommendations/{id}', metaHandler.spotifyRecommendSong)
        app.router.add_get('/api/spotify/callback', spotify.callbackHandler)
        app.router.add_get('/api/spotify/authorise', spotify.clientSideAuthHandler)

        # /api/me/
        app.router.add_get('/api/me/liked', collectionHandler.tracks)
        app.router.add_get('/api/me/new', collectionHandler.breaking)

        # /api/me/player
        app.router.add_get('/api/me/player/current-track', playerHandler.getCurrentTrack)
        app.router.add_get('/api/me/player/current-playlist', playerHandler.getCurrentPlaylist)

        # /api/news/articles/
        app.router.add_get('/api/news/articles', newsHandler.getSomeNews)
        app.router.add_post('/api/news/articles', newsHandler.registerArticle)
        app.router.add_get('/api/news/articles/{hash}', newsHandler.getArticle)

        # /api/tracks
        app.router.add_get('/api/tracks/{id}', metaHandler.getTrack)
        app.router.add_put('/api/tracks/{id}', playerHandler.updateSong)
        app.router.add_get('/api/tracks/{id}/download', downloadHandler.downloadTrack)

        # /api/playlists/
        app.router.add_get('/api/playlists/new', playlistHandler.createPlaylist)
        app.router.add_get('/api/playlists', playlistHandler.getPlaylists)

        app.router.add_get('/api/playlists/{id}', playlistHandler.getPlaylist)
        app.router.add_delete('/api/playlists/{id}', playlistHandler.deletePlaylist)
        app.router.add_post('/api/playlists/{id}', playlistHandler.updatePlaylist)

        app.router.add_post('/api/playlists/{id}/tracks', playlistHandler.addSong)
        app.router.add_put('/api/playlists/{id}/tracks', playlistHandler.moveSong)
        app.router.add_delete('/api/playlists/{id}/tracks', playlistHandler.removeSong)

        # /api/config
        app.router.add_get('/api/config/first-time', configHandler.firstTime)
        app.router.add_put('/api/config', configHandler.updateConfig)
        app.router.add_get('/api/config', configHandler.getConfig)

        app.router.add_post('/api/config/images', metaHandler.upload)
        app.router.add_get('/api/config/images', configHandler.getLocalImages)
        app.router.add_delete('/api/config/images', configHandler.deleteLocalImage)
        app.router.add_post('/api/config/tracks', metaHandler.uploadSong)
        app.router.add_get('/api/config/tracks', configHandler.getLocalTracks)
        app.router.add_delete('/api/config/tracks', configHandler.deleteLocalTrack)

        app.router.add_post('/api/config/spotify', configHandler.spotifyConfig)
        app.router.add_get('/api/config/spotify', spotify.getSpotifyConfig)

        # /api/system
        app.router.add_get('/api/system/kill', Router._exitHandler)

        app.router.add_get("/player/ws", Connection.websocketEndpoint)
        app.router.add_get('/ws', websocket.wsHandler)

        if not Runtime.args.apiOnly and not Runtime.args.withDocker:
            app.router.add_static('/', '../ui/dist')
