from typing import List, Union
from aiohttp import web
from meta.scorereader import CEVMatch, OneFootballMatch
from helpers.asyncThread import asyncRunInThreadWithReturn
import asyncio
import traceback


class SportsHandler:
    async def getMatch(self, request: web.Request):
        jdata = await request.json()
        urls = jdata.get("urls") or [ ]
        def implement(url: str) -> List[dict]:
            try:
                if "onefootball" in url:
                    return [ OneFootballMatch(url).toJson() ]
                if "cev" in url:
                    if "/calendar/" in url:
                        return CEVMatch.FromCalendarV2(url)
                    return [ CEVMatch(url).toJson() ]
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
            data.extend(await asyncRunInThreadWithReturn(implement, url))

        tasks = [ ]

        for url in urls:
            tasks.append(implementAsync(url))

        await asyncio.gather(*tasks)

        if isinstance(data, list):
            return web.json_response(data = data)
        return web.Response(status = 500)
