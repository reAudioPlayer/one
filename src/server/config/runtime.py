# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
from __future__ import annotations
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

import argparse
import os
from os.path import exists
import json
from typing import Optional

from pyaddict import JDict

from helper.singleton import Singleton
from helper.cacheDecorator import clearCache
from config.config import SPOTIFY


class Args(metaclass = Singleton):
    """The args class is used to store the command line arguments."""
    def __init__(self) -> None:
        argparser = argparse.ArgumentParser(description='Run the server.')
        argparser.add_argument('--port',
                               type=int,
                               default=1234,
                               help='The port to run the server on.')
        argparser.add_argument('--host',
                               type=str,
                               default='127.0.0.1',
                               help='The host to run the server on.')
        argparser.add_argument('--no-local-playback',
                               action='store_true',
                               help='Disable local playback.')
        argparser.add_argument('--no-spotify',
                               action='store_true',
                               help='Disable spotify playback.')
        argparser.add_argument('--no-youtube',
                               action='store_true',
                               help='Disable youtube playback.')
        argparser.add_argument('--api-only',
                               action='store_true',
                               help='Disable the web interface. (host ui w/ nginx)')
        argparser.add_argument('--with-docker',
                               action='store_true',
                               help='if run inside docker')
        argparser.add_argument('--usr',
                               type=str,
                               default='../usr',
                help='The path to the user config (e.g. db, persistent settings, spotify cache).')
        self._args = argparser.parse_args()

    @property
    def port(self) -> int:
        """The port to run the server on."""
        assert isinstance(self._args.port, int)
        return self._args.port

    @property
    def host(self) -> str:
        """The host to run the server on."""
        assert isinstance(self._args.host, str)
        return self._args.host

    @property
    def noLocalPlayback(self) -> bool:
        """Returns true if the server should not play music locally."""
        assert isinstance(self._args.no_local_playback, bool)
        return self._args.no_local_playback

    @property
    def localPlayback(self) -> bool:
        """Returns true if the server should play music locally."""
        return not self.noLocalPlayback

    @property
    def noSpotify(self) -> bool:
        """Returns true if the server should not play music from spotify."""
        assert isinstance(self._args.no_spotify, bool)
        return self._args.no_spotify

    @property
    def noYoutube(self) -> bool:
        """Returns true if the server should not play music from youtube."""
        assert isinstance(self._args.no_youtube, bool)
        return self._args.no_youtube

    @property
    def apiOnly(self) -> bool:
        """Returns true if the server should not serve the web interface."""
        assert isinstance(self._args.api_only, bool)
        return self._args.api_only

    @property
    def usr(self) -> str:
        """The path to the database dir."""
        assert isinstance(self._args.usr, str)
        return self._args.usr

    @property
    def db(self) -> str:
        """The path to the database."""
        return os.path.join(self.usr, 'main.db')

    @property
    def withDocker(self) -> bool:
        """Returns true if the server runs inside docker."""
        assert isinstance(self._args.with_docker, bool)
        return self._args.with_docker


class Runtime:
    """The runtime class is used to store the runtime configuration of the server."""
    args: Args = Args()

    @staticmethod
    def spotifyConfig() -> Optional[JDict]:
        """The spotify configuration."""
        if Runtime.args.noSpotify:
            return None
        if not exists(SPOTIFY):
            return None
        with open(SPOTIFY, encoding = "utf-8") as file:
            return JDict(json.load(file))

    @staticmethod
    def setSpotifyConfig(value: JDict) -> None:
        """Sets the spotify configuration."""
        clearCache()
        with open(SPOTIFY, "w", encoding = "utf-8") as file:
            json.dump(value, file, indent = 4)
