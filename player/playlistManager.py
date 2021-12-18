from db.dbManager import DbManager
from player.playerPlaylist import PlayerPlaylist
from ordered_set import OrderedSet


class PlaylistManager:
    def __init__(self, dbManager: DbManager) -> None:
        self._dbManager = dbManager
        self._playlists: OrderedSet[PlayerPlaylist] = OrderedSet()
        self._loadPlaylists()

    def _loadPlaylists(self) -> None: # TODO implement, read from db
        self._playlists.add(PlayerPlaylist(self._dbManager, 0))

    def addToPlaylist(self, playlistIndex: int, link: str) -> None:
        self._playlists[playlistIndex].add(link)

    def get(self, playlistIndex) -> PlayerPlaylist:
        return self._playlists[playlistIndex]
