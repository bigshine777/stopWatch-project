from django.db import models

class Record(models.Model):
    elapsed_time = models.DurationField()
