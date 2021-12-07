from bs4 import BeautifulSoup
import requests

from .helper import getHTML, insertDB

from ..models import Company

def huobidefilabs():
    url = "https://www.huobidefilabs.io/en/Portfolio/"

    xpath = "/html/body/div[1]/div/div/div[2]/div[3]/ul"

    html = getHTML(url, xpath)

    lis = html.find_all('li')

    fk = Company.objects.get(name="Huobi")

    for li in lis:
        div = li.find('div')

        # div with class "iconCon"
        iconCon = div.find('div', class_='iconCon')
        image = "https://www.huobidefilabs.io" + iconCon.find('img')['src']

        textCon = div.find('div', class_='textCon')
        name = textCon.find('div', class_='title').text
        content = textCon.find('div', class_='content').text
        url = textCon.find('div', class_='link').find('a')['href']

        insertDB(fk, name, url, image)
        # print(name, content, url, image)

def huobi():
    url = 'https://www.huobi.com/en-us/capital/'
    xpath = '/html/body/div[1]/div[2]/div[2]'

    html = getHTML(url, xpath)

    aTags = html.find_all('a')

    
    fk = Company.objects.get(name="Huobi")

    for a in aTags:
        url = a['href']
        image = a.find('img')['src']
        name = url.split("www.")[-1].split("//")[-1].split(".")[0]

        insertDB(fk, name, url, image)
        # print(name, url, image)

