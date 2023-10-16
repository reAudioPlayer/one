# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = "Copyright (c) 2022 https://github.com/reAudioPlayer"

from typing import Any, Dict, Optional

import validators # type: ignore

from meta.spotify import Spotify
from dataModel.track import ITrack, SoundcloudTrack, YoutubeTrack, SpotifyTrack
from dataModel.metadata import SongMetadata


class Metadata:
    """metadata finder"""
    __slots__ = ("_track", "_source", "_href", "_spotify")

    def __init__(self, spotify: Spotify, url: str) -> None:
        self._spotify = spotify
        self._track: Optional[ITrack] = None
        self._source = None
        self._href = url
        if not validators.url(url):
            return
        if "youtu" in url:
            self._source = url.split("&")[0]
            self._track = YoutubeTrack.fromUrl(url)
        elif "spotify" in url:
            result = spotify.url(url)
            if not result:
                return
            self._track = result.unwrap()
            ytTrack = YoutubeTrack.fromSpotifyTrack(self._track)
            if ytTrack:
                self._source = f"https://music.youtube.com/watch?v={ytTrack._id}"
        elif "soundcloud" in url:
            self._source = url.split("?")[0]
            self._track = SoundcloudTrack.fromUrl(url)

    def __bool__(self) -> bool:
        """return bool"""
        return bool(self._track)

    async def toExtendedDict(self) -> Dict[str, Any]: # extend with spotify
        """serialise"""
        if isinstance(self._track, SpotifyTrack):
            data = await SongMetadata.fetch(self._spotify, self._track)
            self._track.addMetadata(data)
        return self.toDict()

    def toDict(self) -> Dict[str, Any]: # extend with spotify
        """serialise"""
        assert self._track
        return {
            "title": self._track.title,
            "album": self._track.album,
            "artists": self._track.artists,
            "artist": self._track.artist,
            "cover": self._track.cover,
            "source": self._source,
            "preview": self._track.preview,
            "markets": self._track.markets,
            "href": self._href,
            "track": self._track.toDict()
        }
