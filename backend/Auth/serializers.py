from rest_framework import serializers
from Accounts.models import Users
from Accounts.services import usernameValidator, usernameExists

class loginSerializer(serializers.Serializer):
    
    username = serializers.CharField(max_length= 50)
    password = serializers.CharField(max_length=200)
    extra_kwargs = {
            'password': {'write_only': True}
        }

class accReturnSerializer(serializers.ModelSerializer):

    class Meta:
        model = Users
        fields = ('id', 'username', 'first_name', 'last_name', 'email')

class registrationSerializer(serializers.Serializer):
    username = serializers.CharField(max_length= 50)
    password = serializers.CharField(max_length=200)
    email = serializers.EmailField(max_length=200)
    first_name = serializers.CharField(max_length=200)
    last_name = serializers.CharField(max_length=200)
    
    extra_kwargs = {
            'password': {'write_only': True}
        }

    def save(self):
        username = self.validated_data['username']
        usernameValidator(username)
        usernameExists(username)

        account = Users(
            username = username,
            email = self.validated_data['email'],
            first_name = self.validated_data['first_name'],
            last_name = self.validated_data['last_name'],
        )
        password = self.validated_data['password']
        account.set_password(password)
        account.save()
        return account
    