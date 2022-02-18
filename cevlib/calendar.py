from __future__ import annotations
from datetime import datetime
from typing import List, Optional

import aiohttp
from cevlib.match import Match
from cevlib.types.competition import Competition
from cevlib.types.iType import IType
from cevlib.types.results import Result
from cevlib.types.team import Team

class CalendarMatch(IType):
    def __init__(self, url, competition: Competition, homeTeam: Team, awayTeam: Team, venue: str, startTime: str, result: Result) -> None:
        self._matchCentreLink = url
        self._competition = competition
        self._homeTeam = homeTeam
        self._awayTeam = awayTeam
        self._venue = venue
        if not startTime.endswith("Z"):
            startTime += "Z"
        self._startTime = datetime.strptime(startTime, "%Y-%m-%dT%H:%M:%SZ")
        self._result = result

    async def toMatch(self) -> Optional[Match]:
        if not self._matchCentreLink:
            return None
        return await Match.ByUrl(self._matchCentreLink)

    def __repr__(self) -> str:
        return f"(cevlib.calendar.CalendarMatch) {self._matchCentreLink} {self._competition} {self._venue} {self._startTime}\n{self._homeTeam}\n{self._awayTeam}\n{self._result}"

    def toJson(self) -> dict:
        return {
            "competition": self.competition.toJson(),
            "homeTeam": self.homeTeam.toJson(),
            "awayTeam": self.awayTeam.toJson(),
            "venue": self.venue,
            "startTime": str(self.startTime),
            "result": self.result.toJson(),
            "matchCentreLink": self.matchCentreLink
        }

    @property
    def competition(self) -> Competition:
        return self._competition

    @property
    def homeTeam(self) -> Team:
        return self._homeTeam

    @property
    def awayTeam(self) -> Team:
        return self._awayTeam

    @property
    def venue(self) -> str:
        return self._venue

    @property
    def matchCentreLink(self) -> str:
        return self._matchCentreLink

    @property
    def startTime(self) -> datetime:
        return self._startTime

    @property
    def result(self) -> Result:
        return self._result

    @property
    def valid(self) -> bool:
        return True


class Calendar(IType):
    @staticmethod
    async def MatchesOfMonth(month: Optional[int] = None, year: Optional[int] = None) -> List[CalendarMatch]:
        today = datetime.now()
        timestamp = datetime(year if year else today.year, month if month else today.month, 1).strftime("%Y-%m-%dT%H:%M:%SZ")
        matches = [ ]
        async with aiohttp.ClientSession() as client:
            async with client.get(f"https://www.cev.eu/umbraco/api/CalendarApi/GetCalendar?nodeId=11346&culture=en-US&date={timestamp}") as resp:
                jdata = await resp.json(content_type=None)
                for date in jdata.get("Dates") or [ ]:
                    matches.extend(date.get("Matches") or [ ])
        return [ CalendarMatch(str(match.get("MatchCentreUrl")),
                               Competition({ "Competition": match.get("CompetitionName"), "CompetitionLogo": match.get("CompetitionLogo"), "Phase": match.get("PhaseName") }),
                               Team.Build( match.get("HomeTeamName"), match.get("HomeTeamLogo"), match.get("HomeClubCode"), True ),
                               Team.Build( match.get("GuestTeamName"), match.get("GuestTeamLogo"), match.get("GuestClubCode"), False ),
                               match.get("StadiumName"),
                               match.get("MatchDateTime_UTC"),
                               Result({
                                   "homeSetsWon": match.get("WonSetHome"),
                                   "awaySetsWon": match.get("WonSetGuest"),
                               }))
                 for match in matches ]


    @staticmethod
    async def RecentMatches() -> List[CalendarMatch]:
        matches = await Calendar._GetLiveScoreMatches()
        return [ Calendar._LiveScoresToCalendarMatch(match)
                 for match in matches
                 if match.get("matchState_String") == "FINISHED" ]

    @staticmethod
    async def UpcomingMatches() -> List[CalendarMatch]:
        matches = await Calendar._GetLiveScoreMatches()
        return [ Calendar._LiveScoresToCalendarMatch(match)
                 for match in matches
                 if not match.get("matchState_String") == "FINISHED" ]

    @staticmethod
    async def UpcomingAndRecentMatches() -> List[CalendarMatch]:
        matches = await Calendar._GetLiveScoreMatches()
        return [ Calendar._LiveScoresToCalendarMatch(match)
                 for match in matches ]

    @staticmethod
    def _LiveScoresToCalendarMatch(match: dict) -> CalendarMatch:
        compDict = match.get("competition")
        compDict["Phase"] = match.get("phaseName")
        compDict["Leg"] = match.get("legName")
        compDict["GroupPool"] = match.get("groupName")
        compDict["MatchNumber"] = match.get("matchNumber")
        return CalendarMatch(match.get("matchCentreLink"),
                             Competition(compDict),
                             Team.Build( match.get("homeTeam"), match.get("homeTeamIcon"), match.get("homeTeamNickname"), True ),
                             Team.Build( match.get("awayTeam"), match.get("awayTeamIcon"), match.get("awayTeamNickname"), False ),
                             match.get("matchLocation"),
                             match.get("utcStartDate"),
                             Result(match))

    @staticmethod
    async def _GetLiveScoreMatches() -> List[dict]:
        matches = [ ]
        async with aiohttp.ClientSession() as client:
            async with client.get("https://www.cev.eu/LiveScores.json") as resp:
                jdata = await resp.json(content_type=None)
                for competition in jdata.get("competitions"):
                    for m in competition.get("matches"):
                        m["competition"] = { "Competition": competition["competitionName"], "id": competition["competitionId"] }
                        matches.append(m)

        return matches

    def __repr__(self) -> str:
        return f"(cevlib.calendar.Calendar)"

    def toJson() -> dict:
        return { }

    @property
    def valid(self) -> bool:
        return True
