import threading
from typing import Any, Callable, List, Optional
from threading import Thread
import asyncio
from queue import Queue


async def asyncRunInThread(target: Callable, args: Optional[List[Any]]) -> None:
    t1 = Thread(target = target, args = args)
    t1.start()
    while t1.is_alive():
        await asyncio.sleep(1)

async def asyncRunInThreadWithReturn(target: Any, *args) -> Any:
    q = Queue()

    def _implement() -> None:
        ret = target(*args) if args else target()
        q.put_nowait(ret)

    t1 = Thread(target = _implement)
    t1.start()
    while t1.is_alive():
        await asyncio.sleep(1)
    return q.get_nowait()
