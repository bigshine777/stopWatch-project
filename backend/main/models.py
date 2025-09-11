from django.contrib.auth.models import User
from django.db import models
import uuid


class Rap(models.Model):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False, null=False
    )
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="raps", null=False
    )
    time = models.DurationField(null=False)

    def __str__(self):
        return f"{self.user} - {self.time}"
