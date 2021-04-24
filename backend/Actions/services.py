from rest_framework.authtoken.models import Token

def returnUserFromToken(request):
    authToken = request.META.get('HTTP_AUTHORIZATION')
    authToken = authToken.replace("Token ", "")
    person = Token.objects.get(key = authToken ).user
    return person