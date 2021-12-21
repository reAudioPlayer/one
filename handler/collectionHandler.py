from aiohttp import web
from dataModels.song import Song
from db.dbManager import DbManager
from player.playerPlaylist import PlayerPlaylist

class CollectionHandler:
    def __init__(self, dbManager: DbManager) -> None:
        self._dbManager = dbManager

    async def tracks(self, request: web.Request):
        tracks = PlayerPlaylist(self._dbManager, songs = self._dbManager.getSongByCustomFilter("favourite=1"), name = "Liked Songs")
        return web.json_response(data = tracks.toDict())
