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
from .serializers import ToDoSerializer
# Create your views here.
class listToDos(APIView):
    permission_classes = (IsAuthenticated,)   
    def get(self,request):
        authToken = request.META.get('HTTP_AUTHORIZATION')
        authToken = authToken.replace("Token ", "")
        person = Token.objects.get(key = authToken ).user
        print(person)
        #query data
        queryToDos = ToDo.objects.filter(user = person)
        serializer = ToDoSerializer(queryToDos, many=True)
        return Response(serializer.data, status= alt_status.HTTP_200_OK)