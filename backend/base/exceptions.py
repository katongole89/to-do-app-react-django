"""
Handled exceptions raised by REST framework.

In addition Django's built in 403 and 404 exceptions are handled.
(`django.http.Http404` and `django.core.exceptions.PermissionDenied`)
"""
from __future__ import unicode_literals

from django.utils.translation import ugettext_lazy as _

from rest_framework import status
from rest_framework import exceptions

class ErrorDetail(exceptions.APIException):
    pass

class APIException(exceptions.APIException):
    pass

# The recommended style for using `ValidationError` is to keep it namespaced
# under `serializers`, in order to minimize potential confusion with Django's
# built in `ValidationError`. For example:
#
# from rest_framework import serializers
# raise serializers.ValidationError('Value was invalid')

class ValidationError(exceptions.ValidationError):
    pass

class ParseError(exceptions.ParseError):
    pass

class AuthenticationFailed(exceptions.NotAuthenticated):
    pass

class NotAuthenticated(exceptions.NotAuthenticated):
    pass

class PermissionDenied(exceptions.PermissionDenied):
    pass

class NotFound(exceptions.NotFound):
    pass

class MethodNotAllowed(exceptions.MethodNotAllowed):
    pass

class NotAcceptable(exceptions.NotAcceptable):
    pass

class UnsupportedMediaType(exceptions.UnsupportedMediaType):
    pass

class Throttled(exceptions.Throttled):
    pass

class BaseException(exceptions.APIException):
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = _("Unexpected error")

    def __init__(self, detail=None):
        self.detail = detail or self.default_detail

class NotSupported(BaseException):
    status_code = status.HTTP_405_METHOD_NOT_ALLOWED
    default_detail = _("Method not supported for this endpoint.")


class BadRequest(BaseException):
    """
    Exception used on bad arguments detected
    on api view.
    """
    default_detail = _("Wrong arguments.")


class WrongArguments(BadRequest):
    """
    Exception used on bad arguments detected
    on service. This is same as `BadRequest`.
    """
    default_detail = _("Wrong arguments.")


class RequestValidationError(BadRequest):
    default_detail = _("Data validation error")


class IntegrityError(BadRequest):
    default_detail = _("Integrity Error for wrong or invalid arguments")


class PreconditionError(BadRequest):
    """
    Error raised on precondition method on viewset.
    """
    default_detail = _("Precondition error")

class Blocked(APIException):
    """
    Exception used on blocked groups
    """
    status_code = status.HTTP_451_UNAVAILABLE_FOR_LEGAL_REASONS
    default_detail = _("Blocked element")

