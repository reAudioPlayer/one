from yt_dlp import YoutubeDL, postprocessor
from threading import Thread
import asyncio


"""
class OnDownloadFinishedPP(postprocessor.PostProcessor):
    def __init__(self, player: Player, downloader=None):
        super().__init__(downloader=downloader)
        self._player = player

    def run(self, info):
        self._player.next()
        return [], info
"""

class Downloader:
    def __init__(self) -> None:
        self._ydl_opts = {
            'noplaylist': True,
            "outtmpl": "./_cache/upNow.%(ext)s",
            "postprocessors": [{
                "key": "FFmpegExtractAudio",
                "preferredcodec": "mp3"
            }]
        }
        self._ydl = YoutubeDL(self._ydl_opts)
        #self._ydl.add_post_processor(OnDownloadFinishedPP(player))

    async def downloadSong(self, link, filename = "upNow"):
        self._ydl.outtmpl_dict["default"] = f"./_cache/{filename}.%(ext)s"
        t1 = Thread(target = self._ydl.download, args = [link])
        t1.start()
        while t1.is_alive():
            await asyncio.sleep(1)
