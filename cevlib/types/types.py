from __future__ import annotations
from enum import Enum

class TeamStatisticType(Enum):
    WinningSpikes = "winningSpikes"
    KillBlocks = "killBlocks"
    Aces = "aces"
    OpponentErrors = "opponentErrors"
    Points = "points"
    Unknown = "unknown"

    @staticmethod
    def Parse(value: str) -> TeamStatisticType:
        if value == "Winning Spikes":
            return TeamStatisticType.WinningSpikes
        if value == "Kill Blocks":
            return TeamStatisticType.KillBlocks
        if value == "Aces":
            return TeamStatisticType.Aces
        if value == "Opponent Errors":
            return TeamStatisticType.OpponentErrors
        if value == "Points":
            return TeamStatisticType.Points
        return TeamStatisticType.Unknown


class TopPlayerType(Enum):
    Scorer = "scorer"
    Attacker = "attacker"
    Blocker = "blocker"
    Server = "server"
    Receiver = "receiver"
    Unknown = "unknown"

    @staticmethod
    def Parse(value: str) -> TopPlayerType:
        if value == "Scorer":
            return TopPlayerType.Scorer
        if value == "Attacker":
            return TopPlayerType.Attacker
        if value == "Blocker":
            return TopPlayerType.Blocker
        if value == "Server":
            return TopPlayerType.Server
        if value == "Receiver":
            return TopPlayerType.Receiver
        return TopPlayerType.Unknown


class CompetitionGender(Enum):
    Women = "Women"
    Men = "Men"
    Unknown = "Unknown"

    def Parse(value: str) -> CompetitionGender:
        if value in ("Women", "W"):
            return CompetitionGender.Women
        if value in ("Men", "M"):
            return CompetitionGender.Men
        return CompetitionGender.Unknown


class Position(Enum):
    Setter = "setter"
    MiddleBlocker = "middleBlocker"
    OutsideSpiker = "outsideSpiker"
    Opposite = "opposite"
    Libero = "libero"
    HeadCoach = "headCoach"
    Unknown = "unknown"

    @staticmethod
    def Parse(value: str) -> Position:
        if value == "Setter":
            return Position.Setter
        if value == "Middle blocker":
            return Position.MiddleBlocker
        if value == "Outside spiker":
            return Position.OutsideSpiker
        if value == "Opposite":
            return Position.Opposite
        if value == "Libero":
            return Position.Libero
        if value == "Head Coach":
            return Position.HeadCoach
        return Position.Unknown


class Zone(Enum):
    One = 1
    Two = 2
    Three = 3
    Four = 4
    Five = 5
    Six = 6
    Sub = 0
    Featured = 7
    Unknown = -1

    @staticmethod
    def Parse(value: int) -> Zone:
        if value == 1:
            return Zone.One
        if value == 2:
            return Zone.Two
        if value == 3:
            return Zone.Three
        if value == 4:
            return Zone.Four
        if value == 5:
            return Zone.Five
        if value == 6:
            return Zone.Six
        if value in (7, 8):
            return Zone.Featured
        if value == 0:
            return Zone.Sub
        return Zone.Unknown


class PlayType(Enum):
    Spike = "spike"
    Serve = "serve"
    Block = "block"
    FirstServe = "firstServe"
    Unknown = "unknown"

    @staticmethod
    def Parse(typeName) -> PlayType:
        if typeName == "Spike":
            return PlayType.Spike
        if typeName == "Serve":
            return PlayType.Serve
        if typeName == "Block":
            return PlayType.Block
        if typeName == "First Serve":
            return PlayType.FirstServe
        return PlayType.Unknown


class MatchState(Enum):
    Upcoming = "upcoming"
    Live = "live"
    Finished = "finished"

    @staticmethod
    def Parse(started: bool, finished: bool) -> MatchState:
        if not started and not finished:
            return MatchState.Upcoming
        if started and not finished:
            return MatchState.Live
        if finished:
            return MatchState.Finished
