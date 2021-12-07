# Import Libiraries
from bs4 import BeautifulSoup

from .helper import getHTML, insertDB

from ..models import Company

def cryptocom():
    url = "https://crypto.com/capital"
    xpath = "/html/body/div[1]/div[1]/main/div[4]/div[2]"

    html = getHTML(url, xpath)

    # find all the a tags
    aTags = html.find_all("a")

    # get foreign key
    fk = Company.objects.get(name="Crypto.com")

    # loop through a aTags
    for aTag in aTags:
        # get the href
        url = aTag.get("href")
        
        # get the image
        #  turn this code into ternary operator
        image = aTag.find("img").get("src")

        if not(image.startswith("data:image/")):
            image = "https://crypto.com" + image 
        
        # get domain name within url
        name = url.split("www.")[-1].split("//")[-1].split(".")[0]
        
        insertDB(fk, name, url, image)

# cryptocom()