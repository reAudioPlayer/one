# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
from __future__ import annotations
__copyright__ = "Copyright (c) 2022 https://github.com/reAudioPlayer"

from enum import Enum
from typing import Dict, Any, List, Optional
import hashlib

from pyaddict import JDict
import feedparser # type: ignore


HASH_LOOKUP = { }


class Article:
    """Feedreader Article"""
    def __init__(self, entry: Dict[str, Any], feedTitle: str) -> None:
        dex = JDict(entry)
        self._title = dex.ensure("title", str)
        self._author = dex.ensure("author", str)
        self._summary = dex.ensure("summary", str)
        self._link = dex.ensure("link", str)
        self._href = hashlib.md5(self._link.encode('utf-8')).hexdigest()
        HASH_LOOKUP[self._href] = self._link
        self._updated = dex.ensure("updated", str)
        self._mediaContent = dex.ensure("media_content", list)
        self._feedTitle = feedTitle.replace('"when:24h allinurl:', '')\
                                   .replace('" - Google News', '')
        self._image: Optional[str] = None
        bestQuality = 0
        for image in self._mediaContent:
            dex = JDict(image)
            if image.get("width"):
                quality = dex.ensure("width", int)
                if quality > bestQuality:
                    bestQuality = quality
                    self._image = dex.ensure("url", str)
            else:
                self._image = dex.ensure("url", str)

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
        return [ Article(entry, JDict(feed).chain().ensure("feed.title", str))
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
