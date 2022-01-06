from rest_framework import viewsets

from .serializers import CompanySerializer, AssetsSerializer
from rest_framework.decorators import action

from .models import Company, Asset
from .populate import populateAssets, populateCompany, populateSmartContracts, priceUpdate
from .pagination import StandardResultsSetPagination


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
    serializer_class = AssetsSerializer
    queryset = Asset.objects.all()

    # filter by slug in url in django rest framework modelviewset
    def get_queryset(self):
        slug = self.kwargs['company']
        
        # #  crypto.com, gate.io, blockchain.com
        slug = slug.replace('com', '.com')
        slug = slug.replace('io', '.io')
        
        # Allow dashes in slug
        # company = company.replace('-', ' ')

        # get all transactions by congress person
        company = Company.objects.get(name=slug)
        queryset = Asset.objects.filter(company=company)
        
        print(queryset)

        # return queryset
        return queryset

    def retrieve(self, request, *args, **kwargs):
        paginator = StandardResultsSetPagination()
        result_page = paginator.paginate_queryset(self.get_queryset(), request)
        serializer = self.get_serializer(result_page, many=True)

        return paginator.get_paginated_response(serializer.data)

class AssetsViewSet(viewsets.ModelViewSet):
    # Get slug from url
    lookup_field = 'name'
    queryset = Asset.objects.all()
    serializer_class = AssetsSerializer

    # filter by slug in url in django rest framework modelviewset
    def get_queryset(self):
        queryset = Asset.objects.filter(name=self.kwargs['name'])
 
        return queryset

class PopulateDBViewSet(viewsets.ModelViewSet):
    # populateCompany()
    # populateAssets()
    # populateSmartContracts()
    # priceUpdate()
    
    pass