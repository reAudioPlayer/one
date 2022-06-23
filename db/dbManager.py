# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

import os
import sqlite3 as sl
from typing import List, Optional
from dataModel.playlist import Playlist

from dataModel.song import Song


class DbManager:
    """(sqlite) db manager"""
    def __init__(self) -> None:
        if not os.path.exists('./db/db'):
            os.makedirs('./db/db')
        self._db = sl.connect('./db/db/main.db')
        self._createSongTable()
        self._createPlaylistTable()
        self._updatePlaylistTable()

    def shutdown(self) -> None:
        """close db connection"""
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
        """add song to db"""
        with self._db:
            sql = 'INSERT INTO Songs (name, artist, album, cover, duration, favourite, spotify, source) values(?, ?, ?, ?, ?, ?, ?, ?)' # pylint: disable=line-too-long
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
        """remove playlist"""
        with self._db:
            self._db.execute(f"DELETE FROM Playlists WHERE id={playlistId}")

    @staticmethod
    def _castToSongList(rows: sl.Cursor) -> List[Song]:
        return [ Song.fromSql(row) for row in rows ]

    def getSongs(self) -> List[Song]:
        """get all songs"""
        with self._db:
            return DbManager._castToSongList(self._db.execute("SELECT * FROM Songs"))

    def getSongById(self, id_: int) -> Song:
        """get song by id"""
        with self._db:
            return self.getSongsByCustomFilter(f"id={id_}")[0]

    def getSongsByIdList(self, idList: List[int]) -> List[Song]:
        """get songs by id list"""
        with self._db:
            songs = DbManager._castToSongList(
                self._db.execute(
                    f"SELECT * FROM Songs WHERE id IN ({','.join([str(int) for int in idList]) })")) # pylint: disable=line-too-long
            return [ next((x for x in songs if x.id == songId), Song()) for songId in idList ] # sort based on id list, pylint: disable=line-too-long

    def getLatestSongs(self, count: int) -> List[Song]:
        """get latest songs"""
        with self._db:
            return DbManager._castToSongList(
                self._db.execute(f"SELECT * FROM Songs ORDER BY id DESC LIMIT {count}"))

    def getLikedSongs(self) -> List[Song]:
        """get liked songs"""
        with self._db:
            return DbManager._castToSongList(
                self._db.execute("SELECT * FROM Songs WHERE favourite=1"))

    def getSongsByCustomFilter(self, filter_: str) -> List[Song]:
        """get songs by custom filter"""
        with self._db:
            return DbManager._castToSongList(
                self._db.execute(f"SELECT * FROM Songs WHERE {filter_}"))

    def getSongsByQuery(self, query: str) -> List[Song]:
        """get songs by query"""
        def createLike(word: str) -> str:
            return f"(name LIKE '%{word}%' OR artist LIKE '%{word}%' OR album LIKE '%{word}%')"
        filter_ = " AND ".join([ createLike(word) for word in query.split(' ') ])
        with self._db:
            return DbManager._castToSongList(
                self._db.execute(f"SELECT * FROM Songs WHERE {filter_}"))

    def addPlaylist(self, playlist: Playlist) -> None:
        """add playlist to db"""
        with self._db:
            sql = 'INSERT INTO Playlists (name, description, songs) values(?, ?, ?)'
            data = [
                playlist.sql()
            ]
            self._db.executemany(sql, data)

    def getPlaylists(self) -> List[Playlist]:
        """get all playlists"""
        with self._db:
            return list(map(Playlist.fromSql, self._db.execute("SELECT * FROM Playlists")))

    def getPlaylistById(self, id_: int) -> Optional[Playlist]:
        """get playlist by id"""
        with self._db:
            rows = self._db.execute(f"SELECT * FROM Playlists WHERE id={id_}")
            for row in rows:
                return Playlist.fromSql(row)
            return None

    def updatePlaylist(self, newPlaylist: Playlist) -> None:
        """update playlist"""
        with self._db:
            name, description, songs, cover = newPlaylist.sql()
            sql = f"UPDATE Playlists SET name='{name}', description='{description}', songs='{songs}', cover='{cover}' WHERE id={newPlaylist.id}" # pylint: disable=line-too-long
            self._db.execute(sql)

    def updateSongsOfPlaylist(self, id_: int, songs: List[int]) -> None:
        """update songs of playlist"""
        with self._db:
            sql = f"UPDATE Playlists SET songs='{str(songs)}' WHERE id={id_}"
            self._db.execute(sql)

    def updateSongMetadata(self, id_: int, values: str) -> None:
        """update song metadata"""
        with self._db:
            self._db.execute(f"UPDATE Songs SET {values} WHERE id={id_}")

    def updatePlaylistMetadata(self, id_: int, values: str) -> None:
        """update playlist metadata"""
        with self._db:
            self._db.execute(f"UPDATE Playlists SET {values} WHERE id={id_}")
