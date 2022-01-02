# Import Libraries
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.chrome.options import Options
from selenium import webdriver
from bs4 import BeautifulSoup

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys

import requests
import json
import time

from ..models import Asset, Company

def gemini():
    options = Options()
    # options.headless = True
    options.add_argument("--start-maximized")
    options.add_experimental_option('excludeSwitches', ['enable-logging'])
    
    DRIVER_PATH = './portfoliotrack/scripts/chromedriver/chromedriver.exe'
    
    driver = webdriver.Chrome(options=options, executable_path=DRIVER_PATH)

    url = f"https://www.gemini.com/frontier-fund"


    # get source code of website after javascript loads
    driver.get(url)

    # handle cookies popup
    driver.find_element_by_xpath('//*[@id="cookiePolicyAgreement"]/div/button').click()
    
    # find selector "#global-layout > main > section.Layout__ContentContainer-sc-1bkov5f-1.style__SectionContentContainer-sc-1p7qpse-0.fNGQvD.NqelJ > div > div.Grid__Row-jfuv4v-2.style__ImageRow-sc-1p7qpse-2.kNOyUo.hUrjNd"
    cssSelector = "#global-layout > main > section.Layout__ContentContainer-sc-1bkov5f-1.style__SectionContentContainer-sc-1p7qpse-0.fNGQvD.NqelJ > div > div.Grid__Row-jfuv4v-2.style__ImageRow-sc-1p7qpse-2.kNOyUo.hUrjNd"
    element = driver.find_element_by_css_selector(cssSelector)

    classes = element.get_attribute("innerHTML")
    soup = BeautifulSoup(classes, 'html.parser')

    # hover cursor at all instances of class "Grid__Col-jfuv4v-3 gJopZv"
    items = driver.find_elements_by_class_name("gJopZv")
    

    # get foreign key
    fk = Company.objects.get(name="Gemini")
    
    for item in items:
        # hover over item
        actions = ActionChains(driver)
        
        actions.move_to_element(item)
    
        actions.perform()

        # print div item
        html = item.get_attribute("innerHTML")
        
        soup = BeautifulSoup(html, 'html.parser')

        # get href attribute
        url = soup.find("a")['href']

        # get domain name within url
        name = soup.find("img")['alt']

        # get image url
        image = "https:" + soup.find("img")['src']

        # get description p tag
        desc = soup.find("p").get_text()


        from django.core import files
        from django.core.files.base import ContentFile

        r = requests.get(image)
        image = image.split('?')[0]
        filename = image.split("/")[-1]
        ext = "." + filename.split(".")[-1]
        
        image = image=files.File(ContentFile(r.content), name + ext)

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



    driver.close()