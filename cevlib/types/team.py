from __future__ import annotations
from datetime import datetime
from typing import List, Optional
from cevlib.types.iType import IType
from cevlib.types.matchPoll import TeamPoll
from cevlib.types.stats import PlayerStatistic, TeamStatistics
from cevlib.types.types import Position, Zone
from cevlib.types.results import Result


class Player(IType):
    def __init__(self, data: dict, playerStatsData: list) -> None:
        self._number = data.get("Number")
        self._name = data.get("Name").title() if data.get("Name") else "N/A"
        self._position = Position.Parse(data.get("Position"))
        self._image = data.get("Image")
        self._isCaptain = data.get("isCaptain") or False
        self._zone = Zone.Parse(data.get("PositionNumber"))
        self._id = data.get("PlayerId")
        self._stats: Optional[PlayerStatistic] = None
        for player in playerStatsData:
            if self._name.split(" ")[0] in player.get("Name").title() and player.get("PlayerNumber") == self._number:
                self._stats = PlayerStatistic(player)
                break

    @property
    def valid(self) -> bool:
        return self._id is not None

    def toJson(self) -> dict:
        return {
            "zone": self.zone.value,
            "position": self.position.value,
            "name": self.name,
            "id": self.id,
            "number": self.number,
            "stats": self._stats.toJson() if self._stats else None
        }

    @property
    def zone(self) -> Zone:
        return self._zone
    
    @property
    def position(self) -> Position:
        return self._position

    @property
    def name(self) -> str:
        return self._name

    @property
    def id(self) -> int:
        return self._id
    
    @property
    def number(self) -> int:
        return self._number

    @property
    def stats(self) -> PlayerStatistic:
        return self._stats

    def __repr__(self) -> str:
        return f"(cevlib.types.team.Player) {self._name} ({self._number}/{self._id}) {self._position} ({self._zone})"


class FormMatch(IType):
    def __init__(self, won: bool, link: str, homeTeam: Team, awayTeam: Team, result: Result, startTime: datetime) -> None:
        self._won = won
        self._link = link
        self._homeTeam = homeTeam
        self._awayTeam = awayTeam
        self._result = result
        self._startTime = startTime

    def toJson(self) -> dict:
        return {
            "won": self.won,
            "link": self.link,
            "homeTeam": self._homeTeam.toJson(),
            "awayTeam": self._awayTeam.toJson(),
            "result": self._result.toJson(),
            "startTime": str(self._startTime)
        }

    @property
    def won(self) -> bool:
        return self._won

    @property
    def link(self) -> str:
        return self._link

    @staticmethod
    def Parse(data: dict) -> List[FormMatch]:
        matches: List[FormMatch] = [ ]
        for (index, match) in enumerate(data.get("Matches") or [ ]):
            if index >= len(data["RecentForm"]):
                break
            matches.append(FormMatch(data["RecentForm"][index],
                                    match["MatchCentreUrl"],
                                    Team.Build(match["HomeTeam"]["Name"],
                                                match["HomeTeam"]["Logo"]["Url"],
                                                "N/A", True),
                                    Team.Build(match["AwayTeam"]["Name"],
                                                match["AwayTeam"]["Logo"]["Url"],
                                                "N/A", False),
                                    Result.ParseFromForm(match),
                                    datetime.strptime(match["MatchDateTime"], "%Y-%m-%dT%H:%M:%S")))
        return matches

    @property
    def valid(self) -> bool:
        return True
    
    def __repr__(self) -> str:
        return f"(cevlib.types.team.FormMatch) {self._won} ({self._link})"


