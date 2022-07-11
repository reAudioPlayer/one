# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
from __future__ import annotations
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

import json
import os
from typing import Any, Dict


FILE = "./config/config.json"


def _read() -> Dict[str, Any]:
    if not os.path.exists(FILE):
        return { }
    with open(FILE, "r", encoding = "UTF8") as file:
        return dict(json.load(file))

def _write(data: Dict[str, Any]) -> None:
    with open(FILE, "w", encoding = "UTF8") as file:
        json.dump(data, file, indent = 4)


class PersistentConfig(Dict[str, Any]):
    """PersistentConfig"""
    def __init__(self) -> None:
        self._config = _read()
        super().__init__(self._config)

    def __getitem__(self, key: str) -> Any:
        return self._config[key]

    def __setitem__(self, key: str, value: Any) -> None:
        self._config[key] = value
        _write(self._config)

    @property
    def volume(self) -> float:
        """return volume"""
        return self._config.get("volume", 1.0)

    @volume.setter
    def volume(self, value: float) -> None:
        """set volume"""
        self._config["volume"] = value
        _write(self._config)
