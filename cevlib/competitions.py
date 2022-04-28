from __future__ import annotations
from typing import Dict, List, Optional, Tuple
import re
from bs4 import BeautifulSoup
from bs4.element import Tag

import aiohttp
from cevlib.calendar import CalendarMatch

from cevlib.types.competition import Competition as CompetitionModel
from cevlib.types.iType import IType
from cevlib.types.results import Result
from cevlib.types.team import Team
from cevlib.types.types import CompetitionGender


class Draw(IType):
    def __init__(self, matches: List[CalendarMatch]) -> None:
        self._matches = matches
        self._first: Optional[Team] = None
        self._second: Optional[Team] = None

        if len(self._matches):
            self._first, self._second = matches[0].teams

    def _sameTeams(self) -> bool:
        for match in self._matches:
            if self._first not in match.teams:
                return False
            if self._second not in match.teams:
                return False
        return True

    @property
    def competition(self) -> CompetitionModel:
        return self._matches[0].competition

    @property
    def firstTeam(self) -> Team:
        return self._first

    @property
    def secondTeam(self) -> Team:
        return self._second

    @property
    def teams(self) -> Tuple[Team]:
        assert self.valid
        return self._matches[0].teams

    @property
    def valid(self) -> bool:
        return len(self._matches) and self._sameTeams()

    def toJson(self) -> dict:
        if not self.valid:
            print(self._first, self._second, self._sameTeams())
        return [ match.toJson() for match in self._matches ]


class Round(IType):
    def __init__(self, name: str, draws: List[Draw]) -> None:
        self._name = name
        self._draws = draws

    @property
    def valid(self) -> bool:
        return self._name and len(self._draws)

    @property
    def name(self) -> str:
        return self._name

    @property
    def draws(self) -> List[Draw]:
        return self._draws

    def moveOrCreateDraw(self, anyDrawTeam: Team, newIndex: int, competition: Optional[CompetitionModel]) -> None:
        if anyDrawTeam.name == "Bye":
            return
        oldIndex = -1
        for i in range(len(self._draws)):
            if anyDrawTeam in self._draws[i].teams:
                oldIndex = i
                break

        if oldIndex >= 0:
            self._draws.insert(newIndex, self._draws.pop(oldIndex))
            return

        assert competition
        self._draws.insert(newIndex, Draw([ CalendarMatch.ShortcutMatch(competition, anyDrawTeam), CalendarMatch.ShortcutMatch(competition, anyDrawTeam) ]))

    def toJson(self) -> dict:
        return {
            "name": self._name,
            "draws": [ draw.toJson() for draw in self._draws ]
        }


class Competition(IType):
    def __init__(self, rounds: List[Round]) -> None:
        self._rounds = rounds
        self._rearrangeDraws()
    
    def _rearrangeDraws(self) -> None:
        rounds = [ round for round in self._rounds if "Pool" not in round.name and "Round" not in round.name ]
        for i in range(len(rounds) - 1):
            round = rounds[- (i + 1)]
            previousRound = rounds[- (i + 2)]
            for j in range(len(round.draws)):
                previousRound.moveOrCreateDraw(round.draws[j].firstTeam, j * 2, round.draws[j].competition)
                previousRound.moveOrCreateDraw(round.draws[j].secondTeam, j * 2 + 1, round.draws[j].competition)

    @staticmethod
    def _ParseRound(pool: dict, competition: CompetitionLink) -> Round:
        draws: List[List[CalendarMatch]] = [ ]
        for match in pool.get("Results"):
            homeId = 0
            awayId = 0
            try:
                homeId = int(re.search(r"^\/team\/([0-9]+)-[\w-]+$", match["HomeTeam"]["Link"]).group(1))
                awayId = int(re.search(r"^\/team\/([0-9]+)-[\w-]+$", match["AwayTeam"]["Link"]).group(1))
            except Exception as e:
                print(e)

            newMatch = CalendarMatch(match.get("MatchCentreUrl"),
                                     CompetitionModel.BuildPlain(competition.name, competition.gender,
                                                                 season = str(competition.age) if competition.age else None,
                                                                 phase = pool.get("Name"), matchNumber = match.get("MatchName")),
                                     Team.Build(match["HomeTeam"]["Name"], match["HomeTeam"]["Logo"]["Url"], "N/A", True, homeId),
                                     Team.Build(match["AwayTeam"]["Name"], match["AwayTeam"]["Logo"]["Url"], "N/A", False, awayId),
                                     match.get("Location"),
                                     match.get("MatchDateTime"),
                                     Result.ParseFromForm(match),
                                     match.get("IsComplete"))
            newDraw = True
            for draw in draws:
                if draw[0].awayTeam.name == newMatch.homeTeam.name and draw[0].homeTeam.name == newMatch.awayTeam.name:
                    newDraw = False
                    draw.append(newMatch)
                    break
            if newDraw:
                draws.append([newMatch])
        return Round(pool.get("Name"), [ Draw([ match for match in draw ]) for draw in draws ])

    @staticmethod
    async def FromUrl(url: str) -> Competition:
        html = ""
        competition = (await Competitions.GetAll()).getByLink(url)
        assert competition
        async with aiohttp.ClientSession() as client:
            async with client.get(url) as resp:
                html = await resp.text()
        links = [ "https://" + match[0].replace("&amp;", "&") for match in re.finditer(r"([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@;?^=%&:\/~+#-]*GetResultList?[\w .,@;?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])", html) ]
        rounds = [ ]
        for link in links:
            async with aiohttp.ClientSession() as client:
                async with client.get(link) as resp:
                    jdata = await resp.json(content_type=None)
                    rounds.extend([ Competition._ParseRound(pool, competition) for pool in jdata.get("Pools") ])
        return Competition(rounds)
    
    @property
    def valid(self) -> bool:
        return True
    
    def toJson(self) -> dict:
        return [ round.toJson() for round in self._rounds ]


