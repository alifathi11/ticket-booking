from django.db import models

class Transport(models.Model):
    TRANSPORT_TYPES = (
        ('flight', 'Flight'),
        ('bus', 'Bus'),
        ('train', 'Train'),
    )

    transport_type = models.CharField(max_length=10, choices=TRANSPORT_TYPES)
    origin = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    departure_time = models.DateTimeField()
    arrival_time = models.DateTimeField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.transport_type.name} from {self.origin} to {self.destination}"