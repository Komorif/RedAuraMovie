from django.contrib import admin
from django.urls import include, path
from django.urls import re_path as url
from api.views import *

# Статика
from django.conf import settings
from django.conf.urls.static import static

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("", VideoView.as_view(), name="video"),
    path('api/register', RegisterApi.as_view(), name='register'),
    path("admin/", admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('api/videos/', VideoView.as_view(), name='video_list'),
    path('api/videos/<slug:slug>/', VideoDetailView.as_view(), name='video_detail'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)