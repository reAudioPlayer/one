from yt_dlp import YoutubeDL, postprocessor


class OnDownloadFinishedPP(postprocessor.PostProcessor):
    def __init__(self, msg, downloader=None):
        super().__init__(downloader=downloader)
        self._msg = msg

    def run(self, info):
        print(info["filepath"], self._msg)
        #startSong(info["filepath"])
        return [], info

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
        self._ydl.add_post_processor(OnDownloadFinishedPP("Hello World!"))

    def downloadSong(self, link, filename = "upNow"):
        self._ydl.outtmpl_dict["default"] = f"./_cache/{filename}.%(ext)s"
        self._ydl.download([ link ])
