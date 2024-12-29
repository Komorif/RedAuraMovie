from rest_framework import serializers
from .models import *
from rest_framework.permissions import IsAuthenticated
from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password

class AnimeVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelVideo
        fields = '__all__'
        db_table = ""

# Register serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'password')
        extra_kwargs = {
            'password':{'write_only': True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], 
                                        password = validated_data['password'],
                                        email = validated_data['email'])
        user.set_password(validated_data['password'])
        user.save()
        return user
    
# User serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'