# -*- coding: utf-8 -*-
"""Nginx Helper Class"""
__copyright__ = "Copyright (c) 2023 https://github.com/reAudioPlayer"

from typing import Callable, Any
import subprocess
from functools import wraps
import logging

from config.runtime import Runtime


class Nginx:
    """Nginx Helper Class"""
    _logger = logging.getLogger("nginx")

    @staticmethod
    def _requiresDocker(func: Callable[..., None]) -> Callable[..., None]:
        @wraps(func)
        def wrapper(*args: Any, **kwargs: Any) -> Any:
            if not Runtime.args.withDocker:
                return None
            try:
                return func(*args, **kwargs)
            except Exception as exc: # pylint: disable=broad-except
                Nginx._logger.error(exc)
                return None
        return wrapper

    @staticmethod
    @_requiresDocker
    def init() -> None:
        """Initializes the nginx server"""
        if Runtime.args.apiOnly:
            Nginx._logger.info("Skipping nginx init, apiOnly is set")
            return

        # /usr/sbin/nginx
        subprocess.run(["/usr/sbin/nginx"],
                       stdout=subprocess.PIPE,
                       stderr=subprocess.PIPE,
                       check = True)
        Nginx._logger.info("nginx started")

    @staticmethod
    @_requiresDocker
    def stop() -> None:
        """Stops the nginx server"""
        # /usr/sbin/nginx
        subprocess.run(["/usr/sbin/nginx", "-s", "stop"],
                       stdout=subprocess.PIPE,
                       stderr=subprocess.PIPE,
                       check = True)
        Nginx._logger.info("nginx stopped")
