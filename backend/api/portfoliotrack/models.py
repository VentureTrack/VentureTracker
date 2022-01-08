from django.db import models

from django.dispatch import receiver
from django.db.models.signals import pre_save, post_save

from django.db.models import signals

from functools import wraps

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
    category = models.ManyToManyField(Category, blank=True)

    name = models.CharField(max_length=60, unique=True)
    url = models.URLField(max_length=200, blank=True, null=True)
    image = models.ImageField(upload_to='images/')

    # Coin Contract Detail
    smartContractAddress = models.CharField(max_length=500, blank=True, null=True, unique=True)
    
    assetPlatform = models.CharField(max_length=60, blank=True, null=True)
    
    currentMarketCap = models.FloatField(blank=True, null=True, default=0) 
    currentPrice = models.FloatField(blank=True, null=True, default=0)
    
    dailyChange = models.FloatField(blank=True, null=True, default=0)
    monthlyChange = models.FloatField(blank=True, null=True, default=0)

    coinId = models.CharField(max_length=60, blank=True, null=True, default=None) 

    sparkline = models.CharField(max_length=400, blank=True, null=True, default=None)

    dateAdded = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.name
    
    # I beleive this is deprecated
    class Meta:
        unique_together = (('name', 'url', 'image', 'smartContractAddress', 'assetPlatform'),)

        

# @receiver(post_save, sender=Asset)
# def updatePrices(sender, instance, raw, signal, created, *args, **kwargs):    
#     pass
