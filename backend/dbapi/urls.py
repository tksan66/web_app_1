from django.urls import path
from .views import UpdateDBView, GetHistoryView, DeleteHistoryView

urlpatterns = [
    path('updatedb/', UpdateDBView.as_view(), name='update_db'),
    path('getdb/', GetHistoryView.as_view(), name='get_history'),
    path('deletedb/', DeleteHistoryView.as_view(), name='delete_history'),
]