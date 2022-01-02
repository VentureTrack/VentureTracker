from selenium.webdriver.chrome.options import Options
from selenium import webdriver

from django.core import files
from django.core.files.base import ContentFile

from bs4 import BeautifulSoup
import requests
import logging
import base64

from ..models import Asset, Company

def getHTML(url, xpath):
    try:
        options = Options()
        # options.headless = True
        options.add_argument("--start-maximized")
        options.add_experimental_option('excludeSwitches', ['enable-logging'])
        
        DRIVER_PATH = './portfoliotrack/scripts/chromedriver/chromedriver.exe'
        # DRIVER_PATH = './chromedriver/chromedriver.exe'

        driver = webdriver.Chrome(options=options, executable_path=DRIVER_PATH)

        # get source code of website after javascript loads
        driver.get(url)

        html = driver.find_element_by_xpath(xpath).get_attribute('innerHTML')
        soup = BeautifulSoup(html, 'html.parser')

        driver.close()
        
        return soup
    except:

        try: driver.close()
        except: logging.error("driver.close() failed: manually close the browser")

        logging.error('Failed getting inner HTML in: portfoliotrack/scripts/helper.py')


def getSmartContractAddress(details):
    try:
        options = Options()
        # options.headless = True
        options.add_argument("--start-maximized")
        options.add_experimental_option('excludeSwitches', ['enable-logging'])
        
        DRIVER_PATH = './portfoliotrack/scripts/chromedriver/chromedriver.exe'
        # DRIVER_PATH = './chromedriver/chromedriver.exe'

        driver = webdriver.Chrome(options=options, executable_path=DRIVER_PATH)
        
        rootURL = "https://coinmarketcap.com/"

        # details = [(fk, name, url), (fk, name, url), ...]
        for fk, name, url in details:
            try:
                # get source code of website after javascript loads
                driver.get(rootURL)

                # Enter name into search bar, collect all available search results
                xpath = "/html/body/div/div/div[1]/div[1]/div[1]/div/div[2]/div[3]/div/div[1]"
                html = driver.find_element_by_xpath(xpath).click()

                inputXPath = "/html/body/div/div/div[1]/div[1]/div[1]/div/div[2]/div[4]/div/div/div/div/div[1]/div[1]/input"
                html = driver.find_element_by_xpath(inputXPath).send_keys(name)

                import time
                time.sleep(2)

                # get source code
                # xpath = "/html/body/div/div/div[1]/div[1]/div[1]/div/div[2]/div[4]/div/div/div/div/div[2]/div/div[2]"
                xpath = "/html/body/div/div/div[1]/div[1]/div[1]/div/div[2]/div[4]/div/div/div/div/div[2]/div[1]"
                html = driver.find_element_by_xpath(xpath)
                html = html.get_attribute('innerHTML')

                soup = BeautifulSoup(html, 'html.parser')
                # get all a tags
                aTags = soup.find_all('a')

                for a in aTags:
                    # Check each search result page, and verify correct coin by comparing urls
                    tempURL = a['href']
                    mainURL = "https://coinmarketcap.com" + a['href']

                    # open a new tab
                    driver.get(mainURL)


                    xpath = "/html/body/div/div[1]/div/div[2]/div/div[1]/div[2]/div/div[5]/div/div[1]/ul/li[1]/a"
                    coinsURL = driver.find_element_by_xpath(xpath).get_attribute('href')
                    
                    if url == coinsURL:
                        # print smart contract address
                        xpath = "/html/body/div[1]/div[1]/div/div[2]/div/div[1]/div[2]/div/div[5]/div/div[3]/div[2]/div/a"
                        smartContractAddress = driver.find_element_by_xpath(xpath).get_attribute('href').replace("https://etherscan.io/token/", "")
                        
                        # Add to database
                        try:
                            # TODO: update all assets with same name with smart contract address 
                            company = Company.objects.get(name=fk)
                            Asset.objects.filter(company=company, name=name).update(smartContractAddress=smartContractAddress)
                        except:
                            print("failed adding to database")

                        break
                else:
                    print(f"No match found for: {name} - {url}")                    
            except:
                continue

        driver.close()
    except Exception as e:

        try: driver.close()
        except: logging.error("driver.close() failed: manually close the browser")
        
        print(e)
        print(url)
        logging.error('Script Failed')


def insertDB(fk, name, url=None, image=None, smartContractAddress=None, **kwargs):
    try:
        if image.startswith("data:image/"):
            format, imgstr = image.split(';base64,') 
            ext = format.split('/')[-1] 
            
            image = files.File(ContentFile(base64.b64decode(imgstr)), name + "." + ext)

        elif image.startswith("<svg"):
            image = files.File(ContentFile(str(image)), name + ".svg")

        elif image.startswith("https://"):
            r = requests.get(image)
            filename = image.split("/")[-1]
            ext = "." + filename.split(".")[-1]

            image = files.File(ContentFile(r.content), name + ext)
        else:       
            image = None
  
        # Check if name already exists
        duplicate = Asset.objects.filter(name=name).first()
    
        # check if duplicate retunred an object
        if duplicate != None:
            # the asset already exists, update it
            duplicate.company.add(fk)
        
        # the asset does not exist, create it
        else:
            obj = Asset(name=name, url=url, image=image)
            obj.save()
            obj.company.add(fk)

    except Exception as e:
        print("ERROR")
        print(e)
