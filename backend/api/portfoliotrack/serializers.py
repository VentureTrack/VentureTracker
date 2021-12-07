# serializers.py
from rest_framework import serializers
from .models import Company, Asset

from rest_framework.serializers import ModelSerializer, ReadOnlyField


class CompanySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Company
        # fields = ('name',)
        fields = "__all__"
    
class AssetsSerializer(serializers.HyperlinkedModelSerializer):
    company = ReadOnlyField(source='company.name')

    class Meta:
        model = Asset
        # fields = ('company', 'name', 'url', 'image', 'smartContractAddress', 'initialMarketCap', 'initialPrice', 'dateAdded')
        fields = "__all__"