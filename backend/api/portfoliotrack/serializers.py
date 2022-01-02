# serializers.py
from rest_framework import serializers
from .models import Company, Asset

from rest_framework.serializers import ReadOnlyField


class CompanySerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Company
        fields = ('name', 'affiliateLink', 'twitter', 'logo', 'companyType', 'website',)
        # fields = '__all__'
    
class AssetsSerializer(serializers.HyperlinkedModelSerializer):
    # company = ReadOnlyField(source='company.name')
    company = CompanySerializer(read_only=True, many=True)
    
    class Meta:
        model = Asset
        fields = ('company', 'name', 'url', 'image', 'smartContractAddress', 'initialMarketCap', 'initialPrice', 'dateAdded')
        # fields = '__all__'