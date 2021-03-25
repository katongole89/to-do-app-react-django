from django.shortcuts import render
from .serializers import loginSerializer
from Accounts.models import Users
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status as alt_status
from .services import make_auth_response_data
# Create your views here.
class login(APIView):
    def post(self, request):
        serializer = loginSerializer(data= request.data)
        if serializer.is_valid(raise_exception=True):
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']

            try:
                obj = Users.objects.get(username=username)
            except:
                data ={'detail': 'User with username doesnot exist'}
                return Response(data, status=alt_status.HTTP_401_UNAUTHORIZED)

            if obj.check_password(password):
                data = make_auth_response_data(obj)
                return Response(data, status= alt_status.HTTP_200_OK)
            else:
                data = {'detail': 'wrong crudentials'}
                return Response(data, status=alt_status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

