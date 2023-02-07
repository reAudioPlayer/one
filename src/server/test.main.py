# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = "Copyright (c) 2022 https://github.com/reAudioPlayer"

import os
import threading
from subprocess import call
import time
import logging
import requests

from pyaddict import JDict, JList


logging.basicConfig(level = logging.INFO)

logger = logging.getLogger("test")

logger.info("launching audio player")

def _second() -> None:
    call(["python", "main.py"])
processThread = threading.Thread(target=_second)
processThread.start()

time.sleep(10)

SUCCESS= True

try:
    logger.info("commencing tests")

    logger.info("==========================================================")

    # get all playlists
    with requests.get("http://localhost:1234/api/playlists", timeout = 10) as res:
        logger.info(res.status_code)
        logger.info(res.text)

    logger.info("==========================================================")
    logger.info("==================== Create  Playlist ====================")
    logger.info("==========================================================")

    id_= -1

    # create Playlist
    with requests.get("http://localhost:1234/api/playlists/new", timeout = 10) as res:
        logger.info(res.status_code)
        id_ = int(res.text)

    logger.info(id_)

    # get all playlists
    with requests.get("http://localhost:1234/api/playlists", timeout = 10) as res:
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
    with requests.post(f"http://localhost:1234/api/playlists/{id_}",
                       json=playlist,
                       timeout = 10) as res:
        logger.info(res.status_code)
        logger.info(res.text)

    # get all playlists
    with requests.get("http://localhost:1234/api/playlists", timeout = 10) as res:
        logger.info(res.status_code)
        playlists = JList(res.json())
        newPlaylist = playlists.ensure(0, str) # pylint: disable=invalid-name
        assert newPlaylist == playlist["name"]

    # get our playlist
    with requests.get(f"http://localhost:1234/api/playlists/{id_}", timeout = 10) as res:
        playlist = JDict(res.json())
        logger.info(res.status_code)
        logger.info(playlist)
        assert playlist.ensure("name", str) == playlist["name"]
        assert playlist.ensure("description", str) == playlist["description"]
        assert playlist.ensure("cover", str) == playlist["cover"]
        assert len(playlist.ensure("songs", list)) == 0

    logger.info("==========================================================")
    logger.info("====================== Get Metadata ======================")
    logger.info("==========================================================")

    # get metadata
    with requests.post("http://localhost:1234/api/browse/track",
                    json={"url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"},
                    timeout = 10) as res:
        metadata = JDict(res.json())
        logger.info(res.status_code)
        logger.info(metadata)

    logger.info("==========================================================")
    logger.info("======================== Add Song ========================")
    logger.info("==========================================================")

    song = {
        "artist": ", ".join(metadata.ensure("artists", list)),
        "title": metadata.ensure("title", str),
        "album": metadata.ensure("album", str),
        "cover": metadata.ensure("cover", str),
        "source": metadata.ensure("source", str)
    }

    # add song
    with requests.post(f"http://localhost:1234/api/playlists/{id_}/tracks",
                       json=song,
                       timeout = 10) as res:
        logger.info(res.status_code)
        logger.info(res.text)

    # get our playlist
    with requests.get(f"http://localhost:1234/api/playlists/{id_}", timeout = 10) as res:
        playlist = JDict(res.json())
        logger.info(res.status_code)
        logger.info(playlist)
        assert playlist.ensure("name", str) == playlist["name"]
        assert playlist.ensure("description", str) == playlist["description"]
        assert playlist.ensure("cover", str) == playlist["cover"]
        assert len(playlist.ensure("songs", list)) == 1

    logger.info("==========================================================")
    logger.info("======================== END TEST ========================")
    logger.info("==========================================================")

except: # pylint: disable=bare-except
    SUCCESS = False
try:
    requests.get("http://localhost:1234/api/system/kill", timeout = 10)
except: # pylint: disable=bare-except
    pass

if not SUCCESS:
    os._exit(1) # pylint: disable=protected-access
