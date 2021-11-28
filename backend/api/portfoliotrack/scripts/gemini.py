# Import Libraries
from bs4 import BeautifulSoup
import requests

def main():

    url = "https://www.gemini.com/frontier-fund"

    response = requests.get(url)

    soup = BeautifulSoup(response.text, 'html.parser')

    # div with class "Grid__Row-jfuv4v-2 style__ImageRow-sc-1p7qpse-2 kNOyUo hUrjNd"
    div = soup.find("div", class_="Grid__Row-jfuv4v-2 style__ImageRow-sc-1p7qpse-2 kNOyUo hUrjNd")

    # get all div tags under div
    divTags = div.find_all("div")

    for divTag in divTags:
        # get div with class "style__InnerContainer-sc-1p7qpse-3 iiRSIO"
        div = divTag.find("div", class_="style__InnerContainer-sc-1p7qpse-3 iiRSIO").find("div", class_="style__ImageContainer-sc-1p7qpse-1 jJSHNQ")
        
        # get href
        url = div.find("a").get("href")

        # get domain name within url
        name = url.split("www.")[-1].split("//")[-1].split(".")[0]

        print(name, url)
        break

    # print(response.text)


main()