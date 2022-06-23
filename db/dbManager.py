# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

import sqlite3 as sl
from typing import List, Optional, Tuple
from dataModel.playlist import Playlist

from dataModel.song import Song
import os


class DbManager:
    def __init__(self) -> None:
        if not os.path.exists('./db/db'):
            os.makedirs('./db/db')
        self._db = sl.connect('./db/db/main.db')
        self._createSongTable()
        self._createPlaylistTable()
        self._updatePlaylistTable()

    def shutdown(self) -> None:
        self._db.close()

    def _createSongTable(self) -> None:
        sql = """create table if not exists Songs (
            id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            artist TEXT,
            album TEXT,
            cover TEXT,
            favourite INTEGER,
            duration INTEGER,
            spotify TEXT,
            source TEXT);"""
        with self._db:
            self._db.execute(sql)

    def _createPlaylistTable(self) -> None:
        sql = """create table if not exists Playlists (
            id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            description TEXT,
            cover TEXT,
            songs TEXT);"""
        with self._db:
            self._db.execute(sql)

    def _updatePlaylistTable(self) -> None:
        sql = """PRAGMA table_info("Playlists")"""
        with self._db:
            val = [ (name) for (_, name, *_) in self._db.execute(sql) ]
            if "cover" not in val:
                self._db.execute('ALTER TABLE "Playlists" ADD cover TEXT;')

    def addSong(self, song: Song) -> None:
        with self._db:
            sql = 'INSERT INTO Songs (name, artist, album, cover, duration, favourite, spotify, source) values(?, ?, ?, ?, ?, ?, ?, ?)'
            data = [
                song.sql()
            ]
            self._db.executemany(sql, data)

    def removeSong(self, songId: int) -> None:
        """remove if song in no playlist"""
        playlists = self.getPlaylists()
        for playlist in playlists:
            if songId in playlist.songs:
                return
        with self._db:
            self._db.execute(f"DELETE FROM Songs WHERE id={songId}")

    def removePlaylist(self, playlistId: int) -> None:
        with self._db:
            self._db.execute(f"DELETE FROM Playlists WHERE id={playlistId}")

    @staticmethod
    def _castToSongList(rows: sl.Cursor) -> List[Song]:
        return [ Song.FromSql(row) for row in rows ]

    def getSongs(self) -> List[Song]:
        with self._db:
            return DbManager._castToSongList(self._db.execute("SELECT * FROM Songs"))

    def getSongById(self, id: int) -> Song:
        with self._db:
            return self.getSongByCustomFilter(f"id={id}")[0]

    def getSongsByIdList(self, idList: List[int]) -> List[Song]:
        with self._db:
            songs = DbManager._castToSongList(self._db.execute(f"SELECT * FROM Songs WHERE id IN ({ ','.join([str(int) for int in idList]) })"))
            return [ next((x for x in songs if x.id == songId), Song()) for songId in idList ] # sort based on id list

    def getLatestSongs(self, count: int) -> List[Song]:
        with self._db:
            return DbManager._castToSongList(self._db.execute(f"SELECT * FROM Songs ORDER BY id DESC LIMIT {count}"))

    def getLikedSongs(self) -> List[Song]:
        with self._db:
            return DbManager._castToSongList(self._db.execute("SELECT * FROM Songs WHERE favourite=1"))

    def getSongByCustomFilter(self, filter: str) -> List[Song]:
        with self._db:
            return DbManager._castToSongList(self._db.execute(f"SELECT * FROM Songs WHERE {filter}"))

    def getSongsByQuery(self, query: str) -> List[Song]:
        def createLike(word: str) -> str:
            return f"(name LIKE '%{word}%' OR artist LIKE '%{word}%' OR album LIKE '%{word}%')"
        filter = " AND ".join([ createLike(word) for word in query.split(' ') ])
        with self._db:
            return DbManager._castToSongList(self._db.execute(f"SELECT * FROM Songs WHERE {filter}"))

    def addPlaylist(self, playlist: Playlist) -> None:
        with self._db:
            sql = 'INSERT INTO Playlists (name, description, songs) values(?, ?, ?)'
            data = [
                playlist.sql()
            ]
            self._db.executemany(sql, data)

    def getPlaylists(self) -> List[Playlist]:
        with self._db:
            return list(map(Playlist.FromSql, self._db.execute("SELECT * FROM Playlists")))

    def getPlaylistById(self, id: int) -> Optional[Playlist]:
        with self._db:
            rows = self._db.execute(f"SELECT * FROM Playlists WHERE id={id}")
            for row in rows:
                return Playlist.FromSql(row)
            return None

    def updatePlaylist(self, newPlaylist: Playlist) -> None:
        with self._db:
            name, description, songs, cover = newPlaylist.sql()
            sql = f"UPDATE Playlists SET name='{name}', description='{description}', songs='{songs}', cover='{cover}' WHERE id={newPlaylist.id}"
            self._db.execute(sql)

    def updateSongsOfPlaylist(self, id: int, songs: List[int]) -> None:
        with self._db:
            sql = f"UPDATE Playlists SET songs='{str(songs)}' WHERE id={id}"
            self._db.execute(sql)

    def updateSongMetadata(self, id: int, values: str) -> None:
        with self._db:
            self._db.execute(f"UPDATE Songs SET {values} WHERE id={id}")

    def updatePlaylistMetadata(self, id: int, values: str) -> None:
        with self._db:
            self._db.execute(f"UPDATE Playlists SET {values} WHERE id={id}")
