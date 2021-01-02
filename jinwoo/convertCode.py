from selenium import webdriver
from selenium.webdriver.common.keys import Keys 
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver import ActionChains
import os, io, re
import webbrowser
import js2py
import time
from django.db import models

## Python이 실행될 때 DJANGO_SETTINGS_MODULE이라는 환경 변수에 현재 프로젝트의 settings.py파일 경로를 등록합니다.
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "websaver.settings")
import django
django.setup()
from parsed_data.models import Perfume

def func():
    #os.environ['MOZ_HEADLESS'] = '1' #웹드라이버 감추는 코드

    driver = webdriver.Firefox(executable_path="/Users/jinwoolee/Downloads/geckodriver")
    driver.get('http://checkcosmetic.net/')
 
    brandname = ''
    brandname = Perfume.objects.last().brandName
    expi_code = ''
    expi_code = Perfume.objects.last().expiryCode
    
    #search brand and select
    brandSearch = driver.find_element_by_id("quicksearch")
    brandSearch.send_keys(brandname)
    brandSearch.click()
    #input the code 
    enterCode = driver.find_element_by_id("codeinput")
    enterCode.send_keys(expi_code)
    #Click the "Calculate" button
    dateSearch = driver.find_element_by_id("codesubmit")
    dateSearch.click()
    time.sleep(3)
    #Crawl the converted expiration date
    date = driver.find_element_by_css_selector('#checkResult > span:nth-child(2)').text
    #Store the expiration date in DB
    parsing = Perfume.objects.last()
    parsing.convertedDate = date
    parsing.save()
                              

