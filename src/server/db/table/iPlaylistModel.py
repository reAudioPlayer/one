# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = "Copyright (c) 2023 https://github.com/reAudioPlayer"

from abc import ABC, abstractmethod

class IPlaylistModel(ABC):
    @property
    @abstractmethod
    def name(self) -> str:
        """playlist name"""

    @name.setter
    @abstractmethod
    def name(self, value: str) -> None:
        """set playlist name"""

    @property
    @abstractmethod
    def description(self) -> str:
        """playlist description"""

    @description.setter
    @abstractmethod
    def description(self, value: str) -> None:
        """set playlist description"""

    @property
    @abstractmethod
    def cover(self) -> str:
        """playlist cover"""

    @cover.setter
    @abstractmethod
    def cover(self, value: str) -> None:
        """set playlist cover"""

    @property
    @abstractmethod
    def plays(self) -> int:
        """plays"""

    @property
    @abstractmethod
    def id(self) -> int:
        """db id"""
