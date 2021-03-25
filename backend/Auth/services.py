#imports
from .serializers import accReturnSerializer
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status as alt_status
from . import exceptions as exc
from django.utils.translation import ugettext as _

def authTokenReturn(account):
    try:
        token_obj = Token.objects.get(user = account)
    except:
        raise exc.BadRequest(_("account not associated with any token"))
    return token_obj.key


def make_auth_response_data(account) -> dict:
    serializer = accReturnSerializer(account)
    data = dict(serializer.data)
    data['auth_token'] = authTokenReturn(account)
    return data
