from selenium.webdriver.chrome.options import Options
from selenium import webdriver
from bs4 import BeautifulSoup

def main():
    options = Options()
    # options.headless = True
    options.add_experimental_option('excludeSwitches', ['enable-logging'])
    
    DRIVER_PATH = './chromedriver/chromedriver.exe'

    driver = webdriver.Chrome(options=options, executable_path=DRIVER_PATH)

    url = f"https://ventures.gate.io/"

    # get source code of website after javascript loads
    driver.get(url)
    html = driver.page_source
    driver.close()

    # parse html
    soup = BeautifulSoup(html, 'html.parser')
    
    # div with class "Ventures-port-box"
    div = soup.find("div", class_="Ventures-port-box")

    # get all a tags under div
    aTags = div.find_all("a")

    for aTag in aTags:
        # get url href
        url = aTag.get("href")

        # get domain name within url
        name = url.split("www.")[-1].split("//")[-1].split(".")[0]

        print(name, url)

main()