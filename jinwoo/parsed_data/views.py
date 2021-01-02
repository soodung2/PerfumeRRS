#from django.http import HttpResponse


#def index(request):
#    return HttpResponse("Hello, world. You're at the parsed index.")

from django.shortcuts import render
from django.http import HttpResponse
 
from .models import Perfume #models에 정의된 Perfume를 불러온다
 
# Create your views here.
def index(request):
    datas = Perfume.objects.all() #BlogData에 있는 모든 객체를 불러와 blogdatas에 저장
    str = '' #리턴해줄 문자열
    for data in datas:
        str += "<p>Expirate date is<br> {}".format(data.output, data.output)#<br>은 html코드로 다음줄로 줄내림할때 사용
    return HttpResponse(str)

    