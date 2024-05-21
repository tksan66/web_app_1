from rest_framework import serializers
from .models import RandomString

class RandomStringSerializer(serializers.ModelSerializer):
    class Meta:
        model = RandomString
        fields = ('id', 'text')