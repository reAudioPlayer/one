from typing import List


class ScoreHeroToTeam:
    @staticmethod
    def convert(data: dict, matchPollData: List[dict]) -> dict:
        return {
            "matchLocation": data["StadiumInformation"],
            "utcStartDate": data["MatchStartDateTimeUTC"],
            "matchId": int(data["MatchId"]),
            "homeSetsWon": data["HomeTeam"]["Score"],
            "awaySetsWon": data["AwayTeam"]["Score"],
            "hasGoldenSet": True if data["GoldenSet"] else False,
            "setResults": ScoreHeroToTeam._convertSets(data),
            "matchState_String": "FINISHED",
            "matchNumber": "MatchNumber",
            "currentSetScore": {
                "homeScore": 0,
                "awayScore": 0,
                "setNumber": 0,
                "isInPlay": False
            },
            "homeTeamNickname": matchPollData[0]["Value"],
            "awayTeamNickname": matchPollData[1]["Value"],
            "homeTeamId": matchPollData[0]["Id"],
            "awayTeamId": matchPollData[1]["Id"]
        }

    @staticmethod
    def _convertSets(data: dict) -> list:
        mainSets = data["SetsFormatted"].replace("<span>", "").replace("</span>", "").replace("(", "").replace(")", "").replace(" ", "").split(",")
        goldenSet = data["GoldenSet"]
        sets = [ ]
        index = 1
        for mainSet in mainSets:
            sets.append({
                "homeScore": mainSet.split("-")[0],
                "awayScore": mainSet.split("-")[1],
                "setNumber": index,
                "isInPlay": False
            })
            index += 1
        if goldenSet:
            sets.append({
                "homeScore": goldenSet.split("-")[0],
                "awayScore": goldenSet.split("-")[1],
                "setNumber": index,
                "isInPlay": False
            })
        return sets
