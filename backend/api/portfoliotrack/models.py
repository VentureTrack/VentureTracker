from django.db import models


from django.dispatch import receiver
from django.db.models.signals import pre_save, post_save

from django.db.models import signals

import requests
import json

# Create your models here.
class Company(models.Model):
    name = models.CharField(max_length=60, unique=True)
    
    def __str__(self):
        return self.name


class Assets(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    name = models.CharField(max_length=60)
    url = models.URLField(max_length=200, unique=True)
    image = models.ImageField(upload_to='images/')

    # Smart Contract Detail
    smartContractAddress = models.CharField(max_length=500, blank=True, null=True, unique=True)
    # assetPlatformChoices = ((),
    #                         (),
    #                         (),
    #                         (),
    #                         (),
    #                         (),
    #                         (),
    #                         (),)
    
    asset_platform = models.CharField(max_length=60, blank=True, null=True)
    
    initialMarketCap = models.FloatField(blank=True, null=True) 
    initialPrice = models.FloatField(blank=True, null=True)
    dateAdded = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


@receiver(post_save, sender=Assets)
def updatePrices(sender, instance, signal, *args, **kwargs):
    if instance.smartContractAddress != None:
        # if not instance.initialMarketCap and instance.asset_platform: 
        # Get current marketcap and price from coingeko
        currency = "USD"
        contractAddress = instance.smartContractAddress
        assetPlatform = instance.asset_platform

        url = f"https://api.coingecko.com/api/v3/simple/token_price/{assetPlatform}?contract_addresses={contractAddress}&vs_currencies={currency}&include_market_cap=true"

        response = requests.get(url)
        data = json.loads(response.text)
        
        # instance.initialMarketCap = data[contractAddress][currency.lower() + "_market_cap"] 
        # instance.initialPrice = data[contractAddress][currency.lower()]
        Assets.objects.filter(id=instance.id).update(initialMarketCap=data[contractAddress][currency.lower() + "_market_cap"] , initialPrice=data[contractAddress][currency.lower()])
