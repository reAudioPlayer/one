# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

from typing import Any, Dict, Optional

import validators # type: ignore

from meta.spotify import Spotify
from dataModel.track import ITrack, SoundcloudTrack, YoutubeTrack


class Metadata:
    """metadata finder"""
    def __init__(self, spotify: Spotify, url: str) -> None:
        self._track: Optional[ITrack] = None
        self._src = None
        if not validators.url(url):
            return
        if "youtu" in url:
            self._src = url
            self._track = YoutubeTrack.fromUrl(url)
        elif "spotify" in url:
            result = spotify.url(url)
            if not result:
                return
            self._track = result.unwrap()
            ytTrack = YoutubeTrack.fromSpotifyTrack(self._track)
            if ytTrack:
                self._src = f"https://music.youtube.com/watch?v={ytTrack._id}"
        elif "soundcloud" in url:
            self._src = url
            self._track = SoundcloudTrack.fromUrl(url)

    def __bool__(self) -> bool:
        """return bool"""
        return bool(self._track)

    def toDict(self) -> Dict[str, Any]: # extend with spotify
        """serialise"""
        assert self._track
        return {
            "title": self._track.title,
            "album": self._track.album,
            "artists": self._track.artists,
            "artist": self._track.artist,
            "cover": self._track.cover,
            "src": self._src,
            "preview": self._track.preview,
            "markets": self._track.markets
        }
