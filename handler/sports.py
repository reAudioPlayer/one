# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

from typing import Any, Dict, List
from aiohttp import web
from meta.scorereader import OneFootballMatch
from helper.asyncThread import asyncRunInThreadWithReturn
import asyncio
import traceback


class SportsHandler:
    async def getMatch(self, request: web.Request) -> web.Response:
        jdata = await request.json()
        urls = jdata.get("urls") or [ ]
        async def implement(url: str) -> List[Dict[str, Any]]:
            try:
                if "onefootball" in url:
                    match = await asyncRunInThreadWithReturn(OneFootballMatch, url)
                    return [ match.toJson() ]
            except Exception as e:
                traceback.print_exception(e)
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
