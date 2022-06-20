# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

from typing import Any, Callable, Iterable, Optional
from threading import Thread
import asyncio
from queue import Queue


async def asyncRunInThread(target: Callable, *args: Optional[Iterable[Any]]) -> None: # type: ignore
    t1: Thread = Thread(target = target, args = args)
    t1.start()
    while t1.is_alive():
        await asyncio.sleep(1)

async def asyncRunInThreadWithReturn(target: Callable, *args: Optional[Iterable[Any]]) -> Any: # type: ignore
    q: Queue[Any] = Queue()

    def _implement() -> None:
        ret = target(*args) if args else target()
        q.put_nowait(ret)

    t1 = Thread(target = _implement)
    t1.start()
    while t1.is_alive():
        await asyncio.sleep(1)
    return q.get_nowait()
