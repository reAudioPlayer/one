from __future__ import annotations
from typing import Any, List
from cevlib.types.iType import IType
from cevlib.types.types import Position, TeamStatisticType, TopPlayerType


class TeamStatistic(IType):
    def __init__(self, data: dict, home: bool) -> None:
        self._type = TeamStatisticType.Parse(data.get("Name"))
        self._value = data["HomeTeamValue" if home else "AwayTeamValue"]
        self._percent = data["HomeTeamPercent" if home else "AwayTeamPercent"]

    def toJson(self) -> dict:
        return {
            "type": self.type.value,
            "value": self._value,
            "percent": self._percent
        }

    @property
    def type(self) -> TeamStatisticType:
        return self._type

    @property
    def value(self) -> Any:
        return self._value

    @property
    def percent(self) -> Any:
        return self._percent

    @property
    def valid(self) -> bool:
        return None not in (self._type, self._value)

    def __repr__(self) -> str:
        return f"(cevlib.types.stats.TeamStatistic) {self._type} {self._value} ({self._percent}%)"


class TeamStatisticSet(IType):
    def __init__(self, data: list, name: str, home: bool) -> None:
        self._stats = [ TeamStatistic(statistic, home) for statistic in data ]
        self._name = name

    def toJson(self) -> dict:
        return {
            "stats": [ stat.toJson() for stat in self.stats ],
            "name": self.name
        }

    @property
    def valid(self) -> bool:
        return self._name is not None

    @property
    def stats(self) -> List[TeamStatistic]:
        return self._stats

    @property
    def name(self) -> str:
        return self._name

    def byType(self, type_: TeamStatisticType) -> TeamStatistic:
        for stat in self._stats:
            if stat._type == type_:
                return stat

    def __repr__(self) -> str:
        return f"(cevlib.types.stats.TeamStatisticSet) {self._name} {self._stats}"


class TeamStatistics(IType):
    def __init__(self, data: dict, home: bool) -> None:
        tabs = data.get("Tabs") or [ ]
        self._setStats: List[TeamStatisticSet] = [ ]
        for tab in tabs:
            self._setStats.append(TeamStatisticSet(tab.get("Statistics"), tab.get("Name"), home))

    @property
    def setStats(self) -> List[TeamStatisticSet]:
        return self._setStats

    @property
    def valid(self) -> bool:
        return True

    def __repr__(self) -> str:
        return f"(cevlib.types.stats.TeamStatistics) {self._setStats}"

    def toJson(self) -> dict:
        return {
            "setStats": [ setStat.toJson() for setStat in self._setStats ]
        }


class PlayerStatistic(IType):
    def __init__(self, data: dict) -> None:
        self._points: int = data.get("Points")
        self._serves: int = data.get("Serves")
        self._spikes: int = data.get("Spikes")
        self._blocks: int = data.get("Blocks")
        self._receptions: int = data.get("Reception")
        self._spikePerc: int = int(data.get("SpikePerc").replace("%", ""))
        self._receptionPerc: int = int(data.get("PositiveReceptionPerc").replace("%", ""))

    @property
    def valid(self) -> bool:
        return None not in (self._points, self._serves, self._spikes, self._blocks, self._receptions, self._spikePerc, self._receptionPerc)

    def toJson(self) -> dict:
        return {
            "points": self.points,
            "serves": self.serves,
            "spikes": self.spikes,
            "blocks": self.blocks,
            "receptions": self.receptions,
            "spikePercentage": self.spikePercentage,
            "receptionPercentage": self.receptionPercentage
        }

    @property
    def points(self) -> int:
        assert self.valid
        return self._points

    @property
    def serves(self) -> int:
        assert self.valid
        return self._serves

    @property
    def spikes(self) -> int:
        assert self.valid
        return self._spikes

    @property
    def blocks(self) -> int:
        assert self.valid
        return self._blocks

    @property
    def receptions(self) -> int:
        assert self.valid
        return self._receptions

    @property
    def spikePercentage(self) -> int:
        """0 - 100"""
        assert self.valid
        return self._spikePerc

    @property
    def receptionPercentage(self) -> int:
        """0 - 100"""
        assert self.valid
        return self._receptionPerc

    def __repr__(self) -> str:
        return f"(cevlib.types.stats.PlayerStatistic) Spikes: {self._spikes} Blocks: {self._blocks} Points: {self._points} Serves: {self._serves} Receptions: {self._receptions}"


class TopPlayerPlayer(IType):
    def __init__(self, data: dict) -> None:
        self._number: int = data.get("Number")
        self._name: str = data.get("Name")
        self._position = Position.Parse(data.get("Position"))
        self._score: int = data.get("Score")
        self._nationality: str = data.get("Team")
        self._image: str = data.get("Image")

    def toJson(self) -> dict:
        return {
            "number": self.number,
            "name": self.name,
            "position": self.position.value,
            "score": self.score,
            "nationality": self.nationality,
            "image": self.image
        }

    @property
    def valid(self) -> bool:
        return None not in (self._number, self._name, self._position, self._score)

    @property
    def number(self) -> int:
        return self._number

    @property
    def score(self) -> int:
        return self._score

    @property
    def position(self) -> Position:
        return self._position

    @property
    def name(self) -> str:
        return self._name

    @property
    def nationality(self) -> str:
        return self._nationality

    @property
    def image(self) -> str:
        return self._image

    def __repr__(self) -> str:
        return f"(cevlib.types.stats.TopPlayerPlayer) {self._name} ({self._number}) Score: {self._score} as {self._position}"


class TopPlayer(IType):
    def __init__(self, data: dict) -> None:
        self._type = TopPlayerType.Parse(data.get("Type"))
        self._players: List[TopPlayerPlayer] = [ ]
        for player in data["Match"]["Players"]:
            self._players.append(TopPlayerPlayer(player))

    def toJson(self) -> dict:
        return {
            "type": self._type.value,
            "players": [ player.toJson() for player in self._players ]
        }

    @property
    def valid(self) -> bool:
        return len(self._players)

    @property
    def type(self) -> TopPlayerType:
        return self._type

    @property
    def players(self) -> List[TopPlayerPlayer]:
        return self._players

    @property
    def topPlayer(self) -> TopPlayerPlayer:
        return self._players[0]

    def __repr__(self) -> str:
        return f"(cevlib.types.stats.TopPlayer) {self._type} {self._players}"


class TopPlayers(IType):
    def __init__(self) -> None:
        self._topPlayers: List[TopPlayer] = [ ]

    def toJson(self) -> dict:
        return {
            "topPlayers": [ player.toJson() for player in self._topPlayers ]
        }

    def topPlayers(self) -> List[TopPlayer]:
        return self._topPlayers

    def append(self, topPlayer: TopPlayer) -> None:
        for player in self._topPlayers:
            if player.type == topPlayer.type:
                return
        self._topPlayers.append(topPlayer)

    @property
    def valid(self) -> bool:
        return True

    def __repr__(self) -> str:
        return f"(cevlib.types.stats.TopPlayers) {self._topPlayers}"
