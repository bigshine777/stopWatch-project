from django.contrib.auth.models import User
from django.db import models
import uuid

class Rap(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name="raps")
    time = models.DurationField()
    
    def __str__(self):
        return f"{self.user} - {self.time}"
