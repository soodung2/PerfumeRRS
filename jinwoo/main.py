from flask import Flask, render_template, request
from werkzeug.utils import secure_filename
import os, io, re
## Python이 실행될 때 DJANGO_SETTINGS_MODULE이라는 환경 변수에 현재 프로젝트의 settings.py파일 경로를 등록합니다.
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "websaver.settings")
import django
django.setup()
from parsed_data.models import Perfume

app = Flask(__name__)

#업로드 HTML 렌더링
@app.route('/')
def render_file():
   return render_template('upload.html')
   #parsing = Perfume(BrandName = brandname)
   #parsing.save()


#파일 업로드 처리
@app.route('/fileUpload', methods = ['GET', 'POST'])
def upload_file() -> 'html':
   if request.method == 'POST':
      f = request.files['file']
      #저장할 경로 + 파일명
      f.save(secure_filename(f.filename))
      brandname = request.form['brandname']
      parsing = Perfume(brandName = brandname)
      parsing.save()
      exec(open("detectText.py").read())
      expiry_code = Perfume.objects.last().expiryCode
      converteddate = Perfume.objects.last().convertedDate
      return render_template('result.html',resultdata = converteddate, expirycode = expiry_code)
      session.clear()
      

if __name__ == '__main__':
    #서버 실행
   app.run(debug = True)


