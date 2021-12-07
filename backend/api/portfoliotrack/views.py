from rest_framework import viewsets

from .serializers import CompanySerializer, AssetsSerializer
from rest_framework.decorators import action

from .models import Company, Asset

from .populate import populateAssets, populateCompany

from .pagination import StandardResultsSetPagination


@action(detail=False, methods=['get'])
class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all().order_by('name')
    print(queryset)
    serializer_class = CompanySerializer

@action(detail=False, methods=['get'])
class AllAssetsViewSet(viewsets.ModelViewSet):
    queryset = Asset.objects.all().order_by('name')
    serializer_class = AssetsSerializer


@action(detail=False, methods=['get'])
class CompanyAssetsViewSet(viewsets.ModelViewSet):
    serializer_class = AssetsSerializer

    @action(detail=True, methods=['get'])
    def get_queryset(self):
        slug = self.kwargs['pk']

        # Allow dashes in slug
        # company = company.replace('-', ' ')

        # get all transactions by congress person
        company = Company.objects.get(name=slug)
        queryset = Asset.objects.filter(company=company)
        # print(queryset)
    
        return queryset

    def retrieve(self, request, *args, **kwargs):
        paginator = StandardResultsSetPagination()
        result_page = paginator.paginate_queryset(self.get_queryset(), request)
        serializer = self.get_serializer(result_page, many=True)

        return paginator.get_paginated_response(serializer.data)


@action(detail=False, methods=['get'])
class AssetsViewSet(viewsets.ModelViewSet):
    serializer_class = AssetsSerializer

    @action(detail=True, methods=['get'])
    def get_queryset(self):
        # Asset Name (Coin name)
        slug = self.kwargs['pk']

        # replace dashes with spaces
        coin = slug.replace('-', ' ')

        # get all transactions by congress person
        queryset = Asset.objects.filter(name=coin)
    
        return queryset

    def retrieve(self, request, *args, **kwargs):
        paginator = StandardResultsSetPagination()
        result_page = paginator.paginate_queryset(self.get_queryset(), request)
        serializer = self.get_serializer(result_page, many=True)

        return paginator.get_paginated_response(serializer.data)

class PopulateDBViewSet(viewsets.ModelViewSet):
    populateCompany()
    populateAssets()
    # pass