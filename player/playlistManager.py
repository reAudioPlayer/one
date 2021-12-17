from typing import List
from pymitter import EventEmitter
from db.dbManager import DbManager


class PlaylistManager:
    def __init__(self, dbManager: DbManager) -> None:
        self._dbManager = dbManager
        self._playlists: List[str] = [ ]
