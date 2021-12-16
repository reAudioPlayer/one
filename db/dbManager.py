import sqlite3 as sl
import json
from typing import List, Tuple
from dataModels.playlist import Playlist

from dataModels.song import Song


class DbManager:
    def __init__(self) -> None:
        self._db = sl.connect('./db/db/main.db')

        self._createSongTable()
        self._createPlaylistTable()

        cursor = self._db.cursor()
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = cursor.fetchall()
        print(tables)
        cursor.close()

    def shutdown(self):
        self._db.close()

    def _createSongTable(self) -> None:
        sql = """create table if not exists Songs (
            id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            artist TEXT,
            spotify TEXT,
            youtube TEXT,
            soundcloud TEXT);"""
        with self._db:
            self._db.execute(sql)

    def _createPlaylistTable(self) -> None:
        sql = """create table if not exists Playlists (
            id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            songs TEXT);"""
        with self._db:
            self._db.execute(sql)

    def addSong(self, song: Song) -> None:
        with self._db:
            sql = 'INSERT INTO Songs (name, artist, spotify, youtube, soundcloud) values(?, ?, ?, ?, ?)'
            data = [
                song.sql()
            ]
            self._db.executemany(sql, data)

    @staticmethod
    def _castToSongList(rows: List[Tuple]) -> List[Song]:
        return list(map(Song.FromSql, rows))

    def getSongs(self) -> List[Song]:
        with self._db:
            return DbManager._castToSongList(self._db.execute("SELECT * FROM Songs"))

    def getSongByCustomFilter(self, filter) -> List[Song]:
        with self._db:
            return DbManager._castToSongList(self._db.execute(f"SELECT * FROM Songs WHERE {filter}"))

    def addPlaylist(self, playlist: Playlist) -> None:
        with self._db:
            sql = 'INSERT INTO Playlists (name, songs) values(?, ?)'
            data = [
                playlist.sql()
            ]
            self._db.executemany(sql, data)

    def getPlaylists(self) -> List[Playlist]:
        with self._db:
            return list(map(Playlist.FromSql, self._db.execute("SELECT * FROM Playlists")))
