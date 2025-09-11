from rest_framework import serializers

from .models import Rap

class RapSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rap
        fields = ["id", "user", "time"]
        
class RapListSerializer(serializers.ListSerializer):
    child = RapSerializer()