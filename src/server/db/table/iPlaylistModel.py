from abc import ABC, abstractmethod

class IPlaylistModel(ABC):
    @property
    @abstractmethod
    def name(self) -> str:
        """playlist name"""

    @property
    @abstractmethod
    def description(self) -> str:
        """playlist description"""

    @property
    @abstractmethod
    def cover(self) -> str:
        """playlist cover"""

    @property
    @abstractmethod
    def plays(self) -> int:
        """plays"""

    @property
    @abstractmethod
    def id(self) -> int:
        """db id"""
