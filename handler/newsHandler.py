# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

from typing import Union
from aiohttp import web
from meta.articlereader import BBCArticle, CNNArticle, GuardianArticle, IndependentArticle, YourEdmArticle
from meta.feedreader import Article, Feed
from helpers.asyncThread import asyncRunInThreadWithReturn
from helpers.cacheDecorator import useCache


class NewsHandler:
    @useCache(1800)
    async def getSomeNews(self, _: web.Request):
        def implement() -> dict:
            return Feed.TakeFromAll(4)
        data = await asyncRunInThreadWithReturn(implement)
        return web.json_response(data = data)

    async def getArticle(self, request: web.Request):
        def implement() -> Union[str, dict]:
            url = Article.UrlFromHash(request.match_info['hash'])
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
