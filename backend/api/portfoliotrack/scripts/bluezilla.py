# Import Libraries
from bs4 import BeautifulSoup
import requests

def main():
    url = "https://bluezilla.vc/"

    soup = BeautifulSoup(requests.get(url).text, "html.parser")

    # find section with id "projects"
    portfolio = soup.find("section", {"id": "projects"}).find("div", {"class": "project__list"}).find_all('a')

    for asset in portfolio:
        url  = asset['href']

        # get project-name class
        name = asset.find("div", {"class": "project-name"}).text
        
        # get second img from class project-pic div
        img = asset.find("div", {"class": "project-pic"}).find_all("img")[0]['src']

        print(name, url, "https://bluezilla.vc/" + img)


main()