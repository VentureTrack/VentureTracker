# Import Libraries
from bs4 import BeautifulSoup

from .helper import getHTML, insertDB

from ..models import Company

def blockchaincom():
    url = "https://www.blockchain.com/ventures"
    xpath = "/html/body/div[1]/div[1]/main/div[2]"

    html = getHTML(url, xpath)
    
    # get all divs with class "ventures__InvestorItem-sc-181vawo-8 wUbrE" under div
    divs = html.find_all("div", class_="ventures__InvestorItem-sc-181vawo-8 wUbrE")

    # get foreign key
    fk = Company.objects.get(name="Blockchain.com")

    for div in divs:
        # get a tag element
        aTag = div.find("a")

        # get href from a tag element
        url = aTag.get("href")

        # get domain name within url
        name = url.split("www.")[-1].split("//")[-1].split(".")[0]

        try: image = "https://www.blockchain.com" + aTag.find("img").get("src")
        except: image = str(aTag.find("svg"))
        
        insertDB(fk, name, url, image)

