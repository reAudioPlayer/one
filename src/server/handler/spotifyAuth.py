# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
from __future__ import annotations
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

import os
import json
from time import time
import webbrowser
import base64
from typing import Optional, Tuple

import aiohttp
from aiohttp import web
from spotipy.oauth2 import  SpotifyOAuth # type: ignore

from config.runtime import Runtime
from helper.dictTool import DictEx


SCOPE = "user-library-read user-follow-read user-follow-modify"
REDIRECT = "http://localhost:1234/api/spotify/callback"


class SpotifyAuth:
    """Handles Spotify Authentication"""
    def __init__(self) -> None:
        if SpotifyAuth.isDisabled():
            return
        if not os.path.isfile(".cache"):
            self._openSpotifyAuth()


    def _openSpotifyAuth(self) -> None:
        clientId, _ = SpotifyAuth._getSpotifyAuthData()
        webbrowser.open(f"https://accounts.spotify.com/authorize?client_id={clientId}&response_type=code&redirect_uri={REDIRECT}&scope={SCOPE}") # pylint: disable=line-too-long

    @staticmethod
    def isDisabled() -> bool:
        """Returns True if Spotify is disabled"""
        return "restricted" in SpotifyAuth._getSpotifyAuthData()

    @staticmethod
    async def _getClientData() -> Optional[bytes]:
        """Returns the client_id and client_secret as bytes"""
        id_, secret = SpotifyAuth._getSpotifyAuthData()
        if "restricted" in (id_, secret):
            return None
        return base64.b64encode(f"{id_}:{secret}".encode("utf-8"))

    @staticmethod
    def _getSpotifyAuthData() -> Tuple[str, str]:
        """Returns the client_id and client_secret"""
        spotifyConfig = Runtime.spotifyConfig() or DictEx()
        return spotifyConfig.ensureString("id"), spotifyConfig.ensureString("secret")

    @staticmethod
    def getSpotifyAuth() -> Optional[SpotifyOAuth]: # pylint: disable=invalid-name
        """Returns the SpotifyOAuth object"""
        if SpotifyAuth.isDisabled():
            return None
        id_, secret = SpotifyAuth._getSpotifyAuthData()
        return SpotifyOAuth(id_, secret, "http://reap.ml/", scope = SCOPE)

    async def callbackHandler(self, request: web.Request) -> None:
        """Handles the callback from Spotify"""
        code = request.query.get("code")
        await self.getSpotifyToken(code)

        # redirect to /
        return web.HTTPFound("/")

    async def getSpotifyToken(self, code: str) -> Optional[str]:
        """Returns the Spotify Token"""
        if SpotifyAuth.isDisabled():
            return None

        clientId, secret = SpotifyAuth._getSpotifyAuthData()

        async with aiohttp.ClientSession() as session:
            async with session.post("https://accounts.spotify.com/api/token", data = {
                "grant_type": "authorization_code",
                "code": code,
                "redirect_uri": REDIRECT
            }, headers = {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " + base64.b64encode(f"{clientId}:{secret}".encode("utf-8"))
                                                  .decode("utf-8")
            }) as resp:
                print("getSpotifyData", resp.status)
                if resp.status == 200:
                    data = await resp.json()

                    data["expires_at"] = data["expires_in"] + int(time())

                    with open(".cache", "w", encoding = "utf8") as file:
                        file.write(json.dumps(data))

                    return data["access_token"]

                return None
