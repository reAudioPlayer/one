# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

import threading
from subprocess import call
import time
import logging

import requests

from helper.dictTool import DictEx, ListEx


logging.basicConfig(level = logging.INFO)

logger = logging.getLogger("test")

logger.info("launching audio player")

def _second() -> None:
    call(["python", "main.py"])
processThread = threading.Thread(target=_second)
processThread.start()

time.sleep(10)

try:
    logger.info("commencing tests")

    logger.info("==========================================================")

    # get all playlists
    with requests.get("http://localhost:1234/api/playlists") as res:
        logger.info(res.status_code)
        logger.info(res.text)

    logger.info("==========================================================")
    logger.info("==================== Create  Playlist ====================")
    logger.info("==========================================================")

    id_= -1

    # create Playlist
    with requests.get("http://localhost:1234/api/playlists/new") as res:
        logger.info(res.status_code)
        id_ = int(res.text)

    logger.info(id_)

    # get all playlists
    with requests.get("http://localhost:1234/api/playlists") as res:
        logger.info(res.status_code)
        logger.info(res.text)

    logger.info("==========================================================")
    logger.info("==================== Modify  Playlist ====================")
    logger.info("==========================================================")

    playlist = {
        "id": id_,
        "name": "MyNewPlaylist",
        "description": "MyDescription",
        "cover": "MyCover"
    }

    # update data
    with requests.post(f"http://localhost:1234/api/playlists/{id_}", json=playlist) as res:
        logger.info(res.status_code)
        logger.info(res.text)

    # get all playlists
    with requests.get("http://localhost:1234/api/playlists") as res:
        logger.info(res.status_code)
        playlists = ListEx(res.json())
        newPlaylist = playlists.ensureString(0) # pylint: disable=invalid-name
        assert newPlaylist == playlist["name"]

    # get our playlist
    with requests.post("http://localhost:1234/api/playlists/id", json={"id": id_}) as res:
        playlist = DictEx(res.json())
        logger.info(res.status_code)
        logger.info(playlist)
        assert playlist.ensureString("name") == playlist["name"]
        assert playlist.ensureString("description") == playlist["description"]
        assert playlist.ensureString("cover") == playlist["cover"]
        assert len(playlist.ensureList("songs")) == 0

    logger.info("==========================================================")
    logger.info("====================== Get Metadata ======================")
    logger.info("==========================================================")

    # get metadata
    with requests.post("http://localhost:1234/api/browse/track",
                    json={"url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}) as res:
        metadata = DictEx(res.json())
        logger.info(res.status_code)
        logger.info(metadata)

    logger.info("==========================================================")
    logger.info("======================== Add Song ========================")
    logger.info("==========================================================")

    song = {
        "artist": ", ".join(metadata.ensureList("artists")),
        "title": metadata.ensureString("title"),
        "album": metadata.ensureString("album"),
        "cover": metadata.ensureString("cover"),
        "source": metadata.ensureString("src")
    }

    # add song
    with requests.post(f"http://localhost:1234/api/playlists/{id_}/tracks", json=song) as res:
        logger.info(res.status_code)
        logger.info(res.text)

    # get our playlist
    with requests.post("http://localhost:1234/api/playlists/id", json={"id": id_}) as res:
        playlist = DictEx(res.json())
        logger.info(res.status_code)
        logger.info(playlist)
        assert playlist.ensureString("name") == playlist["name"]
        assert playlist.ensureString("description") == playlist["description"]
        assert playlist.ensureString("cover") == playlist["cover"]
        assert len(playlist.ensureList("songs")) == 1

    logger.info("==========================================================")
    logger.info("======================== END TEST ========================")
    logger.info("==========================================================")

except: # pylint: disable=bare-except
    pass
try:
    requests.get("http://localhost:1234/api/system/kill")
except: # pylint: disable=bare-except
    pass
