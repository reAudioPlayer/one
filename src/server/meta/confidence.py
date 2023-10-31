# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
from __future__ import annotations
__copyright__ = "Copyright (c) 2023 https://github.com/reAudioPlayer"

from typing import List
from Levenshtein import distance as lev
from dataModel.track import ISimpleTrack
from db.table.playlists import PlaylistModel


class Confidence:
    """song relevance"""
    minScore: int # any word is similar to any query word
    minKeyScore: int # any property is similar to any query word
    avgScore: float # average similarity

    @property
    def score(self) -> float:
        """return score"""
        minWeight = 2
        minKeyWeight = 1.2
        avgWeight = 0.7
        return (
            (self.minScore * minWeight)
            + (self.minKeyScore * minKeyWeight)
            + (self.avgScore * avgWeight)
        )

    @classmethod
    def _forStrings(cls,
                    strings: List[str],
                    query: str,
                    boost: float = 0) -> float:
        rel = cls()
        distances = []
        keyDistances = []
        # break by spaces, compare each word
        for i in strings:
            if i == query or not i:
                keyDistances.append(0)
                distances.append(0)
                continue
            words = i.split(" ")
            for word in words:
                queryWords = query.split(" ")
                for queryWord in queryWords:
                    keyDistances.append(lev(i, queryWord))
                    distances.append(lev(word, queryWord))
        rel.minScore = min(distances)
        rel.minKeyScore = min(keyDistances)
        rel.avgScore = sum(distances) / len(distances)
        deviation = max(0, rel.score - boost) / 18
        return 1 - deviation

    @classmethod
    def forSong(cls,
                song: ISimpleTrack,
                query: str,
                boost: float = 0) -> float:
        """get relevance of song"""
        return cls._forStrings([song.title,
                                song.album,
                                song.artist],
                               query, boost)

    @classmethod
    def forPlaylist(cls,
                    playlist: PlaylistModel,
                    query: str,
                    boost: float = 0) -> float:
        """get relevance of playlist"""
        return cls._forStrings([playlist.name,
                                playlist.description],
                               query,
                               boost)

    @classmethod
    def forArtist(cls,
                  name: str,
                  query: str,
                  boost: float = 0) -> float:
        """get relevance of artist"""
        return cls._forStrings([name],
                               query,
                               boost)
