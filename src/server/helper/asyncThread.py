# -*- coding: utf-8 -*-
"""cevlib"""
__copyright__ = ("Copyright (c) 2022 https://github.com/dxstiny")

from typing import Any, Callable, Optional, TypeVar, cast, Iterable
from threading import Thread
import asyncio
from queue import Queue

T = TypeVar("T")


async def asyncRunInThread(target: Callable[[Any], None],
                           *args: Optional[Iterable[Any]]) -> None:
    """runs the callable in a thread while providing an async interface for it"""
    thread = Thread(target = target, args = args)
    thread.start()
    while thread.is_alive():
        await asyncio.sleep(1)

async def asyncRunInThreadWithReturn(target: Callable[[Any], T],
                                     *args: Optional[Iterable[Any]]) -> T:
    """
    runs the callable in a thread while providing an async interface for it
    (allows return value)
    """
    queue: Queue[Any] = Queue()

    def _implement() -> None:
        ret = target(*args) if args else target() # type: ignore
        queue.put_nowait(ret)

    thread = Thread(target = _implement)
    thread.start()
    while thread.is_alive():
        await asyncio.sleep(1)
    return cast(T, queue.get_nowait())
