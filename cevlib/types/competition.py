from __future__ import annotations
from cevlib.types.iType import IType
from cevlib.types.types import CompetitionGender


class Competition(IType):
    def __init__(self, data: dict) -> None:
        self._name = data.get("Competition").split("|")[0].removesuffix(" ")
        self._gender = CompetitionGender.Parse(data.get("Competition").split("|")[1].removeprefix(" "))
        self._groupPool = data.get("GroupPool")
        self._leg = data.get("Leg")
        self._phase = data.get("Phase")
        self._season = data.get("Season")
        self._matchNumber = data.get("MatchNumber")
        self._logo = data.get("CompetitionLogo")

    @property
    def name(self) -> str:
        return self._name

    @property
    def displayName(self) -> str:
        return f"{self._name} | {self._gender.value}"

    @property
    def gender(self) -> CompetitionGender:
        return self._gender

    @property
    def groupPool(self) -> str:
        return self._groupPool

    @property
    def leg(self) -> str:
        return self._leg

    @property
    def phase(self) -> str:
        return self._phase

    @property
    def season(self) -> str:
        return self._season

    @property
    def matchNumber(self) -> str:
        return self._matchNumber

    @property
    def logo(self) -> str:
        return self._logo

    def __repr__(self) -> str:
        return f"(cevlib.types.competition.Competition) {self.displayName} ({self._matchNumber}) {self._season} > {self._phase} > {self._groupPool} ({self._leg})"

    @property
    def valid(self) -> bool:
        return None not in (self._name, self._gender)

    def toJson(self) -> dict:
        return {
            "name": self.name,
            "displayName": self.displayName,
            "gender": self.gender.value,
            "groupPool": self.groupPool,
            "leg": self.leg,
            "phase": self.phase,
            "season": self.season,
            "logo": self.logo,
            "matchNumber": self.matchNumber
        }
