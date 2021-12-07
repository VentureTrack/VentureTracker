from selenium.webdriver.chrome.options import Options
from selenium import webdriver

from bs4 import BeautifulSoup
import requests

import logging


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


from django.core import files
from django.core.files.base import ContentFile

from ..models import Asset, Company
import base64

def insertDB(fk, name, url=None, image=None, **kwargs):
    try:
        if image.startswith("data:image/"):
            format, imgstr = image.split(';base64,') 
            ext = format.split('/')[-1] 
            
            Asset.objects.update_or_create(company=fk, name=name, url=url,  defaults={'image': files.File(ContentFile(base64.b64decode(imgstr)), name + "." + ext)})

        elif image.startswith("<svg"):
            Asset.objects.update_or_create(company=fk, name=name, url=url, defaults={'image': files.File(ContentFile(str(image)), name + ".svg")})

        elif image.startswith("https://"):
            r = requests.get(image)
            filename = image.split("/")[-1]
            ext = "." + filename.split(".")[-1]

            Asset.objects.update_or_create(company=fk, name=name, url=url,  defaults={'image': files.File(ContentFile(r.content), name + ext)})
        else:
            Asset.objects.update_or_create(company=fk, name=name, url=url)
    except Exception as e:
        print("ERROR")
        print(e)
        print(image)