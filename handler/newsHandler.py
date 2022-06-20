# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

from typing import Any, Dict, List, Union
from aiohttp import web
from meta.articlereader import BBCArticle, CNNArticle, GuardianArticle, IndependentArticle, YourEdmArticle
from meta.feedreader import Article, Feed
from helpers.asyncThread import asyncRunInThreadWithReturn
from helpers.cacheDecorator import useCache


class NewsHandler:
    @useCache(1800) # type: ignore
    async def getSomeNews(self, _: web.Request) -> web.Response:
        def implement() -> List[Article]:
            return Feed.TakeFromAll(4)
        data = await asyncRunInThreadWithReturn(implement)
        return web.json_response(data = data)

    async def getArticle(self, request: web.Request) -> web.Response:
        def implement() -> Union[str, Dict[str, Any]]:
            url = Article.UrlFromHash(request.match_info['hash'])
            if url is None:
                return "404"
            if "guardian" in url:
                return GuardianArticle(url).toJson()
            elif "independent" in url:
                return IndependentArticle(url).toJson()
            elif "bbc" in url:
                return BBCArticle(url).toJson()
            elif "cnn" in url:
                return CNNArticle(url).toJson()
            elif "youredm" in url:
                return YourEdmArticle(url).toJson()
            else:
                return url
        data = await asyncRunInThreadWithReturn(implement)
        if isinstance(data, dict):
            return web.json_response(data = data)
        if isinstance(data, str):
            return web.Response(status = 400, text = data)
        return web.Response(status = 500)
