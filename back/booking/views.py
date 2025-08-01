from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from booking.models import Booking, Payment
from booking.serializers import BookingSerializer, PaymentSerializer
from config.pagination import Pagination


class BookTicketView(generics.CreateAPIView):
    serializer_class = BookingSerializer
    pagination_class = Pagination
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Booking.objects.filter(user=self.request.user)


class MyBookingsView(generics.ListAPIView):
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = Pagination

    def get_queryset(self):
        return Booking.objects.filter(user=self.request.user).order_by('-transport__departure_time')


class CancelBookingView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        try:
            booking = Booking.objects.get(id=pk, user=request.user)
            booking.delete()
            return Response({"detail": "Booking cancelled"}, status=status.HTTP_200_OK)
        except Booking.DoesNotExist:
            return Response({"detail": "Booking not found"}, status=status.HTTP_404_NOT_FOUND)



class PaymentView(generics.CreateAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]



class PaymentHistoryView(generics.ListAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = Pagination


    def get_queryset(self):
        return Payment.objects.filter(user=self.request.user)