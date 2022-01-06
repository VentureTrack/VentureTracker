from django.db import models

from django.dispatch import receiver
from django.db.models.signals import pre_save, post_save

from django.db.models import signals

import requests
import json

# Create your models here.
class Company(models.Model):
    name = models.CharField(max_length=60, unique=True)
    affiliateLink = models.CharField(max_length=200, blank=True, null=True)
    twitter = models.CharField(max_length=200, blank=True, null=True)
    logo = models.ImageField(upload_to='media', blank=True, null=True)
    companyType = models.CharField(max_length=200, blank=True, null=True)
    website = models.CharField(max_length=200, blank=True, null=True, default=None)

    def __str__(self):
        return self.name

    class Meta:
        unique_together = ['name', 'affiliateLink', 'twitter', 'logo', 'companyType']

class Category(models.Model):
    tag = models.CharField(max_length=600, unique=True)

    def __str__(self):
        return self.tag

class Asset(models.Model):
    company = models.ManyToManyField(Company, blank=False)
    name = models.CharField(max_length=60, unique=True)
    url = models.URLField(max_length=200, blank=True, null=True)
    image = models.ImageField(upload_to='images/')
    category = models.ManyToManyField(Category, blank=True)

    # Coin Contract Detail
    smartContractAddress = models.CharField(max_length=500, blank=True, null=True, unique=True)
    
    assetPlatform = models.CharField(max_length=60, blank=True, null=True)
    
    currentMarketCap = models.FloatField(blank=True, null=True, default=0) 
    currentPrice = models.FloatField(blank=True, null=True, default=0)
    
    dailyChange = models.FloatField(blank=True, null=True, default=0)
    monthlyChange = models.FloatField(blank=True, null=True, default=0)

    coinId = models.CharField(max_length=60, blank=True, null=True, default=None) 

    dateAdded = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.name
    
    # I beleive this is deprecated
    class Meta:
        unique_together = (('name', 'url', 'image', 'smartContractAddress', 'assetPlatform'),)


def priceUpdate(instance):
    # if not instance.initialMarketCap and instance.assetPlatform: 
    # Get current marketcap and price from coingeko
    currency = "USD"

    url = f"https://api.coingecko.com/api/v3/coins/{instance.coinId}?tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false"

    response = requests.get(url)
    data = json.loads(response.text)

    url = data['links']['homepage'][0] or None
    assetPlatform = data['asset_platform_id'] or None
    
    if assetPlatform is not None:
        smartContractAddress = data['platforms'][data['asset_platform_id']] or None
    else:
        smartContractAddress = None
    
    dailyChange = data['market_data']['price_change_percentage_24h_in_currency'][currency.lower()] or None
    monthlyChange = data['market_data']['price_change_percentage_30d_in_currency'][currency.lower()] or None
    currentMarketCap = data['market_data']['market_cap'][currency.lower()] or None
    currentPrice = data['market_data']['current_price'][currency.lower()] or None

    Asset.objects.filter(id=instance.id).update(
        url=url,
        assetPlatform=assetPlatform,
        smartContractAddress=smartContractAddress,
        dailyChange=dailyChange,
        monthlyChange=monthlyChange,
        currentMarketCap=currentMarketCap,
        currentPrice=currentPrice
    )

    print(instance.category.all())
    for tag in data['categories']:
        # check if tag exists, if not add it
        obj, p = Category.objects.get_or_create(tag=tag)
        
        # check to see if instance.category has this tag
        print(instance)
        if obj not in instance.category.all():
            instance.category.add(obj.id)

    print(instance.category.all())
        

@receiver(post_save, sender=Asset)
def updatePrices(sender, instance, raw, signal, *args, **kwargs):
    if not raw and instance.coinId != None:
            priceUpdate(instance)