from django.urls import path
from . import consumer as cm


# defining the path

WebSocket_urlpatterns = [

path('ws/crypto',cm.WebSocketOperations.as_asgi()),

]