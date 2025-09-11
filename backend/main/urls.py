from django.urls import path
from . import views

urlpatterns = [
    path("raps/", views.RapListCreateAPIView.as_view(), name="rap-list-create"),
]
