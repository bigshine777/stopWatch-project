from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path("raps/", views.RapListCreateAPIView.as_view(), name="rap-list-create"),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair')
]
