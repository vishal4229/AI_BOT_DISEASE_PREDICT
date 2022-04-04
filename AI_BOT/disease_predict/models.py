from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class available_room(models.Model):
    room_id = models.AutoField(primary_key=True)
    room_name = models.CharField(max_length = 20,blank=True,null=True)
    is_active = models.BooleanField(default=False,blank=True,null=True)
    online = models.IntegerField(default=0,blank=True,null=True)

class Consumer(models.Model):
    consumer_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=200, blank=True)
    is_staff = models.BooleanField(default=False,blank=True,null=True)