# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

import argparse
from dataModel.singleton import Singleton


class Args(metaclass = Singleton):
    """The args class is used to store the command line arguments."""
    def __init__(self):
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
        self._args = argparser.parse_args()

    @property
    def port(self) -> int:
        """The port to run the server on."""
        return self._args.port

    @property
    def host(self) -> str:
        """The host to run the server on."""
        return self._args.host

    @property
    def noLocalPlayback(self) -> bool:
        """Returns true if the server should not play music locally."""
        return self._args.no_local_playback

    @property
    def localPlayback(self) -> bool:
        """Returns true if the server should play music locally."""
        return not self.noLocalPlayback

    @property
    def noSpotify(self) -> bool:
        """Returns true if the server should not play music from spotify."""
        return self._args.no_spotify

    @property
    def noYoutube(self) -> bool:
        """Returns true if the server should not play music from youtube."""
        return self._args.no_youtube

    @property
    def apiOnly(self) -> bool:
        """Returns true if the server should not serve the web interface."""
        return self._args.api_only


class Runtime:
    """The runtime class is used to store the runtime configuration of the server."""
    args = Args()
