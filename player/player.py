from typing import Optional
import pygame
from pymitter import EventEmitter
from dataModels.song import Song
from db.dbManager import DbManager
from player.playerPlaylist import PlayerPlaylist
import os
from downloader.downloader import Downloader


class Player:
    def __init__(self, ee: EventEmitter, dbManager: DbManager, downloader: Downloader) -> None:
        pygame.init()
        pygame.mixer.init()
        self._dbManager = dbManager
        self._playing: bool = False
        self._ee = ee
        self._downloader = downloader
        self._playerPlaylist: Optional[PlayerPlaylist] = None
        self._songLength: float = -1
        self._preloaded: Optional[str] = None

    def loadPlaylist(self, playlist: PlayerPlaylist) -> None:
        self._playerPlaylist = playlist
        self.next()

    def playPause(self) -> None:
        if self._playing:
            pygame.mixer.music.pause()
        else:
            pygame.mixer.music.unpause()
        self._playing = not self._playing

    def pause(self) -> None:
        self._playing = False
        pygame.mixer.music.pause()

    def play(self) -> None:
        self._playing = True
        pygame.mixer.music.unpause()

    def unload(self) -> None:
        pygame.mixer.music.unload()
        if os.path.exists("./_cache/upNow.mp3"):
            os.remove("./_cache/upNow.mp3")

    def last(self) -> None:
        self.unload()
        self._preloadSong(self._playerPlaylist.last(True))
        self._loadSong(self._playerPlaylist.last())

    def next(self) -> None:
        self.unload()
        self._preloadSong(self._playerPlaylist.next(True))
        self._loadSong(self._playerPlaylist.next())

    def at(self, index: int) -> None:
        self.unload()
        self._preloadSong(self._playerPlaylist.at(index))
        self._loadSong(self._playerPlaylist.at(index))

    def _preloadSong(self, song: Song) -> None:
        self._preloaded = song.source
        self._downloader.downloadSong(song.source)

    def _loadSong(self, song: Song) -> None:
        if self._preloaded == song.source:
            pygame.mixer.music.load(f"./_cache/upNow.mp3")
            sound = pygame.mixer.Sound(f"./_cache/upNow.mp3")
            self._songLength = sound.get_length()
            song.duration = int(self._songLength)
            self._dbManager.updateSongMetadata(song.id, f"duration='{int(self._songLength)}'")
            pygame.mixer.music.play()
            self._playing = True
