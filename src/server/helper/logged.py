# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = "Copyright (c) 2022 https://github.com/reAudioPlayer"

import sys
import logging
import logging.config


class Logged:
    """logged class interface"""
    __slots__ = ("_logger",)

    def __init__(self, name: str) -> None:
        self._logger = logging.getLogger(name)

    @staticmethod
    def initLogger() -> None:
        """Initialise the logger"""
        pipeHandler = logging.StreamHandler(sys.stdout)
        logging.config.fileConfig('logging.ini')
        logging.basicConfig(handlers = [pipeHandler], level = logging.INFO)

    @staticmethod
    def getLogger(name: str) -> logging.Logger:
        """Get a logger"""
        return logging.getLogger(name)
