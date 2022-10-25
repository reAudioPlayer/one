# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

from typing import Any, Dict, List, Union
from aiohttp import web
from meta.articlereader import BBCArticle, \
                               CNNArticle, \
                               GuardianArticle, \
                               IndependentArticle, \
                               YourEdmArticle
from meta.feedreader import Article, Feed
from helper.asyncThread import asyncRunInThreadWithReturn
from helper.cacheDecorator import useCache


class NewsHandler:
    """news handler"""
    @useCache(1800) # type: ignore
    async def getSomeNews(self, _: web.Request) -> web.Response:
        """get(/api/news/articles)"""
        def implement() -> List[Dict[str, Any]]:
            return Feed.takeFromAll(4)
        data = await asyncRunInThreadWithReturn(implement)
        return web.json_response(data = data)

    async def getArticle(self, request: web.Request) -> web.Response:
        """get(/api/news/articles/{hash})"""
        def implement() -> Union[str, Dict[str, Any]]:
            url = Article.urlFromHash(request.match_info['hash'])
            if url is None:
                return "404"
            if "guardian" in url:
                return GuardianArticle(url).toJson()
            if "independent" in url:
                return IndependentArticle(url).toJson()
            if "bbc" in url:
                return BBCArticle(url).toJson()
            if "cnn" in url:
                return CNNArticle(url).toJson()
            if "youredm" in url:
                return YourEdmArticle(url).toJson()
            return url
        data = await asyncRunInThreadWithReturn(implement)
        if isinstance(data, dict):
            return web.json_response(data = data)
        if isinstance(data, str):
            return web.Response(status = 400, text = data)
