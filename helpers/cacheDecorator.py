# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

from functools import wraps
import asyncio
from typing import Any, Awaitable, Callable, Iterable, Union
from aiohttp import Payload, web

def useCache(expire: int) -> Callable[[Callable[[Any], Awaitable[web.Response]]], Callable[[Any, Any], Awaitable[web.Response]]]:
    def inner_function(function: Callable[[Any], Awaitable[web.Response]]) -> Callable[[Any, Any], Awaitable[web.Response]]:
        cache: Union[bytes, Payload, None] = None

        @wraps(function)
        async def wrapper(*args: Any, **kwargs: Any) -> web.Response:
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
        return wrapper
    return inner_function
