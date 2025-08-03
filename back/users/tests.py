import pytest
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model

User= get_user_model()

@pytest.mark.django_db
def test_user_registration():
    client = APIClient()

    response = client.post('/api/register/', {
        'username': 'testuser',
        'password': 'testpass123'
    })

    assert response.status_code == 201

    response = client.post('/api/token/', {
        'username': 'testuser',
        'password': 'testpass123'
    })


    assert response.status_code == 200
    assert 'access' in response.data
    assert 'refresh' in response.data


@pytest.mark.django_db
def test_registration_weak_password():
    client = APIClient()

    response = client.post('/api/register/', {
        'username': 'testuser',
        'password': '123'
    })

    assert response.status_code == 400


@pytest.mark.django_db
def test_registration_user_exists():
    client = APIClient()

    client.post('/api/register/', {
        'username': 'testuser',
        'password': 'testpass123'
    })

    response = client.post('/api/register/', {
        'username': 'testuser',
        'password': 'testpass123'
    })

    assert response.status_code == 400

@pytest.mark.django_db
def test_registration_wrong_password():
    client = APIClient()

    client.post('/api/register/', {
        'username': 'testuser',
        'password': 'testpass123'
    })

    response = client.post('/api/token/', {
        'username': 'testuser',
        'password': 'wrongpass123'
    })

    assert response.status_code == 401
