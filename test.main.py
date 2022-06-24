import os
import requests
import threading
from subprocess import call
import time
import logging

from helper.dictTool import DictEx, ListEx

logging.basicConfig(level = logging.INFO)

logger = logging.getLogger("test")

logger.info("launching audio player")

def second() -> None:
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

playlist = {
    "id": id_,
    "name": "MyNewPlaylist",
    "description": "MyDescription",
    "cover": "MyCover"
}

with requests.post("http://localhost:1234/api/updatePlaylist", json=playlist) as res:
    logger.info(res.status_code)
    logger.info(res.text)

with requests.get("http://localhost:1234/api/playlists") as res:
    logger.info(res.status_code)
    playlists = ListEx(res.json())
    newPlaylist = playlists.ensureString(0)
    assert newPlaylist == playlist["name"]

with requests.post("http://localhost:1234/api/playlist", json={"id": id_}) as res:
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

with requests.post("http://localhost:1234/api/metadata", json={"url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}) as res:
    metadata = DictEx(res.json())
    logger.info(res.status_code)
    logger.info(metadata)

logger.info("==========================================================")
logger.info("======================== Add Song ========================")
logger.info("==========================================================")

song = {
    "id": id_,
    "artist": ", ".join(metadata.ensureList("artists")),
    "title": metadata.ensureString("title"),
    "album": metadata.ensureString("album"),
    "cover": metadata.ensureString("cover"),
    "source": metadata.ensureString("src")
}

with requests.post("http://localhost:1234/api/add", json=song) as res:
    logger.info(res.status_code)
    logger.info(res.text)

with requests.post("http://localhost:1234/api/playlist", json={"id": id_}) as res:
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

try:
    requests.get("http://localhost:1234/api/kill")
except: # pylint: disable=bare-except
    pass
