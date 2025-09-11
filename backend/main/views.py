from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Rap
from .serializers import RapSerializer


class RapListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = RapSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        raps = Rap.objects.filter(user=self.request.user.id)
        return raps
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
