# myapi/urls.py
from django.urls import include, path
from rest_framework import routers
from . import views

from django.conf import settings
from django.conf.urls import url
from django.conf.urls.static import static
from django.contrib import admin

router = routers.DefaultRouter()

# Get all Companies (Exchanges)
router.register(r'company/all', views.CompanyViewSet, basename="CompanyAll")

# Get all Assets (Coins)
router.register(r'asset/all', views.AllAssetsViewSet, basename="AssetsAll")

# Get all Assets (Coins) owned by a Company (Exchange)
router.register(r'company', views.CompanyAssetsViewSet, basename="CompanyAssets")

# Get all Companies (Exchanges) that own a certain Asset (Coin)
router.register(r'asset', views.AssetsViewSet, basename="Asset")


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
] + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)