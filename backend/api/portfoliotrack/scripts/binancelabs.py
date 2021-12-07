# Import Libraries
from bs4 import BeautifulSoup

from .helper import getHTML, insertDB

from ..models import Company

def binance():
    url = "https://labs.binance.com/"
    xpath = "/html/body/div[1]/section[2]/div/div[5]/div/div[2]/div"
    
    html = getHTML(url, xpath)
    
    # find div with class "d-flex flex-wrap align-items-center"
    portfolio = html.find_all("a")

    # get foreign key
    fk = Company.objects.get(name="Binance")
    
    for asset in portfolio:
        url = asset["href"]
        name = asset.find("img")['alt']
        image = "https://labs.binance.com/" + asset.find("img")['src']
        
        insertDB(fk, name, url, image)        
        # print(name, url)


# binance()