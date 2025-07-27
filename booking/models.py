from django.contrib.auth.models import User
from django.db import models

from transport.models import Transport


class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    transport = models.ForeignKey(Transport, on_delete=models.CASCADE)
    seat_number = models.CharField(max_length=100)
    booking_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'transport')

    def __str__(self):
        return f"Booking for {self.user} on {self.transport}. seat number: {self.seat_number}"

