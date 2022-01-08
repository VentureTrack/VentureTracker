from rest_framework import viewsets

from .serializers import CompanySerializer, AssetsSerializer
from rest_framework.decorators import action

from .models import Company, Asset
from .populate import populateAssets, populateCompany, populateSmartContracts, priceUpdate

from rest_framework.response import Response

@action(detail=False, methods=['get'])
class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all().order_by('name')
    serializer_class = CompanySerializer
    # permission_classes = [IsAccountAdminOrReadOnly]

@action(detail=False, methods=['get'])
class AllAssetsViewSet(viewsets.ModelViewSet):
    queryset = Asset.objects.all().order_by('name')
    serializer_class = AssetsSerializer
    # permission_classes = [IsAccountAdminOrReadOnly]


class CompanyAssetsViewSet(viewsets.ModelViewSet):
    # Get slug from url
    lookup_field = 'company'
    queryset = Asset.objects.all()
    serializer_class = AssetsSerializer

    # filter by slug in url in django rest framework modelviewset
    def get_queryset(self):
        slug = self.kwargs['company']
        
        #  crypto.com, gate.io, blockchain.com
        slug = slug.replace('com', '.com')
        slug = slug.replace('io', '.io')
        
        # get all transactions by congress person
        company = Company.objects.get(name=slug)
        queryset = Asset.objects.filter(company=company)
        
        return queryset

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_queryset()
        serializer = AssetsSerializer(instance, many=True)
        return Response(serializer.data)

class AssetsViewSet(viewsets.ModelViewSet):
    # Get slug from url
    lookup_field = 'name'
    queryset = Asset.objects.all()
    serializer_class = AssetsSerializer

    # filter by slug in url in django rest framework modelviewset
    def get_queryset(self):
        queryset = Asset.objects.filter(name=self.kwargs['name'])
 
        return queryset

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_queryset()
        serializer = AssetsSerializer(instance, many=True)
        return Response(serializer.data)

class PopulateDBViewSet(viewsets.ModelViewSet):
    # populateCompany()
    # populateAssets()
    # populateSmartContracts()
    
    # filter all objects where coinId has a value
    queryset = Asset.objects.filter(coinId__isnull=False)
    
    i = 0
    for obj in queryset:
        if i == 45:
            print("Sleeping for 10 seconds to avoid rate limit")
            time.sleep(10)
            i = 0
        priceUpdate(obj)

    pass