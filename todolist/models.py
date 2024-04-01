from django.db import models
from django.contrib.auth.models import User

class Todo(models.Model):
    title = models.CharField(max_length=50)
    content = models.CharField(max_length=200)
    is_completed = models.IntegerField(default=0)
    def __str__(self):
        return self.id
