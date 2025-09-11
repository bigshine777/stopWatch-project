from rest_framework import serializers

from .models import Rap


class RapSerializer(serializers.ModelSerializer):
    h = serializers.SerializerMethodField()
    m = serializers.SerializerMethodField()
    s = serializers.SerializerMethodField()

    class Meta:
        model = Rap
        fields = ["id", "user", "time", "h", "m", "s"]
        read_only_fields = ["id", "user"]

    def get_h(self, obj):
        return obj.time.seconds // 3600

    def get_m(self, obj):
        return (obj.time.seconds % 3600) // 60

    def get_s(self, obj):
        return obj.time.seconds % 60


class RapListSerializer(serializers.ListSerializer):
    child = RapSerializer()
