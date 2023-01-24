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
import asyncio

import aiohttp
from aiohttp import web
from pyaddict import JDict
from spotipy.oauth2 import  SpotifyOAuth # type: ignore

from config.runtime import Runtime
from helper.cacheDecorator import clearCache


SCOPE = "user-library-read user-follow-read user-follow-modify"
REDIRECT = "http://localhost:1234/api/spotify/callback"


class SpotifyAuth:
    """Handles Spotify Authentication"""
    def __init__(self) -> None:
        self._attemptedClientAuth = False

        async def _auth() -> None:
            if await self.shouldAuth():
                self._openSpotifyAuth()
        asyncio.create_task(_auth())

    async def _refresh(self, token: str) -> bool:
        """attempts to use the refresh token to get a new access token"""
        # spotify api docs: https://developer.spotify.com/documentation/general/guides/authorization-guide/#refreshing-access-tokens # pylint: disable=line-too-long
        async with aiohttp.ClientSession() as session:
            async with session.post("https://accounts.spotify.com/api/token", data = {
                "grant_type": "refresh_token",
                "refresh_token": token
            }, headers = {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": SpotifyAuth._getSpotifyAuthHeader()
            }) as response:
                if response.status != 200:
                    return False

                data = await response.json()
                with open(".cache", "w", encoding = "utf8") as file:
                    file.write(json.dumps(data))
                return True

    async def shouldAuth(self) -> bool:
        """Returns if the user should be authenticated"""
        if SpotifyAuth.isDisabled():
            print("Spotify is disabled")
            return False

        if not os.path.isfile(".cache"):
            print("Spotify is not authenticated")
            return True

        with open(".cache", "r", encoding = "utf8") as file:
            data = json.loads(file.read())

        if not JDict(data).ensure("expires_at", int) < time():
            return False

        return not await self._refresh(JDict(data).ensure("refresh_token", str))

    def isAuth(self) -> bool:
        """Returns if the user is authenticated"""
        return os.path.isfile(".cache")

    @property
    def authorizeUrl(self) -> str:
        """Returns the Spotify Authorize Url"""
        clientId, _ = SpotifyAuth._getSpotifyAuthData()
        return f"https://accounts.spotify.com/authorize?client_id={clientId}&response_type=code&redirect_uri={REDIRECT}&scope={SCOPE}" # pylint: disable=line-too-long

    def _openSpotifyAuth(self) -> None:
        webbrowser.open(self.authorizeUrl)

    @staticmethod
    def isDisabled() -> bool:
        """Returns True if Spotify is disabled"""
        authData = SpotifyAuth._getSpotifyAuthData()
        return Runtime.args.noSpotify or bool("restricted" in authData) or bool("" in authData)

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
        spotifyConfig = Runtime.spotifyConfig() or JDict()
        return spotifyConfig.ensure("id", str), spotifyConfig.ensure("secret", str)

    @staticmethod
    def _getSpotifyAuthHeader() -> Optional[str]:
        """Returns the Spotify Auth Header"""
        if SpotifyAuth.isDisabled():
            return None

        clientId, secret = SpotifyAuth._getSpotifyAuthData()
        return "Basic " + \
            base64.b64encode(f"{clientId}:{secret}"\
                .encode("utf-8")).decode("utf-8")

    @staticmethod
    def getSpotifyAuth() -> Optional[SpotifyOAuth]: # pylint: disable=invalid-name
        """Returns the SpotifyOAuth object"""
        if SpotifyAuth.isDisabled():
            return None
        id_, secret = SpotifyAuth._getSpotifyAuthData()
        return SpotifyOAuth(id_, secret, "localhost", scope = SCOPE)

    async def getSpotifyConfig(self, _: web.Request) -> web.Response:
        """get(/api/config/spotify)"""
        if SpotifyAuth.isDisabled():
            return web.HTTPNoContent()

        if not self.isAuth():
            return web.HTTPUnauthorized()

        id_, secret = SpotifyAuth._getSpotifyAuthData()
        return web.json_response({
            "id": id_,
            "secret": secret
        })

    async def clientSideAuthHandler(self, _: web.Request) -> web.Response:
        """Returns the client side auth data"""
        if os.path.isfile(".cache"):
            return web.HTTPNoContent()
        if not await self.shouldAuth():
            return web.HTTPExpectationFailed()
        if self._attemptedClientAuth:
            return web.HTTPUnauthorized()

        async def _reset() -> None:
            await asyncio.sleep(10)
            self._attemptedClientAuth = False

        asyncio.create_task(_reset())

        self._attemptedClientAuth = True

        # redirect to spotify auth
        return web.Response(text = self.authorizeUrl)

    async def callbackHandler(self, request: web.Request) -> web.Response:
        """Handles the callback from Spotify"""
        code = request.query.get("code")

        if not isinstance(code, str):
            return web.HTTPBadRequest()

        await self.getSpotifyToken(code)

        # redirect to /
        return web.HTTPFound("/")

    async def getSpotifyToken(self, code: str) -> Optional[str]:
        """Returns the Spotify Token"""
        if SpotifyAuth.isDisabled():
            return None

        async with aiohttp.ClientSession() as session:
            async with session.post("https://accounts.spotify.com/api/token", data = {
                "grant_type": "authorization_code",
                "code": code,
                "redirect_uri": REDIRECT
            }, headers = {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": SpotifyAuth._getSpotifyAuthHeader()
            }) as resp:
                if resp.status == 200:
                    data = await resp.json()

                    data["expires_at"] = data["expires_in"] + int(time())

                    with open(".cache", "w", encoding = "utf8") as file:
                        file.write(json.dumps(data))

                    clearCache()
                    return JDict(data).ensure("access_token", str)

                return None

    def invalidate(self) -> None:
        """Invalidates the cached Spotify Token"""
        if os.path.isfile(".cache"):
            os.remove(".cache")
