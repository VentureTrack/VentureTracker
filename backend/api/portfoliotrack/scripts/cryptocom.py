# Import Libiraries
import requests
from bs4 import BeautifulSoup
import re

def main():
    url = "https://crypto.com/capital"
    
    response = requests.get(url).text

    soup = BeautifulSoup(response, 'html.parser')

    # find div with class "css-1fp6g4d"
    div = soup.find("div", class_="css-1fp6g4d")

    # find all the a tags
    aTags = div.find_all("a")

    # loop through a aTags
    for aTag in aTags:
        # get the href
        url = aTag.get("href")
        
        # get the image
        text = aTag.find("img").get("src")

        # get domain name within url
        domain = url.split("www.")[-1].split("//")[-1].split(".")[0]

        # print the text and href
        print(url, domain)



main()
