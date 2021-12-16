from dataModels.playlist import Playlist
from dataModels.song import Song
from db.dbManager import DbManager
from downloader.downloader import Downloader

downloader = Downloader()
#downloader.downloadSong("https://www.youtube.com/watch?v=6iRJFfEVUB8", "upNow")
#downloader.downloadSong("https://www.youtube.com/watch?v=l5s7h3yiWeY")

#while True:
#    import time
#    time.sleep(5)

dbManager = DbManager()
#dbManager.addSong(Song("songname", "byme", "spotifylink...", "youtubelink", None))
#dbManager.addSong(Song("songname", "byme", "spotifylink2", "youtubelink", None))
#dbManager.addPlaylist(Playlist("playlistname", [1, 2, 3, 5]))
for row in dbManager.getSongByCustomFilter("spotify = 'spotifylink2'"):
    print(row)
for row in dbManager.getPlaylists():
    print(row)
