import datetime
from django.utils import timezone

import pytest
from pytest_django.fixtures import client
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model

from transport.models import Transport

@pytest.mark.django_db
def test_transport_list():
    client = APIClient()

    Transport.objects.create(
        origin='Tehran',
        destination='Mashhad',
        price=100000,
        transport_type='Flight',
        departure_time=timezone.now(),
        arrival_time=timezone.now() + datetime.timedelta(hours=10),
    )

    response = client.get('/api/transport/')
    transports = response.json()['results']

    assert response.status_code == 200
    assert len(transports) == 1
    assert transports[0]['origin'] == 'Tehran'
    assert transports[0]['transport_type'] == 'Flight'

@pytest.mark.django_db
def test_multiple_transports_list():
    client = APIClient()

    Transport.objects.create(
        origin='Rasht',
        destination='Mashhad',
        price=100000,
        transport_type='Flight',
        departure_time=timezone.now(),
        arrival_time=timezone.now() + datetime.timedelta(hours=10),
    )

    Transport.objects.create(
        origin='Qazvin',
        destination='Tehran',
        price=40000,
        transport_type='Bus',
        departure_time=timezone.now(),
        arrival_time=timezone.now() + datetime.timedelta(hours=2),
    )

    Transport.objects.create(
        origin='Kerman',
        destination='Qom',
        price=120000,
        transport_type='Train',
        departure_time=timezone.now(),
        arrival_time=timezone.now() + datetime.timedelta(hours=2),
    )

    response = client.get('/api/transport/')

    transports = response.json()['results']

    assert len(transports) == 3
    assert transports[0]['origin'] == 'Rasht'
    assert transports[2]['transport_type'] == 'Train'
    assert transports[1]['destination'] == 'Tehran'