from aiohttp import web
from player.playlistManager import PlaylistManager

class PlaylistHandler:
    def __init__(self, playlistManager: PlaylistManager) -> None:
        self._playlistManager = playlistManager

    async def addSong(self, request: web.Request):
        text = await request.text()
        print(text)
        self._playlistManager.addToPlaylist(0, text)
        return web.Response(status = 200, text = "success!")
