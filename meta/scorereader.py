from __future__ import annotations
import asyncio
from typing import Dict, List
import requests
from bs4 import BeautifulSoup
import re
from datetime import datetime, timedelta
import traceback
from cevlib import match
from cevlib.types.results import Result
from cevlib.types.types import MatchState


class Match:
    def __init__(self, url) -> None:
        self._url = url
        self._html = None
        self._soup = None
        self._team1 = None
        self._team2 = None
        self._result = None
        self._competition = None
        self._date = None
        self._progress = None
        self._sport = None
        self._sref = self._url

    def toJson(self) -> dict:
        return {
            "href": self._url,
            "sref": self._sref,
            "team1": self._team1,
            "team2": self._team2,
            "result": self._result,
            "progress": self._progress,
            "competition": self._competition,
            "sport": self._sport,
            "date": self._date
        }


class OneFootballMatch(Match):
    def __init__(self, url) -> None:
        if "/team" in url:
            nurl = OneFootballTeam.GetFirstMatch(url)
        if "/competition" in url:
            nurl = OneFootballTeam.GetFirstMatch(url)
        super().__init__(nurl)
        self._sref = url
        self._html = requests.get(nurl).text
        self._soup = BeautifulSoup(self._html, "html.parser")
        section = self._soup.find("div", class_="match-score__main")
        teams = section.find_all("of-match-score-team")
        self._team1 = str(teams[0])
        self._team2 = str(teams[1])
        if section.find("p", class_="match-score-scores"):
            self._result = section.find("p", class_="match-score-scores").text
        else:
            self._result = section.find("time", class_="match-score__kickoff-date").find("span").text.replace("00:00:00", "")
        aggregate = section.find("p", class_="match-score__aggregated-score")
        if aggregate:
            txt = aggregate.text.removesuffix(" ").removeprefix(" ").replace("-", ":")
            self._result += f"<br><p class='accent additional-result'>({txt})</p>"
        self._sport = "Football"
        progress = section.find("div", class_="match-score__data").find("span", class_="title-7-medium")
        if not progress:
            progress = section.find("div", class_="match-score__data").find("span", class_="match-score__highlighted-text")
        self._progress = progress.text
        competition = self._soup.find("span", class_="match-info__entry-subtitle")
        self._competition = competition.text
        competition.decompose()
        self._date = self._soup.find("span", class_="match-info__entry-subtitle").text.removesuffix(" ").removeprefix(" ")


class OneFootballTeam:
    @staticmethod
    def GetFirstMatch(url: str) -> str:
        if not url.endswith("/fixtures"):
            url += "/fixtures"
        html = requests.get(url).text
        soup = BeautifulSoup(html, "html.parser")
        matches = soup.find_all("a", class_="match-card", href=True)
        href = None
        for match in matches:
            if not match.find("span", text=" Full time "):
                href = match["href"]
                break
            if match.find("time", text=re.compile(r"(.*)Yesterday(.*)")):
                href = match["href"]
                break
        return "https://onefootball.com" + href

cevMatchCache: Dict[str, CEVMatch] = { }
cevMatchMatchCache: List[match.Match] = [ ]


