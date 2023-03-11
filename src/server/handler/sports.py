# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = "Copyright (c) 2022 https://github.com/reAudioPlayer"

from typing import Any, Dict, List
import asyncio
from aiohttp import web

from meta.scorereader import OneFootballMatch
from helper.asyncThread import asyncRunInThreadWithReturn
from helper.logged import Logged

class SportsHandler(Logged):
    """sports handler"""
    def __init__(self) -> None:
        super().__init__(self.__class__.__name__)

    async def getMatches(self, request: web.Request) -> web.Response:
        """get(/api/sports)"""
        jdata = await request.json()
        urls = jdata.get("urls") or [ ]
        async def implement(url: str) -> List[Dict[str, Any]]:
            try:
                if "onefootball" in url:
                    match = await asyncRunInThreadWithReturn(OneFootballMatch, url)
                    return [ match.toJson() ]
            except Exception as exc:
                self._logger.error("Error: %s", exc)
            return [{
                "href": url,
                "result": "N/A",
                "date": "N/A",
                "progress": "N/A",
                "sport": "N/A"
            }]

        data = [ ]

        async def implementAsync(url: str) -> None:
            data.extend( await implement(url) )

        tasks = [ ]

        for url in urls:
            tasks.append(implementAsync(url))

        await asyncio.gather(*tasks)
        return web.json_response(data = data)
