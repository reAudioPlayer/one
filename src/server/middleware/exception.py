# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = "Copyright (c) 2022 https://github.com/reAudioPlayer"

from queue import Empty
from typing import Awaitable, Callable, Optional
import logging
import time

from aiohttp import web
from aiohttp.web import middleware

@middleware
async def exceptionMiddleware(request: web.Request,
                              handler: Callable[[web.Request],
                                                Awaitable[web.StreamResponse]]) -> web.StreamResponse:
    logger = logging.getLogger("exceptionMiddleware")
    start = time.time()
    resp: Optional[web.StreamResponse] = None
    try:
        resp = await handler(request)
    except web.HTTPException as exc:
        logger.error("%s %s -> (%s)", request.method, request.path, exc.status)
        resp = exc
    except Exception as exc: # pylint: disable=broad-except
        logger.error("%s %s -> (%s)", request.method, request.path, exc)
        resp = web.Response(status = 500, text = str(exc))
    logger.debug("%s %s (%s s) -> %d", request.method, request.path, time.time() - start, resp.status)
    assert resp is not None
    return resp
