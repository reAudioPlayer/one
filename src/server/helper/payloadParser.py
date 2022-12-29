# -*- coding: utf-8 -*-
"""reAudioPlayer ONE"""
__copyright__ = ("Copyright (c) 2022 https://github.com/reAudioPlayer")

from functools import wraps
from typing import TypeVar, Type, Dict, Any, Callable, Awaitable
from aiohttp import web
from pyaddict.schema import ISchemaType, ValidationResult, Object, ValidationError


T = TypeVar("T")

def withObjectPayload(schema: Object,
                      inBody: bool = False,
                      inPath: bool = False,
                      inQuery: bool = False) -> Callable[
                                                    [ Callable[[Any, Any],
                                                      Awaitable[web.Response]] ],
                                                    Callable[ [Any, Any],
                                                              Awaitable[web.Response]
                                                            ] ]:
    """decorator for parsing a payload"""
    assert inBody or inPath or inQuery, "at least one of inBody, inPath or inQuery must be True"

    def decorator(func: Callable[[Any, Any],
                                 Awaitable[web.Response]]) -> Callable[[Any, Any],
                                                                       Awaitable[web.Response]]:
        @wraps(func)
        async def wrapper(*args: Any, **kwargs: Any) -> web.Response:
            request = args[1]

            if inBody:
                payload = await PayloadParser.fromBody(request, schema, dict)
            elif inPath:
                payload = PayloadParser.fromPath(request, schema)
            else:
                payload = PayloadParser.fromQuery(request, schema)
            if not payload:
                return web.HTTPBadRequest(text = str(payload.error))
            args = (args[0], payload.unwrap(), *args[2:])
            return await func(*args, **kwargs)
        return wrapper
    return decorator


class PayloadParser:
    """Payload Parser"""
    @staticmethod
    async def fromBody(request: web.Request,
                       schema: ISchemaType[Any],
                       _: Type[T]) -> ValidationResult[T]:
        """get a schema from a request body"""
        if request.content_type != "application/json":
            return ValidationResult.err(
                ValidationError("request content type must be application/json", [], "json"))

        try:
            jdata = await request.json()
        except ValueError:
            return ValidationResult.err(
                ValidationError("request body must be valid json", [], "json"))

        return schema.validate(jdata)
    @staticmethod
    def fromPath(request: web.Request, schema: Object) -> ValidationResult[Dict[str, Any]]:
        """get a schema from a request path"""
        return schema.validate(dict(request.match_info))

    @staticmethod
    def fromQuery(request: web.Request, schema: Object) -> ValidationResult[Dict[str, Any]]:
        """get a schema from a request query"""
        return schema.validate(dict(request.query))
