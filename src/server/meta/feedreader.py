# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
from __future__ import annotations
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

from enum import Enum
from typing import Dict, Any, List, Optional
import hashlib

import feedparser # type: ignore

from helper.dictTool import DictEx


HASH_LOOKUP = { }


class Article:
    """Feedreader Article"""
    def __init__(self, entry: Dict[str, Any], feedTitle: str) -> None:
        dex = DictEx(entry)
        self._title = dex.ensureString("title")
        self._author = dex.ensureString("author")
        self._summary = dex.ensureString("summary")
        self._link = dex.ensureString("link")
        self._href = hashlib.md5(self._link.encode('utf-8')).hexdigest()
        HASH_LOOKUP[self._href] = self._link
        self._updated = dex.ensureString("updated")
        self._mediaContent = dex.ensureList("media_content") or [ ]
        self._feedTitle = feedTitle.replace('"when:24h allinurl:', '')\
                                   .replace('" - Google News', '')
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
        """serialise"""
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
    def urlFromHash(key: str) -> Optional[str]:
        """looks the hash up"""
        if not bool(HASH_LOOKUP):
            Feed.takeFromAll(4)
        return HASH_LOOKUP.get(key)


class Feed(Enum):
    """RSS Feed wrapper"""
    @classmethod
    def take(cls, url: Feed, count: int, offset: int = 0) -> List[Article]:
        """take [count] articles from the [url] feed"""
        feed = feedparser.parse(url.value)
        return [ Article(entry, DictEx(feed).ensureDictChain("feed").ensureString("title"))
                 for (index, entry) in enumerate(feed.entries)
                 if offset <= index < (count + offset) ]

    Goal = "https://news.google.com/rss/search?q=when:24h+allinurl:goal.com&ceid=US:en&hl=en-US&gl=US" # pylint: disable=line-too-long
    Reuters = "https://news.google.com/rss/search?q=when:24h+allinurl:reuters.com&ceid=US:en&hl=en-US&gl=US" # pylint: disable=line-too-long

    CNN = "http://rss.cnn.com/rss/edition_world.rss"
    BBC = "http://feeds.bbci.co.uk/news/world/rss.xml"
    Guardian = "https://www.theguardian.com/world/rss"
    Independent = "https://www.independent.co.uk/news/world/rss"

    EdmReviewer = "https://edmreviewer.com/feed/"
    YourEDM = "https://www.youredm.com/feed/"

    @classmethod
    def takeFromAll(cls, countPerFeed: int, offsetPerFeed: int = 0) -> List[Dict[str, Any]]:
        """take [countPerFeed] articles from all hard-coded feeds"""
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
            x.extend([ entry.toJson() for entry in Feed.take(feed, countPerFeed, offsetPerFeed) ])
        return x
