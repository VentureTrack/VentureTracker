# Import Libraries
from bs4 import BeautifulSoup

from .helper import getHTML, insertDB

from ..models import Company

def gateio():
    url = f"https://ventures.gate.io/"
    xpath = '/html/body/div[1]/div[1]/div/div/div[4]/div'
    
    html = getHTML(url, xpath)
    
    # get all a tags under div
    aTags = html.find_all("a")

    # get foreign key
    fk = Company.objects.get(name="Gate.io")

    for aTag in aTags:
        # get url href
        url = aTag.get("href")

        # get domain name within url
        name = url.split("www.")[-1].split("//")[-1].split(".")[0]

        # get background-url 
        # span = aTag.find("span")

        image = f"https://ventures.gate.io/static_pages/ventures/img/{name}.png"                

        insertDB(fk, name, url, image)

        # print(name, url, image)

# gateio()