class Team(IType):
    def __init__(self,
            data: dict,
            playerStatsData: dict,
            stats: TeamStatistics,
            matchPollData: List[dict],
            form: dict,
            icon: Optional[str] = None,
            nickname: Optional[str] = None,
            id: int = 0) -> None:
        self._stats = stats
        playerStatsList: List[PlayerStatistic] = [ ]
        for team in playerStatsData.get("Teams") or [ ]:
            playerStatsList.extend(team.get("Players"))

        teamLogo = data.get("TeamLogo") or { }
        self._form = FormMatch.Parse(form)
        self._nickname: Optional[str] = nickname
        self._name: Optional[str] = teamLogo.get("AltText")
        self._logo: Optional[str] = icon or teamLogo.get("Url")
        self._id: Optional[int] = id or int(data.get("TeamId") or "0")
        self._poll = TeamPoll(matchPollData[0] if matchPollData[0]["Id"] == self._id else matchPollData[1])\
                     if len(matchPollData) == 2 else None
        self._players: List[Player] = [ ]
        if "TopLeftPlayer" in data: # assume that the others are as well, might improve
            self._players.append(Player(data.get("TopLeftPlayer"), playerStatsList))
            self._players.append(Player(data.get("TopMidPlayer"), playerStatsList))
            self._players.append(Player(data.get("TopRightPlayer"), playerStatsList))
            self._players.append(Player(data.get("BottomLeftPlayer"), playerStatsList))
            self._players.append(Player(data.get("BottomMidPlayer"), playerStatsList))
            self._players.append(Player(data.get("BottomRightPlayer"), playerStatsList))
            self._players.append(Player(data.get("HeadCoach"), playerStatsList))
        self._players.extend([ Player(player, playerStatsList) for player in data.get("FeaturedPlayers") or [ ] ])
        self._players.extend([ Player(player, playerStatsList) for player in data.get("SubPlayers") or [ ] ])

    @staticmethod
    def Build(name: str, icon: str, nickname: str, home: bool, id: int = 0) -> Team:
        return Team({ "TeamLogo": {
                            "AltText": name,
                            "Url": icon
                        }
                    }, { }, TeamStatistics({ }, home), [ ], { },
                    icon, nickname, id)

    def toJson(self) -> dict:
        return {
            "name": self.name,
            "nickname": self.nickname,
            "logo": self.logo,
            "id": self.id,
            "stats": self.stats.toJson(),
            "poll": self.poll.toJson() if self.poll else None,
            "form": [ form.toJson() for form in self.form ],
            "players": [ player.toJson() for player in self.players ]
        }

    @property
    def valid(self) -> bool:
        return None not in (self._name, self._id, self._stats)

    @property
    def form(self) -> List[FormMatch]:
        return self._form

    def __repr__(self) -> str:
        return f"(cevlib.types.team.Team) {self._name} ({self._nickname}/{self._id}) \nplayers={self._players}\nform={self._form}"

    def __eq__(self, other: Team) -> bool:
        if self.id and other.id:
            return self.id == other.id
        return self.name == other.name

    @property
    def name(self) -> Optional[str]:
        return self._name

    @property
    def nickname(self) -> Optional[str]:
        return self._nickname

    @property
    def logo(self) -> Optional[str]:
        return self._logo

    @property
    def id(self) -> Optional[int]:
        return self._id

    @property
    def stats(self) -> TeamStatistics:
        return self._stats

    @property
    def poll(self) -> Optional[TeamPoll]:
        return self._poll

    @property
    def players(self) -> List[Player]:
        return self._players

    def getFirstPlayer(self,
                  zone: Optional[Zone] = None,
                  position: Optional[Position] = None,
                  id_: Optional[int] = None,
                  number: Optional[int] = None) -> Optional[Player]:
        players = self.getPlayers(zone, position, id_, number)
        if len(players):
            return players[0]
        return None

    def getPlayers(self,
                  zone: Optional[Zone] = None,
                  position: Optional[Position] = None,
                  id_: Optional[int] = None,
                  number: Optional[int] = None) -> List[Player]:
        eligiblePlayers = self._players
        if zone:
            eligiblePlayers = [ player for player in eligiblePlayers if player.zone == zone ]
        if position:
            eligiblePlayers = [ player for player in eligiblePlayers if player.position == position ]
        if id_ is not None:
            eligiblePlayers = [ player for player in eligiblePlayers if player.id == id_ ]
        if number is not None:
            eligiblePlayers = [ player for player in eligiblePlayers if player.number == number ]
        return eligiblePlayers
