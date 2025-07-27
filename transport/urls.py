from django.urls import path

from transport.views import TransportListView

urlpatterns = [
    path('transport/', TransportListView.as_view(), name='transport-list')
]