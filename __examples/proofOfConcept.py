from yt_dlp import YoutubeDL
import yt_dlp
import pygame

pygame.init()
pygame.mixer.init()
MUSIC_END = pygame.USEREVENT+1
pygame.mixer.music.set_endevent(MUSIC_END)

playlist = [
    "https://soundcloud.com/musicof-destiny/our-time-bootleg",
    "https://www.youtube.com/watch?v=6iRJFfEVUB8",
    "https://www.youtube.com/watch?v=l5s7h3yiWeY",
    "https://www.youtube.com/watch?v=Xk0q5Zwi1n4"
]

index = 0

x = "./hello.mp3"
length = None

def startSong(relativePath: str):
    global length
    pygame.mixer.music.load(f"./{relativePath}")
    sound = pygame.mixer.Sound(relativePath)
    length = sound.get_length()
    pygame.mixer.music.play()
    print(length, length - 10)
    pygame.mixer.music.set_pos(length - 20)

class MyCustomPP(yt_dlp.postprocessor.PostProcessor):
    def run(self, info):
        print(info["filepath"])
        startSong(info["filepath"])
        return [], info

ydl_opts = {
    'noplaylist': True,
    "outtmpl": "nowPlaying.%(ext)s",
    "postprocessors": [{
        "key": "FFmpegExtractAudio",
        "preferredcodec": "mp3"
    }]
}

def downloadSong(index):
    with YoutubeDL(ydl_opts) as ydl:
        ydl.add_post_processor(MyCustomPP())
        ydl.download([playlist[index]])

downloadSong(index)

running = True
while running:
    for event in pygame.event.get():
        if event.type == MUSIC_END:
            print('music end event')
            index += 1
            pygame.mixer.music.unload()
            downloadSong(index)

pygame.quit()

exit()
