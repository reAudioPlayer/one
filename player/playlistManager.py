from dataModels.song import Song
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

    def addToPlaylist(self, playlistIndex: int, song: Song) -> None:
        if len(self._dbManager.getSongByCustomFilter(f"source='{song.source}'")) == 0:
            self._playlists[playlistIndex].add(song)

    def get(self, playlistIndex) -> PlayerPlaylist:
        return self._playlists[playlistIndex]
