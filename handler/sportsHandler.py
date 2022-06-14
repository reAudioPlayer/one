# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

from typing import List
from aiohttp import web
from meta.scorereader import CEVMatch, OneFootballMatch
from helpers.asyncThread import asyncRunInThreadWithReturn
import asyncio
import traceback


class SportsHandler:
    async def getVolleyMatch(self, request: web.Request):
        match = await CEVMatch.FromHash(request.match_info['hash'])
        return web.json_response(match.toJson())

    async def getMatch(self, request: web.Request):
        jdata = await request.json()
        urls = jdata.get("urls") or [ ]
        async def implement(url: str) -> List[dict]:
            try:
                if "onefootball" in url:
                    match = await asyncRunInThreadWithReturn(OneFootballMatch, url)
                    return [ match.toJson() ]
                if "cev" in url:
                    return [ ]
                    if "/calendar/" in url:
                        return await CEVMatch.FromCalendar()
                    return await CEVMatch.AddRange([url], url)
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

        if isinstance(data, list):
            return web.json_response(data = data)
        return web.Response(status = 500)
