import os, io, re
import webbrowser
import js2py
import convertCode

from flask import Flask, request, Blueprint

import time
from django.db import models

## Python이 실행될 때 DJANGO_SETTINGS_MODULE이라는 환경 변수에 현재 프로젝트의 settings.py파일 경로를 등록합니다.
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "websaver.settings")
import django
django.setup()
from parsed_data.models import Perfume

url = 'http://checkcosmetic.net/'


def detect_text(path): #텍스트 추출
    from google.cloud import vision
    client = vision.ImageAnnotatorClient()

    with io.open(path, 'rb') as image_file:
        content = image_file.read()

    image = vision.types.Image(content=content)

    response = client.text_detection(image=image)
    texts = response.text_annotations

    for text in texts: #텍스트 추출 조건 
        text_data = text.description
        if (text_data.isupper() or (text_data.isdigit())) and len(text_data)>3  : #4글자 이상이고, 영문이 있을경우 대문자이여야 한다.
            if re.findall(r'\d+', text_data) and text_data.isalnum(): #반드시 숫자가 포함된 텍스트이다.
                   print(text_data)
                   parsing = Perfume.objects.last()
                   parsing.expiryCode = text_data
                   parsing.save()
                              

file_name = os.path.join(
    os.path.dirname(__file__),
    'expi_code.jpeg') #감지할 이미지 선택

detect_text(file_name)


convertCode.func()


