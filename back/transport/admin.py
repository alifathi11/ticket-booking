from django.contrib import admin
from transport.models import Transport


@admin.register(Transport)
class TransportAdmin(admin.ModelAdmin):
    list_display = ['transport_type', 'origin', 'destination', 'departure_time', 'price']
    list_filter = ['transport_type', 'origin', 'destination']
    search_fields = ['transport_type', 'origin', 'destination']