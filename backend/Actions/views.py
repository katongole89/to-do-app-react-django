from django.shortcuts import render
#from django.shortcuts import render
#from .serializers import loginSerializer, registrationSerializer
from Accounts.models import Users
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status as alt_status
#from .services import make_auth_response_data

# Create your views here.
class index(APIView):
    def get(self,request):
        data ={
            'detail':'setup'
        }
        return Response(data, status= alt_status.HTTP_200_OK)