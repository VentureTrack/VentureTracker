# Import Libiraries
from bs4 import BeautifulSoup

from .helper import getHTML, insertDB

from ..models import Company

def cointiger():
    url = "https://www.cointiger.com/en-us/#/labs"
    xpath = '/html/body/div[1]/div/div[2]/div/div[4]/div/ul'

    html = getHTML(url, xpath)

    cards = html.find_all('li')

    fk = Company.objects.get(name="Cointiger")

    for card in cards:
        # find p
        name = card.find('p').text

        url = card.find('a')['href']

        # div "list-item"
        image = card.find("a").find("img")['src']

        # div "content"
        content = card.find('p', class_='labs_item_des-3E5ec').text

        name = url.split("www.")[-1].split("//")[-1].split(".")[0]

        insertDB(fk, name, url, image)

        # print(name, url, content, image)


# cointiger()