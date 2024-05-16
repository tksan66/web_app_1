from django.urls import path
from .views import authenticationView

urlpatterns = [
    path('check/', authenticationView.as_view(), name='authentication_db'),
]