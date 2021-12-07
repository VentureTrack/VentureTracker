# Import Libiraries
from bs4 import BeautifulSoup
import requests

from .helper import getHTML, insertDB

from ..models import Company

def okex():
    url = "https://www.okex.com/blockdream-ventures"
    xpath = '/html/body/div[1]/div/div/div[3]/ul'

    html = getHTML(url, xpath)
    
    cards = html.find_all('li')

    fk = Company.objects.get(name="Okex")

    for card in cards:
        # div "list-item"
        list_item = card.find('div', class_='list-item')

        image = list_item.find("img")['src']
        # find h3
        name = list_item.find('h3').text

        # div "content"
        content = list_item.find('div', class_='content').text

        insertDB(fk, name, None, image)


# okex()