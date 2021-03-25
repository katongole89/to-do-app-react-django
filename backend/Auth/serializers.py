from rest_framework import serializers
from Accounts.models import Users

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
    