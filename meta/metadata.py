import spotipy

import validators

from dataModels.track import SoundcloudTrack, SpotifyTrack, YoutubeTrack


class Metadata:
    def __init__(self, spotify: spotipy.Spotify, url: str) -> None:
        self._track = None
        self._src = None
        if not validators.url(url):
            return
        if "youtu" in url:
            self._src = url
            self._track = YoutubeTrack.FromUrl(url)
        elif "spotify" in url:
            self._track = SpotifyTrack.FromUrl(spotify, url)
            ytTrack = YoutubeTrack.FromSpotifyTrack(self._track)
            if ytTrack:
                self._src = f"https://music.youtube.com/watch?v={ytTrack._id}"
        elif "soundcloud" in url:
            self._src = url
            self._track = SoundcloudTrack.FromUrl(url)

    def toDict(self) -> dict: # extend with spotify
        return {
            "title": self._track._title,
            "album": self._track._album,
            "artists": self._track._artists,
            "cover": self._track._cover,
            "src": self._src,
            "preview": self._track._preview
        }

"""
uri = 'https://open.spotify.com/track/6jYUObC5Aeif5gHD1oELVo?si=4c0f2943a6c54c01'

spotify = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials(client_id="c8e963f8a6a942b58712cc34e2ccc76d", client_secret="6ec48f7d1b574bd6b340384c50675447"))
result = SpotifyTrack.FromUrl(spotify, uri)

print(result._title)
print(result._album)
print(result._cover)
print(result._artists)
print(result._id)

print("--------------------")

result = YoutubeTrack.FromUrl("https://music.youtube.com/watch?v=IyCnYlOOaB8&list=RDAMVMIyCnYlOOaB8")

print(result._title)
print(result._album)
print(result._artists)
print(result._id)

print("--------------------")

url = "https://soundcloud.com/basshouse-music/castion-reeva-never-be-forgotten-bhm044"
result = SoundcloudTrack.FromUrl(url)

print(result._title)
print(result._album)
print(result._cover)
print(result._artists)
print(result._id)
"""