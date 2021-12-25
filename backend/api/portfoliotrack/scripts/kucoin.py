# Import Libiraries
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
import demjson
import time

from ..models import Asset, Company

def kucoin():
    options = Options()
    # options.headless = True
    options.add_argument("--start-maximized")
    options.add_experimental_option('excludeSwitches', ['enable-logging'])
    
    # DRIVER_PATH = './chromedriver/chromedriver.exe'
    DRIVER_PATH = './portfoliotrack/scripts/chromedriver/chromedriver.exe'

    driver = webdriver.Chrome(options=options, executable_path=DRIVER_PATH)

    url = f"https://www.kucoin.com/land/investment-incubation-program"


    # get source code of website after javascript loads
    driver.get(url)
    
    # find class "portfolio___2iqqU"
    element = driver.find_element_by_class_name("portfolio___2iqqU")
    classes = element.get_attribute("innerHTML")
    soup = BeautifulSoup(classes, 'html.parser')

    links = []
    images = []

    # hover cursor at all instances of class "item___1f8--"
    items = driver.find_elements_by_class_name("item___1f8--")
    for item in items:
        driver.switch_to.window(driver.window_handles[0])
        
        # get inner attribute
        classes = item.get_attribute("innerHTML")
        soup = BeautifulSoup(classes, 'html.parser')
        # get image
        image = soup.find("img")['src'] 
        images.append(image)

        # hover over item
        actions = ActionChains(driver)
        
        actions.move_to_element(item)
        actions.click()
    
        actions.perform()
        
        driver.switch_to.window(driver.window_handles[-1])
        links.append(driver.current_url)
        driver.close()

    driver.switch_to.window(driver.window_handles[0])

    # execute script 
    html = driver.execute_script("return document.body.innerHTML")
    
    driver.close()
    
    soup = BeautifulSoup(html, 'html.parser')

    # get foreign key
    fk = Company.objects.get(name="Kucoin")
    data = []

    # parse html

    # find all classes ant-popover
    popovers = soup.find_all("div", class_="ant-popover")

    for index, popover in enumerate(popovers):
        # get title by class "ant-popover-title"
        name = popover.find("div", class_="ant-popover-title").text
        url = links[index]
        image = images[index]

        # get details by class "ant-popover-inner-content"
        details = popover.find("div", class_="ant-popover-inner-content")


        from django.core import files
        from django.core.files.base import ContentFile


        r = requests.get(image)
        filename = image.split("/")[-1]
        fileEXT = "." + filename.split('.')[-1]


        Asset.objects.update_or_create(company=fk, name=name, url=url,  defaults={'image': files.File(ContentFile(r.content), name + fileEXT)})


        # print(title.text, details.text, links[index], images[index])
