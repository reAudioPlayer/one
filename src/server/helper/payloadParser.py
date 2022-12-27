# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

from typing import TypeVar, Type, Dict, Any
from aiohttp import web
from pyaddict.schema import ISchemaType, ValidationResult, Object


T = TypeVar("T")


class PayloadParser:
    """Payload Parser"""
    @staticmethod
    async def fromBody(request: web.Request,
                       schema: ISchemaType[Any],
                       _: Type[T]) -> ValidationResult[T]:
        """get a schema from a request body"""
        return schema.validate(await request.json())

    @staticmethod
    def fromPath(request: web.Request, schema: Object) -> ValidationResult[Dict[str, Any]]:
        """get a schema from a request path"""
        return schema.validate(dict(request.match_info))

    @staticmethod
    def fromQuery(request: web.Request, schema: Object) -> ValidationResult[Dict[str, Any]]:
        """get a schema from a request query"""
        return schema.validate(dict(request.query))
