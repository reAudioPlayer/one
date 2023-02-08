# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
from __future__ import annotations
__copyright__ = "Copyright (c) 2022 https://github.com/reAudioPlayer"

import argparse
from os.path import exists
import os
import json
from typing import Optional, Dict, Any
from enum import Enum

from pyaddict import JDict

from helper.singleton import Singleton
from helper.cacheDecorator import clearCache
from config.config import SPOTIFY, CACHE, BASE


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
        argparser.add_argument('--no-spotify',
                               action='store_true',
                               help='Disable spotify integration.')
        argparser.add_argument('--no-youtube',
                               action='store_true',
                               help='Disable youtube integration.')
        argparser.add_argument('--api-only',
                               action='store_true',
                               help='Disable the web interface. (host ui w/ nginx)')
        argparser.add_argument('--with-docker',
                               action='store_true',
                               help='if run inside docker')
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
    def noSpotify(self) -> bool:
        """Returns true if the server should not integrate with spotify."""
        assert isinstance(self._args.no_spotify, bool)
        return self._args.no_spotify

    @property
    def noYoutube(self) -> bool:
        """Returns true if the server should not integrate with youtube."""
        assert isinstance(self._args.no_youtube, bool)
        return self._args.no_youtube

    @property
    def apiOnly(self) -> bool:
        """Returns true if the server should not serve the web interface."""
        assert isinstance(self._args.api_only, bool)
        return self._args.api_only

    @property
    def db(self) -> str:
        """The path to the database."""
        return os.path.join(BASE, "./main.db")

    @property
    def withDocker(self) -> bool:
        """Returns true if the server runs inside docker."""
        assert isinstance(self._args.with_docker, bool)
        return self._args.with_docker


class CacheStrategy(Enum):
    """The cache strategy enum is used to store the cache strategy."""
    All = "All"
    Playlist = "Playlist"
    Current = "Current"
    CurrentNext = "CurrentNext"


class CacheConfig(metaclass = Singleton):
    """The cache config class is used to store the cache configuration."""
    _FILE = CACHE

    __slots__ = ("_preserveInSession",  "_preserve", "_strategy")

    def __init__(self) -> None:
        self._preserve = False
        self._preserveInSession = False
        self._strategy = CacheStrategy.Current
        self._read()

    def _read(self) -> None:
        """Reads the cache configuration from the config file."""
        if exists(self._FILE):
            with open(self._FILE, encoding = "utf-8") as file:
                config = JDict(json.load(file))
        else:
            config = JDict()
        self._preserve = config.get("preserve", False)
        self._preserveInSession = config.get("preserveInSession", False)
        self._strategy = CacheStrategy(config.get("strategy",
                                                  CacheStrategy.Current.value))

    def _write(self) -> None:
        """Writes the cache configuration to the config file."""
        with open(self._FILE, "w", encoding = "utf-8") as file:
            json.dump(self.toDict(), file)

    def update(self, data: Dict[str, Any]) -> None:
        """Updates the cache configuration."""
        dex = JDict(data)
        self._preserve = dex.get("preserve", self.preserve)
        self._strategy = CacheStrategy(dex.get("strategy", self.strategy.value))
        self._preserveInSession = dex.get("preserveInSession",
                                          self.preserveInSession)
        self._write()

    @property
    def preserve(self) -> bool:
        """Returns true if the cache should be preserved."""
        return self._preserve

    @preserve.setter
    def preserve(self, value: bool) -> None:
        """Sets the preserve flag."""
        self._preserve = value
        self._write()

    @property
    def preserveInSession(self) -> bool:
        """Returns true if the cache should be preserved in session."""
        return self._preserveInSession or self._preserve

    @preserveInSession.setter
    def preserveInSession(self, value: bool) -> None:
        """Sets the preserve in session flag."""
        self._preserveInSession = value or self._preserve
        self._write()

    @property
    def strategy(self) -> CacheStrategy:
        """Returns the cache strategy."""
        return self._strategy

    @strategy.setter
    def strategy(self, value: CacheStrategy) -> None:
        """Sets the cache strategy."""
        self._strategy = value
        self._write()

    def toDict(self) -> Dict[str, Any]:
        """Returns a dict representation of the cache configuration."""
        return {"preserve": self.preserve,
                "strategy": self.strategy.value,
                "preserveInSession": self.preserveInSession,
        }


class Runtime:
    """The runtime class is used to store the runtime configuration of the server."""
    args: Args = Args()
    cache: CacheConfig = CacheConfig()

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

    @staticmethod
    def updateConfig(data: Dict[str, Any]) -> None:
        """Updates the configuration."""
        dex = JDict(data)
        Runtime.cache.update(dex.get("cache", {}))

    @staticmethod
    def config() -> Dict[str, Any]:
        """Returns the configuration."""
        return {
            "cache": Runtime.cache.toDict()
        }
