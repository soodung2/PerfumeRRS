from django.db import models

# Create your models here.

class Perfume(models.Model):
    brandName = models.CharField(max_length=20, null = True)
    expiryCode = models.CharField(max_length=20, null = True)
    convertedDate = models.CharField(max_length=10, null = True)

