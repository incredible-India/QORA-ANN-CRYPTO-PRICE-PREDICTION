"""
ASGI config for CryptoAnalysis project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application

from channels.routing import ProtocolTypeRouter,URLRouter

#routing page where all the routes has been written for the websocket programming
import home.routing as wsrouting


#ProtocolTypeRouter checks weather the request is http or ws

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'CryptoAnalysis.settings')




application = ProtocolTypeRouter({

    'http' : get_asgi_application(),


    'websocket' : URLRouter(
        #all the ws url is wriiten in this page
       wsrouting.WebSocket_urlpatterns


    )

})
