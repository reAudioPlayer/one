# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

from functools import wraps
import asyncio
from typing import Any, Awaitable, Callable, Union
from aiohttp import Payload, web

def useCache(expire: int) -> Callable[[Callable[[Any],
        Awaitable[web.Response]]], Callable[[Any, Any], Awaitable[web.Response]]]:
    """caches the response for a specified time"""
    def _implement(function: Callable[[Any],
            Awaitable[web.Response]]) -> Callable[[Any, Any], Awaitable[web.Response]]:
        cache: Union[bytes, Payload, None] = None

        @wraps(function)
        async def _wrapper(*args: Any, **kwargs: Any) -> web.Response:
            nonlocal cache

            if cache is None:
                print("cache empty")
                cache = (await function(*args, **kwargs)).body

                async def invalidateCache() -> None:
                    nonlocal cache
                    await asyncio.sleep(expire)
                    cache = None

                asyncio.create_task(invalidateCache())

            assert not isinstance(cache, Payload)
            return web.json_response(body = cache)
        return _wrapper
    return _implement
