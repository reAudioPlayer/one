# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")


from typing import Any, Dict, List


class ExtractDict:
    def __init__(self, data: Dict[str, Any]) -> None:
        self._data = data

    def ensureString(self, key: str, default: str = "") -> str:
        try:
            return str(self._data[key])
        except:
            return default

    def ensureInt(self, key: str, default: int = 0) -> int:
        try:
            return int(self._data[key])
        except:
            return default

    def ensureBool(self, key: str, default: bool = False) -> bool:
        try:
            return bool(self._data[key])
        except:
            return default

    def ensureList(self, key: str, default: List[Any] = []) -> List[Any]:
        try:
            return list(self._data[key])
        except:
            return default

    def ensureDict(self, key: str, default: Dict[str, Any] = {}) -> Dict[str, Any]:
        try:
            return dict(self._data[key])
        except:
            return default
