# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
from __future__ import annotations
__copyright__ = "Copyright (c) 2022 https://github.com/reAudioPlayer"

from typing import Any, Dict, Optional
import re
import requests

from bs4 import BeautifulSoup # type: ignore


class Match:
    """Match model"""
    def __init__(self, url: str) -> None:
        self._url: str = url
        self._html: Optional[str] = None
        self._soup: Optional[BeautifulSoup] = None
        self._team1: Optional[str]  = None
        self._team2: Optional[str]  = None
        self._result: Optional[str]  = None
        self._competition: Optional[str]  = None
        self._date: Optional[str]  = None
        self._progress: Optional[str]  = None
        self._sport: Optional[str]  = None
        self._sref: str  = self._url
        self._oref: str  = self._url
        self._icon: Optional[str]  = None

    def toJson(self) -> Dict[str, Any]:
        """serialise"""
        return {
            "href": self._url,
            "sref": self._sref,
            "oref": self._oref,
            "team1": self._team1,
            "team2": self._team2,
            "result": self._result,
            "progress": self._progress,
            "competition": self._competition,
            "sport": self._sport,
            "sportIcon": self._icon,
            "date": self._date
        }


class OneFootballMatch(Match):
    """https://www.onefootball.com/"""
    def __init__(self, url: str) -> None:
        if "/team" in url:
            nurl = OneFootballTeam.getFirstMatch(url)
        if "/competition" in url:
            nurl = OneFootballTeam.getFirstMatch(url)
        super().__init__(nurl)
        self._sref = url
        self._html = requests.get(nurl, timeout = 10).text
        self._soup = BeautifulSoup(self._html, "html.parser")
        section = self._soup.find("div", class_="match-score__main")
        teams = section.find_all("of-match-score-team")
        self._team1 = str(teams[0])
        self._team2 = str(teams[1])
        if section.find("p", class_="match-score-scores"):
            self._result = section.find("p", class_="match-score-scores").text
        else:
            self._result = section.find("time", class_="match-score__kickoff-date")\
                                  .find("span").text.replace("00:00:00", "")
        aggregate = section.find("p", class_="match-score__aggregated-score")
        if aggregate:
            txt = aggregate.text.removesuffix(" ").removeprefix(" ").replace("-", ":")
            assert self._result is not None
            self._result += f"<br><p class='accent additional-result'>({txt})</p>"
        self._sport = "Football"
        self._icon = "sports_soccer"
        progress = section.find("div", class_="match-score__data")\
                          .find("span", class_="title-7-medium")
        if not progress:
            progress = section.find("div", class_="match-score__data")\
                              .find("span", class_="match-score__highlighted-text")
        self._progress = progress.text

        competition = self._soup.find("span", class_="match-info__entry-subtitle")
        self._competition = competition.text
        competition.decompose()
        self._date = self._soup.find("span", class_="match-info__entry-subtitle")\
                               .text.removesuffix(" ").removeprefix(" ")


class OneFootballTeam:
    """https://www.onefootball.com/ (team)"""
    @staticmethod
    def getFirstMatch(url: str) -> str:
        """gets the first match of the specified team"""
        if not url.endswith("/fixtures"):
            url += "/fixtures"
        html = requests.get(url, timeout = 10).text
        soup = BeautifulSoup(html, "html.parser")
        matches = soup.find_all("a", class_="match-card", href=True)
        href: Optional[str] = None
        for match in matches:
            if not match.find("span", text=" Full time "):
                href = match["href"]
                break
            if match.find("time", text=re.compile(r"(.*)Yesterday(.*)")):
                href = match["href"]
                break
        if not isinstance(href, str):
            for match in matches:
                href = match["href"]
                break
        assert href is not None
        return "https://onefootball.com" + href


hashLookup: Dict[str, Dict[str, str]] = { }
