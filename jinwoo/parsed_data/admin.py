
from django.contrib import admin
## models에서 Perfume를 import 해옵니다.
from .models import Perfume

## 아래의 코드를 입력하면 Perfume를 admin 페이지에서 관리할 수 있습니다.
admin.site.register(Perfume)