class CEVMatch(Match):
    def __init__(self, url, match: match.MatchCache, sref: str) -> None:
        super().__init__(url)
        self._sref = sref
        self._match = match
        self._team1 = self._getTeam(False)
        self._team2 = self._getTeam(True)
        self._date = self._getDate()
        self._progress = self._getProgress(match.state, match.duration, match.startTime)
        self._competition = match.competition.displayName
        self._result = self._getResult()
        self._sport = "Volleyball"

    def _getResult(self) -> str:
        if not self._match.state == MatchState.Upcoming:
            return CEVMatch.formatResult(self._match.currentScore)
        today = datetime.today()
        if today.date() == self._match.startTime.date():
            return self._match.startTime.strftime('%H:%M')
        tomorrow = today + timedelta(days = 1)
        if tomorrow.date() == self._match.startTime.date():
            return "Tomorrow"
        return self._match.startTime.strftime('%d/%m/%Y')

    def _getDate(self) -> str:
        today = datetime.today()
        if today.date() == self._match.startTime.date():
            return f"Today {self._match.startTime.strftime('%H:%M')}"
        tomorrow = today + timedelta(days = 1)
        if tomorrow.date() == self._match.startTime.date():
            return f"Tomorrow {self._match.startTime.strftime('%H:%M')}"
        return self._match.startTime.strftime("%d/%m/%Y %H:%M")

    @staticmethod
    def _getProgress(state: MatchState, duration: timedelta, startTime: datetime) -> str:
        if state == MatchState.Live:
            return str(round(duration.seconds / 60)) + "'"
        if state == MatchState.Finished:
            return "Full time"
        return startTime.strftime("%H:%M")

    def _getTeam(self, away: bool) -> str:
        team = self._match.awayTeam if away else self._match.homeTeam
        img = team.logo
        name = team.name
        aClass = "match-score-team"
        sClass = "match-score-team__name"
        if away:
            sClass += " match-score-team__name--away"
        else:
            aClass += " match-score-team--home"
        return f"<of-match-score-team><a class='{aClass}'><img class='teamlogo' src='{img}' /><span class='{sClass}'>{name}</span></a></of-match-score-team>"

    @staticmethod
    def formatResult(score: Result) -> str:
        setsFormatted =  ", ".join([ f"{set_.homeScore}:{set_.awayScore}" for set_ in score.sets ])
        if score.hasGoldenSet:
            return f"{score.homeScore}:{score.awayScore}<br><p class='accent additional-result'>({score.latestSet.homeScore}:{score.latestSet.awayScore})</p>"
        string = f"{score.homeScore}:{score.awayScore}"
        if setsFormatted:
            string += f"<br><p class='muted smaller additional-result'>({setsFormatted})</p>"
        return string

    @staticmethod
    async def update(match: match.Match, result: Result) -> None:
        #print(cevMatchCache, match.matchCentreLink, cevMatchCache.get(match.matchCentreLink))
        try:
            cevMatchCache[match.matchCentreLink]._result = CEVMatch.formatResult(result)
            cevMatchCache[match.matchCentreLink]._progress = CEVMatch._getProgress(await match.state(), await match.duration(), await match.startTime())
        except Exception as e:
            print(e)

    @staticmethod
    async def FromCalendar() -> List[CEVMatch]:
        url = "https://championsleague.cev.eu/LiveScores.json"
        jdata = requests.get(url).json()
        links = [ ]
        for competition in jdata.get("competitions"):
            for m in competition.get("matches"):
                links.append(m.get("matchCentreLink"))
        return await CEVMatch.AddRange(links, "https://www.cev.eu/calendar/")


    @staticmethod
    async def AddRange(links: str, sref: str) -> List[CEVMatch]:
        async def implement(match: match.Match, result: Result):
            await CEVMatch.update(match, result)

        tasks = [ ]
        results: List[match.Match] = [ ]

        async def getMatchByUrl(link) -> match.Match:
            try:
                return await match.Match.ByUrl(link)
            except:
                return None

        for link in links:
            if link not in cevMatchCache:
                tasks.append(getMatchByUrl(link))

        results: List[match.Match] = await asyncio.gather(*tasks)
        tasks = [ ]

        async def _implement(link, mmatch: match.Match):
            try:
                cache = await mmatch.cache()
                cevMatchCache[link] = CEVMatch(link, cache, sref)
            except Exception as e:
                print(e)

        for mmatch in results:
            if not mmatch:
                continue
            link = mmatch.matchCentreLink
            if mmatch not in cevMatchMatchCache:
                cevMatchMatchCache.append(mmatch)
            mmatch.addScoreObserver(implement)
            tasks.append(_implement(link, mmatch))

        try:
            await asyncio.gather(*tasks)
        except Exception as e:
            print(e)
        return [ cevMatchCache[key].toJson() for key in cevMatchCache.keys() if key in links ]
