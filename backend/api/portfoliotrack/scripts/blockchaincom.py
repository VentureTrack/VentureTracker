# Import Libraries
from bs4 import BeautifulSoup
import requests
import re

def main():
    url = "https://www.blockchain.com/ventures"

    response = requests.get(url)

    # get div class "ventures__InvestorsGrid-sc-181vawo-7 kGeVER"
    soup = BeautifulSoup(response.text, 'html.parser')
    div = soup.find("div", class_="ventures__InvestorsGrid-sc-181vawo-7 kGeVER")

    # get all divs with class "ventures__InvestorItem-sc-181vawo-8 wUbrE" under div
    divs = div.find_all("div", class_="ventures__InvestorItem-sc-181vawo-8 wUbrE")

    for div in divs:
        # get a tag element
        aTag = div.find("a")

        # get href from a tag element
        url = aTag.get("href")

        # get domain name within url
        domain = url.split("www.")[-1].split("//")[-1].split(".")[0]

        # get img element src url
        try: imageURL = "https://www.blockchain.com" + aTag.find("img").get("src")
        except: text = None
        
        print(domain, url, imageURL)
        



main()