# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
from __future__ import annotations
__copyright__ = "Copyright (c) 2022 https://github.com/reAudioPlayer"

import logging
import os


BASE = "../usr"
FILE = os.path.join(BASE, "config.json")
SPOTIFY = os.path.join(BASE, "spotify.json")
CACHE = os.path.join(BASE, "cache.json")
GITHUB = os.path.join(BASE, "github.json")


class Migrator:
    """migrates old files to new location"""
    @staticmethod
    def migrate() -> None:
        """migrate"""
        if not os.path.exists(BASE):
            os.makedirs(BASE)

        Migrator._migrateFile("./config/config.json")
        Migrator._migrateFile("./config/spotify.json")
        Migrator._migrateFile("./db/db/main.db")

    @staticmethod
    def _migrateFile(file: str) -> None:
        """move to new location"""
        if not os.path.exists(file):
            return

        logger = logging.getLogger("Migrator")

        logger.debug("[Migration] Moving %s to %s", file, BASE)
        filename = os.path.basename(file)
        os.rename(file, os.path.join(BASE, filename))