class CompetitionLink(IType):
    def __init__(self, menuTitle: str, slabTitle: str, entry: str, href: str) -> None:
        self._href = href
        self._type = menuTitle
        self._name = slabTitle
        self._gender = CompetitionGender.Parse(entry)
        self._age: Optional[int] = None

        if self._gender == CompetitionGender.Unknown:
            match = re.search(r'U([0-9]{2})([MW])', entry)
            age = match.group(1)
            gender = match.group(2)
            self._age = int(age) if age else None
            self._gender = CompetitionGender.Parse(gender)

    @property
    def name(self) -> str:
        return self._name

    @property
    def type(self) -> str:
        return self._type

    @property
    def href(self) -> str:
        return self._href

    @property
    def gender(self) -> CompetitionGender:
        return self._gender

    @property
    def age(self) -> Optional[int]:
        return self._age

    @property
    def valid(self) -> bool:
        return True
    
    def __repr__(self) -> str:
        return f"(cevlib.competitions.CompetitionLink) {self.name} ({self.type}/{self.age}) {self._gender} ({self.href})"

    def toJson(self) -> dict:
        return {
            "name": self._name,
            "type": self._type,
            "gender": self._gender.value,
            "maxAge": self._age,
            "href": self._href
        }


class Competitions(IType):
    _competitionsCache: List[CompetitionLink] = [ ]

    def __init__(self, html) -> None:
        if len(Competitions._competitionsCache) > 0:
            self._competitions = Competitions._competitionsCache
            return
        soup = BeautifulSoup(html, "html.parser")
        self._competitions: List[CompetitionLink] = [ ]
        for menuItem in soup.find_all("li", class_="c-nav__list__item"):
            if not isinstance(menuItem, Tag):
                continue
            menuTitleEl = menuItem.find("a", class_="menuItem")
            if not menuTitleEl:
                continue
            menuTitle = menuTitleEl.get_text(strip = True)

            for slab in menuItem.find_all("div", class_="menuSlab"):
                if not isinstance(slab, Tag):
                    continue
                for row in slab.find_all("div", class_="menuSlab__row"):
                    if not isinstance(row, Tag):
                        continue
                    
                    for rowItem in row.find_all("div"):
                        titleEl = rowItem.find("a", class_="title")
                        if not titleEl:
                            continue

                        title = titleEl.get_text()

                        for item in rowItem.find_all("li"):
                            if not isinstance(item, Tag):
                                continue
                            a = item.find("a")
                            if not a:
                                continue
                            itemTitle = a.attrs.get("title")
                            href = a.attrs.get("href")

                            string = f"{menuTitle} - {title} - {itemTitle} ({href})"
                            canAppend = True
                            for block in [ "ranking", "history", "multi-sport events", "latest", "beach", "snow", "nationals" ]: # TODO beach, snow, national
                                if block in string.lower():
                                    canAppend = False
                                    continue
                            if canAppend:
                                self._competitions.append(CompetitionLink(menuTitle, title, itemTitle, href))
        
    @staticmethod
    async def GetAll() -> Competitions:
        async with aiohttp.ClientSession() as client:
            async with client.get(f"https://www.cev.eu/") as resp:
                return Competitions(await resp.text())
    
    @property
    def valid(self) -> bool:
        return True

    def getByLink(self, link: str) -> Optional[Competition]:
        return next((item for item in self._competitions if item.href == link), None)

    def toJson(self) -> dict:
        return [ competition.toJson() for competition in self._competitions ]
