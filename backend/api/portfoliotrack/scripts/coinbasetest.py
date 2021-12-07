# Import libraies
import requests

from helper import getHTML

from bs4 import BeautifulSoup

url = "https://www.coinbase.com/ventures"
xpath = "/html/body/div[1]/div/div/div[2]/main/section[3]/div/div/div"

html = getHTML(url, xpath)
aTags = html.find_all("a")

for a in aTags:
    print(a.text)
    break