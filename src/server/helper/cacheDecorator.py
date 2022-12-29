# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

from functools import wraps
import asyncio
from typing import Any, Awaitable, Callable, Dict
from datetime import datetime, timedelta

from aiohttp import web


Function = Callable[[Any], Awaitable[web.Response]]


class CacheEntry:
    """cache entry"""
    def __init__(self,
                 response: web.Response,
                 expires: int) -> None:

        self._response = response
        self._expires = expires
        self._date = datetime.now()

    @property
    def initialResponse(self) -> web.Response:
        """returns the initial response"""
        return self._response

    def clone(self) -> web.Response:
        """clones the response"""
        expireStamp = self._date + timedelta(seconds = self._expires)
        return web.Response(body = self._response.body, status = self._response.status,
            headers={
                **self._response.headers,
                **{
                    "X-Cache-Control": f"max-age={self._expires}",
                    "X-Cache": "HIT",
                    "X-Expires": expireStamp.strftime("%a, %d %b %Y %H:%M:%S GMT")
                }
            })


_CACHE: Dict[Function, CacheEntry] = { }
_INVALIDATION_TASKS: Dict[Function, asyncio.Task[None]] = { }


def useCache(expire: int) -> Callable[[
                                    Callable[
                                        [Any],
                                        Awaitable[web.Response]
                                    ]
                                ],
                                Callable[
                                    [Any, Any],
                                    Awaitable[web.Response]
                                ]]:
    """caches the response for a specified time"""
    def _implement(function: Function) -> Callable[[Any, Any], Awaitable[web.Response]]:

        @wraps(function)
        async def _wrapper(*args: Any, **kwargs: Any) -> web.Response:
            # args can be (self, request) or (request)
            request: web.Request = args[1] if len(args) > 1 else args[0]

            noCache = request.headers.get("X-Cache-Control") == "no-cache"
            if noCache:
                print("cache bypassed")
                if function in _INVALIDATION_TASKS:
                    _INVALIDATION_TASKS[function].cancel()
                    del _INVALIDATION_TASKS[function]
            elif function in _CACHE:
                print("cache hit")
                return _CACHE[function].clone()

            print("cache miss")
            _CACHE[function] = CacheEntry(await function(*args, **kwargs), expire)

            async def invalidateCache() -> None:
                await asyncio.sleep(expire)
                del _CACHE[function]

            _INVALIDATION_TASKS[function] = asyncio.create_task(invalidateCache())
            return _CACHE[function].initialResponse
        return _wrapper
    return _implement

def clearCache() -> None:
    """clears the cache"""
    print("clearing cache")
    _CACHE.clear()
    for task in _INVALIDATION_TASKS.values():
        task.cancel()
    _INVALIDATION_TASKS.clear()
