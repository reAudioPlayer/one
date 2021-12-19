from db.dbManager import DbManager
from player.playerPlaylist import PlayerPlaylist
from ordered_set import OrderedSet


class PlaylistManager:
    def __init__(self, dbManager: DbManager) -> None:
        self._dbManager = dbManager
        self._playlists: OrderedSet[PlayerPlaylist] = OrderedSet()
        self._loadPlaylists()

    def _loadPlaylists(self) -> None:
        playlists = self._dbManager.getPlaylists()
        self._playlists.update(map(lambda x: PlayerPlaylist(self._dbManager, x.id), playlists))

    def addToPlaylist(self, playlistIndex: int, link: str) -> None:
        if len(self._dbManager.getSongByCustomFilter(f"source='{link}'")) == 0:
            self._playlists[playlistIndex].add(link)

    def get(self, playlistIndex) -> PlayerPlaylist:
        return self._playlists[playlistIndex]
