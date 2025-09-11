from rest_framework import generics
from .models import Rap
from .serializers import RapSerializer


class RapListCreateAPIView(generics.ListCreateAPIView):
    queryset = Rap.objects.all()
    serializer_class = RapSerializer
