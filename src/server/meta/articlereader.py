# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = "Copyright (c) 2022 https://github.com/reAudioPlayer"

from typing import Any, Dict, Optional, Union
from bs4 import BeautifulSoup # type: ignore
from bs4.element import Tag, NavigableString # type: ignore
import requests # TODO aiohttp


class Article:
    """News Article"""
    def __init__(self, url: str) -> None:
        self._url: str = url
        self._html = requests.get(self._url, timeout = 10).text
        self._soup = BeautifulSoup(self._html, "html.parser")
        self._topic: Optional[str] = None
        self._headline: Optional[str] = None
        self._standfirst: Optional[str] = None
        self._date: Optional[str] = None
        self._body: Optional[str] = None

    def toJson(self) -> Dict[str, Any]:
        """serialise"""
        return {
            "href": self._url,
            "topic": self._topic,
            "headline": self._headline,
            "standfirst": self._standfirst,
            "date": self._date,
            "body": self._body
        }


class GuardianArticle(Article):
    """https://www.theguardian.com/"""
    def __init__(self, url: str) -> None:
        super().__init__(url)

        topic = self._byName("title")
        self._topic = str(topic.a) if topic else "N/A"

        headline = self._byName("headline")
        self._headline = self._byName("headline").h1.string if headline else "N/A"

        standfirst = self._byName("standfirst")
        self._standfirst = self._byName("standfirst").p.string if standfirst else "N/A"

        if self._soup.find(attrs={"for":"dateToggle"}):
            self._date = self._soup.find(attrs={"for":"dateToggle"}).string
        else:
            address = self._soup.find("address")
            if address:
                self._date = address.find_next_sibling("div").string \
                             if address.find_next_sibling("div") \
                             else address.find_next_sibling("details").summary.string
            else:
                self._date = "N/A"
        self._body = str(self._soup.find(class_ = "article-body-viewer-selector"))

    def _byName(self, name: str) -> Union[Tag, NavigableString]:
        x = self._soup.find(attrs={"data-gu-name": name})
        assert x is not None
        return x


class IndependentArticle(Article):
    """https://www.independent.co.uk/"""
    def __init__(self, url: str) -> None:
        super().__init__(url)
        header = self._soup.find(id="articleHeader")
        self._topic = " > ".join([ str(a) for a in header.nav ])
        self._headline = header.h1.string
        self._standfirst = header.h2.string
        self._date = header.find("amp-timeago").string
        body = self._soup.find(id="main")
        for a in body.find_all("i-amphtml-sizer"):
            if isinstance(a, Tag):
                a.decompose()
        self._body = str(body).replace("<amp-img", "<img")


class BBCArticle(Article):
    """https://bbc.co.uk/"""
    def __init__(self, url: str) -> None:
        super().__init__(url)
        article = self._soup.find("article")
        self._headline = article.find(id="main-heading").string
        time = article.find("dl").find("time")
        time.find("span").decompose()
        self._date = time.string

        article.header.find("div").decompose()
        topic = article.header.find("div")
        topic.find("div").decompose()
        if topic.ul:
            self._topic = ", ".join([ tag.string for tag in topic.ul.find_all("a") ])

        article.header.decompose()
        for img in article.find_all("noscript"):
            img.name = "div"
        article.find("figcaption").find("span").decompose()
        divs = article.find_all("div", limit = 2, recursive = False)
        self._standfirst = "".join([ str(div) for div in divs ])
        for div in divs:
            div.decompose()
        article.find("div").decompose()
        article.find("div").decompose()
        self._body = str(article)

class CNNArticle(Article):
    """https://cnn.com/"""
    def __init__(self, url: str) -> None:
        super().__init__(url)
        article = self._soup.find("article")
        self._headline = article.find("h1", class_="pg-headline").string
        time = article.find("p", class_="update-time")
        time.find("span").decompose()
        self._date = time.string
        tryDecompose(article.find(class_="video__end-slate__secondary"))
        tryDecompose(article.find(class_="video__end-slate__tertiary-title"))
        tryDecompose(article.find("div", class_="cn-carousel-medium-strip"))
        tryDecompose(article.find(class_="zn__containers"))
        tryDecompose(article.find(class_="cn-list-hierarchical-small-horizontal"))
        tryDecompose(article.find(class_="pg-rail-tall__rail"))
        self._body = str(article.find("div", class_="pg-rail-tall__wrapper"))

def tryDecompose(tag: Optional[Tag]) -> None:
    """decompose if not none"""
    if tag:
        tag.decompose()


class YourEdmArticle(Article):
    """https://www.youredm.com/"""
    def __init__(self, url: str) -> None:
        super().__init__(url)
        self._headline = self._soup.find(class_="jeg_post_title").string
        self._date = str(self._soup.find(class_="jeg_meta_date").find("a").string)
        tags = self._soup.find(class_="jeg_post_tags").find_all("a")
        self._topic = ", ".join([ str(tag)
                                  for tag in tags ])
        self._soup.find(class_="jeg_post_tags").decompose()
        self._body = str(self._soup.find(class_="content-inner"))
