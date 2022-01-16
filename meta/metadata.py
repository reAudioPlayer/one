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
            "preview": self._track._preview,
            "markets": self._track._markets
        }
