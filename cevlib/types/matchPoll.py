from cevlib.types.iType import IType

class TeamPoll(IType):
    def __init__(self, data: dict) -> None:
        self._percent: float = data.get("Percent")
        self._count: int = data.get("VoteCount")

    def toJson(self) -> dict:
        return {
            "percent": self.percent,
            "count": self.count
        }

    def __repr__(self) -> str:
        return f"(cevlib.types.matchPoll.TeamPoll) {self._count} ({self._percent})"

    @property
    def percent(self) -> float:
        return self._percent
    
    @property
    def count(self) -> int:
        return self._count

    @property
    def valid(self) -> bool:
        return None not in (self._percent, self._count)
