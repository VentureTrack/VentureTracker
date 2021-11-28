# Import Libraries
from bs4 import BeautifulSoup
import requests

from ..models import Assets, Company

def main():
    url = "https://labs.binance.com/"

    response = requests.get(url)

    soup = BeautifulSoup(response.text, "html.parser")
    
    # find div with class "d-flex flex-wrap align-items-center"
    portfolio = soup.find("div", {"class": "d-flex flex-wrap align-items-center"}).find_all("a")

    src = "https://labs.binance.com/"

    # get foreign key
    fk = Company.objects.get(name="Binance")
    data = []

    for asset in portfolio:
        url = asset["href"]
        name = asset.find("img")['alt']
        image = asset.find("img")['src']
        # print(name, url)
        
        Assets.objects.update_or_create(company=fk, name=name, url=url, image=src + image)
# main()