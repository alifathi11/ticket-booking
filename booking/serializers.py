from datetime import datetime


from rest_framework import serializers

from booking.models import Booking


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['id', 'transport', 'seat_number', 'booking_date']

    def validate(self, data):
        transport = data.get('transport')

        if transport.departure_time < datetime.now():
            raise serializers.ValidationError("Cannot book past trips.")

        if Booking.objects.filter(transport=transport, seat_number=data['seat_number']).exists():
            raise serializers.ValidationError("Seat already booked.")

        return data

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
