from __future__ import annotations

import re
from typing import List, Optional

from cevlib.types.iType import IType


class SetResult(IType):
    """Result of a single set"""
    def __init__(self, data: dict) -> None:
        self._homeScore: Optional[int] = data.get("homeScore") or 0
        self._awayScore: Optional[int] = data.get("awayScore") or 0
        self._setNumber: Optional[int] = data.get("setNumber") or 0
        self._isInPlay: Optional[bool] = data.get("isInPlay") or False

    def toJson(self) -> dict:
        return {
            "homeScore": self.homeScore,
            "awayScore": self.awayScore,
            "setNumber": self.setNumber,
            "isInPlay": self.isInPlay
        }

    @property
    def valid(self) -> bool:
        return None not in (self._homeScore, self._awayScore, self._setNumber, self._isInPlay)\
            and 0 not in (self._homeScore, self._awayScore)

    @property
    def homeScore(self) -> int:
        return self._homeScore

    @property
    def awayScore(self) -> int:
        return self._awayScore

    @property
    def setNumber(self) -> int:
        return self._setNumber

    @property
    def isInPlay(self) -> bool:
        return self._isInPlay

    def __repr__(self) -> str:
        return f"(cevlib.types.results.setResult) {self._homeScore} - {self._awayScore} ({'ongoing' if self._isInPlay else 'finished'})"

    @staticmethod
    def ParseList(setResults: List[dict]) -> List[SetResult]:
        results = [ ]
        for setResult in setResults:
            result = SetResult(setResult)
            if result:
                results.append(result)
        return results

    @staticmethod
    def ParseFromPlayByPlay(data: dict) -> SetResult:
        score = data["Description"]
        return SetResult({
            "homeScore": int(score.split("-")[0]),
            "awayScore": int(score.split("-")[1]),
            "setNumber": int(data["SetNumber"]),
            "isInPlay": False
        })


class Result(IType):
    def __init__(self, data: dict) -> None:
        self._sets: List[SetResult] = SetResult.ParseList(data.get("setResults") or [ ])
        currentSet = SetResult(data.get("currentSetScore") or { })
        if currentSet:
            self._sets.append(currentSet)
        self._hasGoldenSet: bool = data.get("hasGoldenSet") or False
        self._homeScore: int = data.get("homeSetsWon") or 0
        self._awayScore: int = data.get("awaySetsWon") or 0

    def __eq__(self, __o: object) -> bool:
        if not isinstance(__o, Result):
            return False
        return self.toJson() == __o.toJson()

    def toJson(self) -> dict:
        return {
            "hasGoldenSet": self.hasGoldenSet,
            "sets": [ set_.toJson() for set_ in self.sets ],
            "regularSets": [ set_.toJson() for set_ in self.regularSets ],
            "goldenSet": self.goldenSet.toJson() if self.goldenSet else None,
            "homeScore": self.homeScore,
            "awayScore": self.awayScore
        }

    @staticmethod
    def ParseFromForm(data: dict) -> Result:
        sets = re.sub(r"[(</span>) ]", "", data.get("SetsFormatted")).split(",")
        return Result({
            "homeSetsWon": data["HomeTeam"]["Score"],
            "awaySetsWon": data["AwayTeam"]["Score"],
            "setResults": [ {
                "homeScore": set.split("-")[0],
                "awayScore": set.split("-")[0],
                "setNumber": i + 1,
                "isInPlay": False
            } for (i, set) in enumerate(sets) ]
        })

    @property
    def goldenSet(self) -> Optional[SetResult]:
        if not self.hasGoldenSet:
            return None
        return self.sets[-1]

    @property
    def regularSets(self) -> List[SetResult]:
        if self.hasGoldenSet:
            return self.sets[:-1]
        return self.sets

    @property
    def hasGoldenSet(self) -> bool:
        return self._hasGoldenSet

    @property
    def sets(self) -> List[SetResult]:
        return self._sets

    @property
    def latestSet(self) -> Optional[SetResult]:
        if not len(self.sets):
            return None
        return self.sets[len(self.sets) - 1]

    @property
    def homeScore(self) -> int:
        return self._homeScore

    @property
    def awayScore(self) -> int:
        return self._awayScore

    @property
    def valid(self) -> bool:
        return None not in (self._sets, self._homeScore, self._awayScore)

    def __repr__(self) -> str:
        return f"(cevlib.types.results.Result) {self._homeScore}:{self._awayScore} (Golden Set: {self._hasGoldenSet}) {self._sets}"
