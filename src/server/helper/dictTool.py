# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
from __future__ import annotations
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")


from typing import Any, Dict, List, Optional


class DictEx(Dict[str, Any]):
    """dict extractor"""
    def __init__(self, data: Dict[str, Any]) -> None:
        self._data = data
        super().__init__(data)

    def __bool__(self) -> bool:
        return bool(self._data)

    def ensureString(self, key: str, default: str = "") -> str:
        """extracts a string"""
        try:
            return str(self._data[key])
        except: # pylint: disable=bare-except
            return default

    def ensureInt(self, key: str, default: int = 0) -> int:
        """extracts an integer"""
        try:
            return int(self._data[key])
        except: # pylint: disable=bare-except
            return default

    def ensureBool(self, key: str, default: bool = False) -> bool:
        """extracts a boolean"""
        try:
            return bool(self._data[key])
        except: # pylint: disable=bare-except
            return default

    def ensureList(self, key: str, default: Optional[List[Any]] = None) -> List[Any]:
        """extracts a list"""
        try:
            return list(self._data[key])
        except: # pylint: disable=bare-except
            return default or []

    def ensureListChain(self, key: str, default: Optional[List[Any]] = None) -> ListEx:
        """extracts a list and loads it in a list extractor (allowing chaining)"""
        try:
            return ListEx(list(self._data[key]))
        except: # pylint: disable=bare-except
            return ListEx(default or [])

    def ensureDict(self, key: str, default: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """extracts a dict"""
        try:
            return dict(self._data[key])
        except: # pylint: disable=bare-except
            return default or {}

    def ensureDictChain(self, key: str, default: Optional[Dict[str, Any]] = None) -> DictEx:
        """extracts a dict and loads it in a dict extractor (allowing chaining)"""
        try:
            return DictEx(dict(self._data[key]))
        except: # pylint: disable=bare-except
            return DictEx(default or {})


class ListEx(List[Any]):
    """list extractor"""
    def __init__(self, data: List[Any]) -> None:
        self._data = data
        super().__init__(data)

    def __bool__(self) -> bool:
        return bool(self._data)

    def ensureString(self, index: int, default: str = "") -> str:
        """extracts a string"""
        try:
            return str(self._data[index])
        except: # pylint: disable=bare-except
            return default

    def ensureInt(self, index: int, default: int = 0) -> int:
        """extracts a integer"""
        try:
            return int(self._data[index])
        except: # pylint: disable=bare-except
            return default

    def ensureBool(self, index: int, default: bool = False) -> bool:
        """extracts a boolean"""
        try:
            return bool(self._data[index])
        except: # pylint: disable=bare-except
            return default

    def ensureList(self,index: int, default: Optional[List[Any]] = None) -> List[Any]:
        """extracts a list"""
        try:
            return list(self._data[index])
        except: # pylint: disable=bare-except
            return default or []

    def ensureListChain(self,index: int, default: Optional[List[Any]] = None) -> ListEx:
        """extracts a list and loads it in a list extractor (allowing chaining)"""
        try:
            return ListEx(list(self._data[index]))
        except: # pylint: disable=bare-except
            return ListEx(default or [])

    def ensureDict(self, index: int, default: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """extracts a dict"""
        try:
            return dict(self._data[index])
        except: # pylint: disable=bare-except
            return default or {}

    def ensureDictChain(self, index: int, default: Optional[Dict[str, Any]] = None) -> DictEx:
        """extracts a dict and loads it in a dict extractor (allowing chaining)"""
        try:
            return DictEx(dict(self._data[index]))
        except: # pylint: disable=bare-except
            return DictEx(default or {})
