from django.contrib import admin

from booking.models import Booking


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ['user', 'transport', 'seat_number', 'booking_date']
    list_filter = ['user__username', 'transport__transport_type', 'booking_date']
    search_fields = ['user__username', 'transport__transport_type', 'seat_number']
