# -*- coding: utf-8 -*-
"""cevlib"""
from __future__ import annotations
__copyright__ = ("Copyright (c) 2022 https://github.com/dxstiny")

from typing import Any, Dict, List, Optional, Type, TypeVar

T = TypeVar("T")


class DictEx(Dict[str, Any]):
    """dict extractor"""
    def __init__(self, data: Optional[Dict[str, Any]] = None) -> None:
        self._data = data or {}
        super().__init__(self._data)

    def __bool__(self) -> bool:
        return bool(self._data)

    def assertGet(self, key: str, type_: Type[T]) -> T:
        """assert has key & is type"""
        assert key in self._data
        val = self._data[key]
        assert isinstance(val, type_)
        return val

    def tryGet(self, key: str, type_: Type[T]) -> Optional[T]:
        """extracts a string"""
        try:
            return type_(self._data[key]) # type: ignore
        except: # pylint: disable=bare-except
            return None

    def ensure(self, key: str, type_: Type[T], default: Optional[T] = None) -> T:
        """get & cast w/ default"""
        try:
            return type_(self._data[key]) # type: ignore
        except: # pylint: disable=bare-except
            return default or type_()

    def ensureString(self, key: str, default: str = "") -> str:
        """extracts a string"""
        return self.ensure(key, str, default)

    def ensureInt(self, key: str, default: int = 0) -> int:
        """extracts an integer"""
        return self.ensure(key, int, default)

    def ensureBool(self, key: str, default: bool = False) -> bool:
        """extracts a boolean"""
        return self.ensure(key, bool, default)

    def ensureList(self, key: str, default: Optional[List[Any]] = None) -> List[Any]:
        """extracts a list"""
        return self.ensure(key, list, default)

    def ensureListChain(self, key: str, default: Optional[ListEx] = None) -> ListEx:
        """extracts a list and loads it in a list extractor (allowing chaining)"""
        return self.ensure(key, ListEx, default)

    def ensureDict(self, key: str, default: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """extracts a dict"""
        return self.ensure(key, dict, default)

    def ensureDictChain(self, key: str, default: Optional[DictEx] = None) -> DictEx:
        """extracts a dict and loads it in a dict extractor (allowing chaining)"""
        return self.ensure(key, DictEx, default)


class ListEx(List[Any]):
    """list extractor"""
    def __init__(self, data: Optional[List[Any]] = None) -> None:
        self._data = data or []
        super().__init__(self._data)

    def __bool__(self) -> bool:
        return bool(self._data)

    def assertGet(self, index: int, type_: Type[T]) -> T:
        """assert has key & is type"""
        assert index < len(self._data)
        val = self._data[index]
        assert isinstance(val, type_)
        return val

    def tryGet(self, index: int, type_: Type[T]) -> Optional[T]:
        """extracts a string"""
        try:
            return type_(self._data[index]) # type: ignore
        except: # pylint: disable=bare-except
            return None

    def ensure(self, index: int, type_: Type[T], default: Optional[T] = None) -> T:
        """get & cast w/ default"""
        try:
            return type_(self._data[index]) # type: ignore
        except: # pylint: disable=bare-except
            return default or type_()

    def iterate(self, type_: Type[T], default: Optional[T] = None) -> List[T]:
        """iterate over list"""
        return [ self.ensure(i, type_, default) for i, _ in enumerate(self._data) ]

    def ensureString(self, index: int, default: str = "") -> str:
        """extracts a string"""
        return self.ensure(index, str, default)

    def ensureInt(self, index: int, default: int = 0) -> int:
        """extracts a integer"""
        return self.ensure(index, int, default)

    def ensureBool(self, index: int, default: bool = False) -> bool:
        """extracts a boolean"""
        return self.ensure(index, bool, default)

    def ensureList(self, index: int, default: Optional[List[Any]] = None) -> List[Any]:
        """extracts a list"""
        return self.ensure(index, list, default)

    def ensureListChain(self,index: int, default: Optional[ListEx] = None) -> ListEx:
        """extracts a list and loads it in a list extractor (allowing chaining)"""
        return self.ensure(index, ListEx, default)

    def ensureDict(self, index: int, default: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """extracts a dict"""
        return self.ensure(index, dict, default)

    def ensureDictChain(self, index: int, default: Optional[DictEx] = None) -> DictEx:
        """extracts a dict and loads it in a dict extractor (allowing chaining)"""
        y = self.ensure(index, DictEx, default)
        return y
