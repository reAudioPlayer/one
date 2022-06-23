# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
from __future__ import annotations
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

from enum import Enum
from typing import Dict, Any, List, Optional
import feedparser # type: ignore
import hashlib

from helper.dictTool import DictEx


hashLookup = { }


class Article:
    def __init__(self, entry: Dict[str, Any], feedTitle: str) -> None:
        dex = DictEx(entry)
        self._title = dex.ensureString("title")
        self._author = dex.ensureString("author")
        self._summary = dex.ensureString("summary")
        self._link = dex.ensureString("link")
        self._href = hashlib.md5(self._link.encode('utf-8')).hexdigest()
        hashLookup[self._href] = self._link
        self._updated = dex.ensureString("updated")
        self._mediaContent = dex.ensureList("media_content") or [ ]
        self._feedTitle = feedTitle.replace('"when:24h allinurl:', '').replace('" - Google News', '')
        self._image: Optional[str] = None
        bestQuality = 0
        for image in self._mediaContent:
            dex = DictEx(image)
            if image.get("width"):
                quality = dex.ensureInt("width")
                if quality > bestQuality:
                    bestQuality = quality
                    self._image = dex.ensureString("url")
            else:
                self._image = dex.ensureString("url")

    def toJson(self) -> Dict[str, Any]:
        return {
            "title": self._title,
            "author": self._author,
            "summary": self._summary,
            "link": f"/news/{self._href}",
            "image": self._image,
            "updated": self._updated,
            "source": self._feedTitle
        }

    @staticmethod
    def UrlFromHash(key: str) -> Optional[str]:
        if not len(hashLookup):
            Feed.TakeFromAll(4)
        return hashLookup.get(key)


class Feed(Enum):
    @classmethod
    def Take(self, url: Feed, count: int, offset: int = 0) -> List[Article]:
        feed = feedparser.parse(url.value)
        return [ Article(entry, DictEx(feed).ensureDictChain("feed").ensureString("title"))
                 for (index, entry) in enumerate(feed.entries)
                 if offset < index < (count + offset) ]

    Goal = "https://news.google.com/rss/search?q=when:24h+allinurl:goal.com&ceid=US:en&hl=en-US&gl=US"
    Reuters = "https://news.google.com/rss/search?q=when:24h+allinurl:reuters.com&ceid=US:en&hl=en-US&gl=US"

    CNN = "http://rss.cnn.com/rss/edition_world.rss"
    BBC = "http://feeds.bbci.co.uk/news/world/rss.xml"
    Guardian = "https://www.theguardian.com/world/rss"
    Independent = "https://www.independent.co.uk/news/world/rss"

    EdmReviewer = "https://edmreviewer.com/feed/"
    YourEDM = "https://www.youredm.com/feed/"

    @classmethod
    def TakeFromAll(self, countPerFeed: int, offsetPerFeed: int = 0) -> List[Dict[str, Any]]:
        feeds = [
            Feed.EdmReviewer,
            Feed.YourEDM,
            Feed.Guardian,
            Feed.Independent,
            Feed.BBC,
            Feed.CNN,
            Feed.Reuters,
            Feed.Goal,
        ]
        x: List[Dict[str, Any]] = []
        for feed in feeds:
            x.extend([ entry.toJson() for entry in Feed.Take(feed, countPerFeed, offsetPerFeed) ])
        return x
