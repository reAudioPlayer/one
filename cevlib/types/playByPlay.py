from __future__ import annotations
from typing import List
from cevlib.types.iType import IType

from cevlib.types.results import SetResult
from cevlib.types.types import PlayType

def ensureString(data: dict, key: str) -> str:
    value = data.get(key)
    if isinstance(value, str):
        return value
    return ""

class Play(IType):
    def __init__(self, data: dict) -> None:
        self._type: PlayType = PlayType.Parse(data.get("Title"))
        self._currentScore: SetResult = SetResult.ParseFromPlayByPlay(data)
        self._playerName: str = ensureString(data, "PlayerName").title() # TODO player type
        self._playerNumber: int = data.get("PlayerNumber")
        self._isHome: bool = data.get("IsHome")

    def toJson(self) -> dict:
        return {
            "type": self.type.value,
            "currentScore": self.currentScore.toJson(),
            "playerName": self.playerName,
            "playerNumber": self._playerNumber,
            "isHome": self._isHome
        }

    @property
    def valid(self) -> bool:
        return None not in (self._type, self._currentScore, self._playerName)

    @property
    def type(self) -> PlayType:
        return self._type

    @property
    def currentScore(self) -> SetResult:
        return self._currentScore

    @property
    def playerName(self) -> str:
        return self._playerName

    def __repr__(self) -> str:
        return f"(cevlib.types.playByPlay.Play) {self._type} {self._currentScore} by {self._playerName}"


class Set(IType):
    def __init__(self, data: dict) -> None:
        self._plays = [ Play(event) for event in data.get("Events") ]
        self._setNumber = int(data.get("TabName").split(" ")[1])

    def toJson(self) -> dict:
        return {
            "plays": [ play.toJson() for play in self.plays ],
            "setNumber": self.setNumber
        }

    @property
    def valid(self) -> bool:
        return len(self._plays) > 0

    @property
    def plays(self) -> List[Play]:
        return self._plays

    @property
    def setNumber(self) -> int:
        return self._setNumber

    def __repr__(self) -> str:
        return f"(cevlib.types.playByPlay.Set) Set {self._setNumber} {self._plays}"


class PlayByPlay(IType):
    def __init__(self, data: dict) -> None:
        self._sets = [ Set(playEvent) for playEvent in data.get("PlayEvents") ]

    @property
    def valid(self) -> bool:
        return len(self._sets) > 0

    @property
    def sets(self) -> List[Set]:
        return self._sets

    def toJson(self) -> dict:
        return {
            "sets": [ set_.toJson() for set_ in self.sets ]
        }

    def __repr__(self) -> str:
        return f"(cevlib.types.playByPlay.PlayByPlay) {self._sets}"
