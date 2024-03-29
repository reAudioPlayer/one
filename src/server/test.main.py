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

    id_= ""

    # create Playlist
    with requests.get("http://localhost:1234/api/playlists/new?type=classic", timeout = 10) as res:
        logger.info(res.status_code)
        id_ = res.text.split("/")[-1]

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
        logger.info(playlists)
        newPlaylist = playlists.assertGet(2, dict)
        assert newPlaylist["name"] == playlist["name"], f"{newPlaylist['name']} != {playlist['name']}" # pylint: disable=line-too-long

    # get our playlist
    with requests.get(f"http://localhost:1234/api/playlists/{id_}", timeout = 10) as res:
        playlist = JDict(res.json())
        logger.info(res.status_code)
        logger.info(playlist)
        assert playlist.ensure("name", str) == playlist["name"], f"{playlist.ensure('name', str)} != {playlist['name']}" # pylint: disable=line-too-long
        assert playlist.ensure("description", str) == playlist["description"], f"{playlist.ensure('description', str)} != {playlist['description']}" # pylint: disable=line-too-long
        assert playlist.ensure("cover", str) == playlist["cover"], f"{playlist.ensure('cover', str)} != {playlist['cover']}" # pylint: disable=line-too-long
        assert len(playlist.ensure("songs", list)) == 0, f"{len(playlist.ensure('songs', list))} != 0" # pylint: disable=line-too-long

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

except Exception as e: # pylint: disable=broad-except
    logger.exception(e)
    SUCCESS = False
try:
    requests.get("http://localhost:1234/api/system/kill", timeout = 10)
except: # pylint: disable=bare-except
    pass

if not SUCCESS:
    os._exit(1) # pylint: disable=protected-access
