from atexit import register
import site
from corsheaders import django
from django.contrib import admin

# Register your models here.
from .models import available_room

admin.site.register(available_room)