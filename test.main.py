import os
import requests
import threading
from subprocess import call
import json
import time
import logging

from helper.dictTool import DictEx, ListEx

logging.basicConfig(level = logging.INFO)

logger = logging.getLogger("test")

logger.info("launching audio player")

def second():
    call(["python", "main.py"])
processThread = threading.Thread(target=second)
processThread.start()

time.sleep(10)

logger.info("commencing tests")

logger.info("==========================================================")

with requests.get("http://localhost:1234/api/playlists") as res:
    logger.info(res.status_code)
    logger.info(res.text)

logger.info("==========================================================")
logger.info("==================== Create  Playlist ====================")
logger.info("==========================================================")

id_= -1

with requests.get("http://localhost:1234/api/playlist/create") as res:
    logger.info(res.status_code)
    id_ = int(res.text)

logger.info(id_)

with requests.get("http://localhost:1234/api/playlists") as res:
    logger.info(res.status_code)
    logger.info(res.text)

logger.info("==========================================================")
logger.info("==================== Modify  Playlist ====================")
logger.info("==========================================================")

with requests.post("http://localhost:1234/api/updatePlaylist", json={"id": id_, "name": "MyNewPlaylist", "description": "MyDescription", "cover": "MyCover"}) as res:
    logger.info(res.status_code)
    logger.info(res.text)

with requests.get("http://localhost:1234/api/playlists") as res:
    logger.info(res.status_code)
    playlists = ListEx(res.text)
    newPlaylist = playlists.ensureString(0)
    if newPlaylist != "MyNewPlaylist":
        logger.info(newPlaylist)
        logger.info("Test failed")
        os._exit(-1)


with requests.post("http://localhost:1234/api/playlist", json={"id": id_}) as res:
    logger.info("==========================================================")
    playlist = DictEx(res.json())
    logger.info("==========================================================")
    logger.info(res.status_code)
    logger.info("==========================================================")
    logger.info(playlist.ensureString("name"))
    logger.info(playlist.ensureString("cover"))
    logger.info(playlist.ensureString("description"))
    logger.info(json.dumps(playlist.ensureList("songs")))

logger.info("==========================================================")
logger.info("======================== END TEST ========================")
logger.info("==========================================================")

try:
    requests.get("http://localhost:1234/api/kill")
finally:
    os._exit(0) # pylint: disable=protected-access
