from rest_framework import viewsets

from .serializers import CompanySerializer, AssetsSerializer
from .models import Company, Assets

from .populate import main as populateDB

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all().order_by('name')
    serializer_class = CompanySerializer

class AssetsViewSet(viewsets.ModelViewSet):
    queryset = Assets.objects.all().order_by('name')
    serializer_class = AssetsSerializer

class PopulateDBViewSet(viewsets.ModelViewSet):
    populateDB()