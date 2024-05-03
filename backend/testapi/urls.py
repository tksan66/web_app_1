from django.urls import path, include
from rest_framework import routers
from . import views

# router = routers.DefaultRouter()
# router.register('random-strings', views.RandomStringViewSet)

# urlpatterns = [
#     path('', include(router.urls)),
# ]

urlpatterns = [
    path('', views.AddTestView.as_view(), name='add-test'),
]