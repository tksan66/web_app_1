from django.urls import path
from .views import authenticationView, authenticationcreateView

urlpatterns = [
    path('check/', authenticationView.as_view(), name='authentication_db'),
    path('create/', authenticationcreateView.as_view(), name="authentication_create")
]