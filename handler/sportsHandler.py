from typing import Union
from aiohttp import web
from meta.scorereader import CEVMatch, OneFootballMatch
from helpers.asyncThread import asyncRunInThreadWithReturn
import asyncio


class SportsHandler:
    async def getMatch(self, request: web.Request):
        jdata = await request.json()
        urls = jdata.get("urls") or [ ]
        def implement(url: str) -> Union[str, dict]:
            if "onefootball" in url:
                return OneFootballMatch(url).toJson()
            if "cev" in url:
                return CEVMatch(url).toJson()
            else:
                return url
        data = [ ]
        async def implementAsync(url: str) -> None:
            data.append(await asyncRunInThreadWithReturn(implement, url))

        tasks = [ ]

        for url in urls:
            tasks.append(implementAsync(url))

        await asyncio.gather(*tasks)

        if isinstance(data, list):
            return web.json_response(data = data)
        return web.Response(status = 500)
