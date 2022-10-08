# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

from typing import Any, Callable, Iterable, Optional
from threading import Thread
import asyncio
from queue import Queue


async def asyncRunInThread(target: Callable, *args: Optional[Iterable[Any]]) -> None: # type: ignore
    """runs the callable in a thread while providing an async interface for it"""
    thread: Thread = Thread(target = target, args = args)
    thread.start()
    while thread.is_alive():
        await asyncio.sleep(1)

async def asyncRunInThreadWithReturn(target: Callable, # type: ignore
                                     *args: Optional[Iterable[Any]]) -> Any:
    """
    runs the callable in a thread while providing an async interface for it
    (allows return value)
    """
    queue: Queue[Any] = Queue()

    def _implement() -> None:
        ret = target(*args) if args else target()
        queue.put_nowait(ret)

    thread = Thread(target = _implement)
    thread.start()
    while thread.is_alive():
        await asyncio.sleep(1)
    return queue.get_nowait()
