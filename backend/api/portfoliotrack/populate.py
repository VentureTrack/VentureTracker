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

from .models import Asset, Company

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
    

def priceUpdate():
    # Iterate through all Assets
    assets = Asset.objects.all().order_by('name')

    for asset in assets:
        smartContractAddress = asset.smartContractAddress
        assetPlatform = asset.asset_platform

        if smartContractAddress != None and assetPlatform != None:
            currency = "USD"
            contractAddress = asset.smartContractAddress
            assetPlatform = asset.asset_platform

            url = f"https://api.coingecko.com/api/v3/simple/token_price/{assetPlatform}?contract_addresses={contractAddress}&vs_currencies={currency}&include_market_cap=true"

            response = requests.get(url)
            data = json.loads(response.text)
            
            # instance.initialMarketCap = data[contractAddress][currency.lower() + "_market_cap"] 
            # instance.initialPrice = data[contractAddress][currency.lower()]

            Asset.objects.filter(id=asset.id).update(currentMarketCap=data[contractAddress][currency.lower() + "_market_cap"] , currentPrice=data[contractAddress][currency.lower()])

            time.sleep(2)
    

