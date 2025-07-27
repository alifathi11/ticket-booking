from django.urls import path

from booking.views import BookTicketView, CancelBookingView, MyBookingsView

urlpatterns = [
    path('booking/', BookTicketView.as_view(), name='book-ticket'),
    path('booking/list', MyBookingsView.as_view(), name='my-bookings'),
    path('booking/<int:pk>/cancel', CancelBookingView.as_view(), name='cancel-booking'),
]