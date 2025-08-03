from datetime import datetime
from django.utils import timezone

from rest_framework import serializers

from booking.models import Booking, Passenger, Payment

from transport.serializers import TransportSerializer

from transport.models import Transport


class PassengerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Passenger
        fields = '__all__'


class BookingSerializer(serializers.ModelSerializer):
    passenger = PassengerSerializer()
    transport = serializers.PrimaryKeyRelatedField(queryset=Transport.objects.all())

    class Meta:
        model = Booking
        fields = ['id', 'transport', 'seat_number', 'booking_date', 'passenger', 'is_paid']
        read_only_fields = ['is_paid', 'user']

    def validate(self, data):
        transport = data.get('transport')

        if transport.departure_time < timezone.now():
            raise serializers.ValidationError("Cannot book past trips.")

        if Booking.objects.filter(transport=transport, seat_number=data['seat_number']).exists():
            raise serializers.ValidationError("Seat already booked.")

        return data

    def create(self, validated_data):
        passenger_data = validated_data.pop('passenger')
        passenger = Passenger.objects.create(**passenger_data)
        user=self.context['request'].user

        booking = Booking.objects.create(
            user=user,
            passenger=passenger,
            **validated_data
        )

        Payment.objects.create(
            user=user,
            booking=booking,
            amount=validated_data['transport'].price,
            payment_method='card',
            payment_status='pending'
        )

        return booking

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['transport'] = TransportSerializer(instance.transport).data
        return rep


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'
        read_only_fields = ('status', 'date', 'user')


    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        validated_data['status'] = 'paid'
        payment = super().create(validated_data)

        booking = payment.booking
        booking.is_paid = True
        booking.save()

        return payment