from __future__ import annotations

from enum import Enum
from typing import List, Optional
import feedparser
import hashlib


hashLookup = { }


class Article:
    def __init__(self, entry: dict, feedTitle: str) -> None:
        self._title = entry.get("title")
        self._author = entry.get("author")
        self._summary = entry.get("summary")
        self._link = entry.get("link")
        self._href = hashlib.md5(self._link.encode('utf-8')).hexdigest()
        hashLookup[self._href] = self._link
        self._updated = entry.get("updated")
        self._mediaContent = entry.get("media_content") or [ ]
        self._feedTitle = feedTitle.replace('"when:24h allinurl:', '').replace('" - Google News', '')
        self._image: Optional[None] = None
        bestQuality = 0
        for image in self._mediaContent:
            if image.get("width"):
                quality = int(image.get("width"))
                if quality > bestQuality:
                    bestQuality = quality
                    self._image = image.get("url")
            else:
                self._image = image.get("url")

    def toJson(self) -> dict:
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
        return [ Article(entry, feed.get("feed")["title"]) for (index, entry) in enumerate(feed.entries) if index < (count + offset) and index >= offset ]

    Goal = "https://news.google.com/rss/search?q=when:24h+allinurl:goal.com&ceid=US:en&hl=en-US&gl=US"
    Reuters = "https://news.google.com/rss/search?q=when:24h+allinurl:reuters.com&ceid=US:en&hl=en-US&gl=US"

    CNN = "http://rss.cnn.com/rss/edition_world.rss"
    BBC = "http://feeds.bbci.co.uk/news/world/rss.xml"
    Guardian = "https://www.theguardian.com/world/rss"
    Independent = "https://www.independent.co.uk/news/world/rss"

    EdmReviewer = "https://edmreviewer.com/feed/"
    YourEDM = "https://www.youredm.com/feed/"

    @classmethod
    def TakeFromAll(self, countPerFeed: int, offsetPerFeed: int = 0) -> List[Article]:
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
        x = []
        for feed in feeds:
            x.extend([ entry.toJson() for entry in Feed.Take(feed, countPerFeed, offsetPerFeed) ])
        return x
