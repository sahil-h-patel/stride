from django.urls import path
from . import views

urlpatterns = [
    path("", views.notion, name="notion"),
]