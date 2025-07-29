import datetime
from django.utils import timezone
import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

from booking.models import Booking, Passenger
from transport.models import Transport


@pytest.mark.django_db
def test_booking_requires_auth():
    client = APIClient()

    response = client.get('/api/booking/')

    assert response.status_code == 401

@pytest.mark.django_db
def test_booking_list_authenticated_user():
    client = APIClient()
    user = get_user_model().objects.create(username='user', password='pass12345')
    client.force_authenticate(user=user)

    response = client.get('/api/booking/list/')

    assert response.status_code == 200

@pytest.mark.django_db
def test_booking_list_details():
    client = APIClient()
    user = get_user_model().objects.create(username='user', password='pass12345')
    client.force_authenticate(user=user)

    transport = Transport.objects.create(
        origin='Tehran',
        destination='Mashhad',
        price=100000,
        transport_type='Flight',
        departure_time=timezone.now(),
        arrival_time=timezone.now() + datetime.timedelta(hours=10),
    )

    passenger = Passenger.objects.create(
        full_name='ali fathi',
        age=10,
        gender='Male'
    )

    Booking.objects.create(
        user=user,
        transport=transport,
        passenger=passenger,
        seat_number=2,
        booking_date=timezone.now() + datetime.timedelta(hours=10),
        is_paid=False
    )

    response = client.get('/api/booking/list/')

    assert response.status_code == 200

    bookings = response.json()['results']

    assert len(bookings) == 1
    assert bookings[0]['passenger']['full_name'] == 'ali fathi'
    assert bookings[0]['seat_number'] == '2'
    assert bookings[0]['is_paid'] == False
    assert bookings[0]['transport']['origin'] == 'Tehran'
