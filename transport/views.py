from rest_framework import generics, filters, permissions
from .models import Transport
from .serializers import TransportSerializer
from django_filters.rest_framework import DjangoFilterBackend


class TransportListView(generics.ListAPIView):
    queryset = Transport.objects.all()
    serializer_class = TransportSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly, )

    filter_backends = (DjangoFilterBackend, filters.OrderingFilter)
    filterset_fields = ['origin', 'destination', 'departure_time']
    ordering_fields = ['price', 'departure_time']
    ordering = ['departure_time']