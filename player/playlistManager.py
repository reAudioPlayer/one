from typing import Callable, Optional
from dataModels.playlist import Playlist
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
        self._playlists.update(set(map(lambda x: PlayerPlaylist(self._dbManager, x.id), playlists)))

    def addToPlaylist(self, playlistIndex: int, song: Song) -> None:
        if len(self._dbManager.getSongByCustomFilter(f"source='{song.source}'")) == 0:
            self._playlists[playlistIndex].add(song)

    def get(self, playlistIndex) -> PlayerPlaylist:
        return self._playlists[playlistIndex]

    def updateSong(self, id: int, updateFunction: Callable[[Song], Song]) -> None:
        for playlist in self._playlists:
            songs = playlist.byId(id)
            for song in songs:
                song.update(updateFunction(song))

    def updatePlaylist(self, id: int, name: str, description: str) -> None:
        playlist: PlayerPlaylist = self._playlists[id]
        playlist.name = name
        playlist.description = description
        self._dbManager.updatePlaylist(playlist.ToDMPlaylist())

    @property
    def playlistLength(self) -> int:
        return len(self._playlists)

    def addPlaylist(self, name: Optional[str] = None) -> int:
        plId = self.playlistLength
        name = name or f"My Playlist #{plId + 1}"
        self._dbManager.addPlaylist(Playlist(name, [], plId, ""))
        self._loadPlaylists()
        return plId
