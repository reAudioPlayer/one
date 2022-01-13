from functools import wraps
import asyncio
from typing import Callable, Optional
from aiohttp import web

def useCache(expire: int):
    def inner_function(function: Callable[[web.Request], web.Response]):
        cache: Optional[dict] = None

        @wraps(function)
        async def wrapper(*args, **kwargs):
            nonlocal cache

            if cache is None:
                print("cache empty")
                cache = (await function(*args, **kwargs)).body

                async def invalidateCache() -> None:
                    nonlocal cache
                    await asyncio.sleep(expire)
                    cache = None

                asyncio.create_task(invalidateCache())

            return web.json_response(body= cache)
        return wrapper
    return inner_function
