from django.shortcuts import render
#from django.shortcuts import render
#from .serializers import loginSerializer, registrationSerializer
from Accounts.models import Users
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status as alt_status
from rest_framework.permissions import IsAuthenticated
#from .services import make_auth_response_data
from rest_framework.authtoken.models import Token
from .models import ToDo
# Create your views here.
class listToDos(APIView):
    permission_classes = (IsAuthenticated,)   
    def get(self,request):
        authToken = request.META.get('HTTP_AUTHORIZATION')
        authToken = authToken.replace("Token ", "")
        person = Token.objects.get(key = authToken ).user

        #query data
        queryToDos = ToDo.objects.filter(user = person)

        data ={
            'detail':'setup'
        }
        return Response(data, status= alt_status.HTTP_200_OK)