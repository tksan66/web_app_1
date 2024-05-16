from django.urls import path
from .views import UpdateDBView, GetHistoryView

urlpatterns = [
    path('updatedb/', UpdateDBView.as_view(), name='update_db'),
    path('getdb/', GetHistoryView.as_view(), name='get_history'),
]