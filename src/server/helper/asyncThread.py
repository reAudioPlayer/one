# -*- coding: utf-8 -*-
"""cevlib"""
__copyright__ = "Copyright (c) 2022 https://github.com/dxstiny"

from typing import Any, Callable, TypeVar, cast
from threading import Thread
import asyncio
from queue import Queue

T = TypeVar("T")


async def asyncRunInThread(target: Callable[..., None],
                           *args: Any) -> None:
    """runs the callable in a thread while providing an async interface for it"""
    thread = Thread(target = target, args = args)
    thread.start()
    while thread.is_alive():
        await asyncio.sleep(1)

async def asyncRunInThreadWithReturn(target: Callable[..., T],
                                     *args: Any) -> T:
    """
    runs the callable in a thread while providing an async interface for it
    (allows return value)
    """
    queue: Queue[Any] = Queue()
    excQueue: Queue[BaseException] = Queue()

    def _implement() -> None:
        try:
            ret = target(*args) if args else target()
            queue.put_nowait(ret)
        except BaseException as exc:
            excQueue.put_nowait(exc)

    thread = Thread(target = _implement)
    thread.start()
    while thread.is_alive():
        await asyncio.sleep(1)
    if not excQueue.empty():
        raise excQueue.get_nowait()
    return cast(T, queue.get_nowait())
