from aiohttp import web
from dataModels.song import Song
from player.playlistManager import PlaylistManager

class PlaylistHandler:
    def __init__(self, playlistManager: PlaylistManager) -> None:
        self._playlistManager = playlistManager

    async def addSong(self, request: web.Request):
        jdata = await request.json()
        self._playlistManager.addToPlaylist(jdata["id"], Song.FromDict(jdata))
        return web.Response(status = 200, text = "success!")

    async def getPlaylist(self, request: web.Request):
        jdata = await request.json()
        return web.json_response(self._playlistManager.get(jdata["id"]).toDict())

    async def getPlaylists(self, _: web.Request):
        return web.json_response(list(map(lambda x: x.name, self._playlistManager._playlists)))
