# Populate database
from .scripts.kucoin import kucoin
from .scripts.gemini import gemini
from .scripts.coinbaseventures import coinbase
from .scripts.binancelabs import binance
from .scripts.cryptocom import cryptocom
from .scripts.blockchaincom import blockchaincom
from .scripts.gateio import gateio
from .scripts.cointiger import cointiger
from .scripts.okex import okex
from .scripts.huobi import huobi, huobidefilabs

from .models import Asset, Company, Category

from .scripts.helper import getSmartContractAddress

import requests
import json
import time

def populateAssets():
    # kucoin()
    gemini()
    coinbase()
    binance()
    blockchaincom()
    cryptocom()
    gateio()
    cointiger()
    okex()
    huobi()
    huobidefilabs()
    
    # pass

def populateCompany():
    companies = ["Okex", "Huobi", "Cointiger", "Crypto.com", "Kucoin", "Coinbase", "Binance", "Gate.io", "Gemini", "Blockchain.com"]
    
    for company in companies:
        Company.objects.update_or_create(name=company, companyType="Exchange")
    
    # pass

def populateSmartContracts():
    # get all assets
    assets = Asset.objects.all().order_by('name')
    details = []

    for asset in assets:
        details.append((
            asset.company,
            asset.name,
            asset.url,
        ))

    # get all companies
    getSmartContractAddress(details)
    


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

    # get the number between 'https://assets.coingecko.com/coins/images/' and '/' from 'https://assets.coingecko.com/coins/images/13029/thumb/axie_infinity_logo.png?1604471082'
    sparklineId = data['image']['small'][42 : data['image']['small'].find('/', 42)]

    sparkline = f'https://www.coingecko.com/coins/{sparklineId}/sparkline'

    Asset.objects.filter(id=instance.id).update(
        url=url,
        assetPlatform=assetPlatform,
        smartContractAddress=smartContractAddress,
        dailyChange=dailyChange,
        monthlyChange=monthlyChange,
        currentMarketCap=currentMarketCap,
        currentPrice=currentPrice,
        sparkline=sparkline
    )

    for tag in data['categories']:
        # check if tag exists, if not add it
        obj, p = Category.objects.get_or_create(tag=tag)

        # Add obj to many to many field tag
        instance.category.add(obj)
    
    # Second for loop to delete tags that are not in the data
    for tag in instance.category.all():
        if tag.tag not in data['categories']:
            instance.category.remove(tag)
    
    instance.save()
    
    print(instance.category.all())
    
