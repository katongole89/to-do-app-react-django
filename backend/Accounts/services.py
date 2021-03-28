from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status as alt_status
from base import exceptions as exc
from django.utils.translation import ugettext as _
import re

def usernameValidator(username):
    #for now -- update after consultation with the client
    regex = '(?=[a-zA-Z0-9-+_!@#$%^&*.,?<>]{7,20}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*.,?<>])'        
    if not (re.search(regex,username)):
        raise exc.BadRequest(_('username must be madeup of atleast of 7 to 20 characters with altleast one digit, one Capital letter and one special character among these -+_!@#$%^&*.,?<>'))

