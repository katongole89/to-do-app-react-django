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
from .services import returnUserFromToken
# Create your views here.
class listToDos(APIView):
    permission_classes = (IsAuthenticated,)   
    def get(self,request):
        person = returnUserFromToken(request)
        #query data
        queryToDos = ToDo.objects.filter(user = person)
        serializer = ToDoSerializer(queryToDos, many=True)
        return Response(serializer.data, status= alt_status.HTTP_200_OK)

class updateIsDone(APIView):
    permission_classes = (IsAuthenticated,)   
    def get(self,request, id):
        person = returnUserFromToken(request)
        #query data
        try:
            queryToDos = ToDo.objects.get(user = person, id=id)
        except:
            data ={}

        if queryToDos.isDone:
            queryToDos = ToDo.objects.filter(user = person, id=id).update(isDone=False)
        else:
            queryToDos = ToDo.objects.filter(user = person, id=id).update(isDone=True)

        data={
            'status': 'success'
        }
        return Response(data, status= alt_status.HTTP_200_OK)