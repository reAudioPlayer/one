import requests
import threading
from subprocess import call
import time
import logging

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

logger.info("launching audio player")

def second():
    call(["python", "main.py"])
processThread = threading.Thread(target=second)
processThread.start()

time.sleep(10)

logger.info("commencing tests")

with requests.get("http://localhost:1234/api/playlists") as res:
    print(res.text)

with requests.get("http://localhost:1234/api/playlist/create") as res:
    print(res.text)

with requests.get("http://localhost:1234/api/playlists") as res:
    print(res.text)

with requests.get("http://localhost:1234/api/kill") as res:
    print(res.text)
