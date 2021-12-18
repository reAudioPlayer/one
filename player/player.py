from typing import Optional
import pygame
from pymitter import EventEmitter
from db.dbManager import DbManager
from downloader.downloader import Downloader
from player.playerPlaylist import PlayerPlaylist
import os


class Player:
    def __init__(self, ee: EventEmitter, dbManager: DbManager, downloader: Downloader) -> None:
        pygame.init()
        pygame.mixer.init()
        self._playing: bool = False
        self._ee = ee
        self._downloader = downloader
        self._playerPlaylist: Optional[PlayerPlaylist] = None
        self._songLength: float = -1
        self._preloaded: Optional[str] = None

    def loadPlaylist(self, playlist: PlayerPlaylist) -> None:
        self._playerPlaylist = playlist

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

    def _preloadSong(self, link: str) -> None:
        self._preloaded = link
        self._downloader.downloadSong(link)

    def _loadSong(self, link: str) -> None:
        print(link, self._preloaded)
        if self._preloaded == link:
            pygame.mixer.music.load(f"./_cache/upNow.mp3")
            sound = pygame.mixer.Sound(f"./_cache/upNow.mp3")
            self._songLength = sound.get_length()
            pygame.mixer.music.play()
            self._playing = True
