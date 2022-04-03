"""
ASGI config for AI_BOT project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/asgi/
"""

import os

import django
from channels.http import AsgiHandler
from channels.routing import ProtocolTypeRouter

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'AI_BOT.settings')
django.setup()
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
import disease_predict.routing
application = ProtocolTypeRouter({
  "http": get_asgi_application(),
   "websocket": AuthMiddlewareStack(
        URLRouter(
            disease_predict.routing.websocket_urlpatterns
        )
    ),
})