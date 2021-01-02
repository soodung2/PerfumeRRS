# Generated by Django 3.1.3 on 2020-11-23 14:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('parsed_data', '0002_auto_20201122_1329'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='blogdata',
            name='output',
        ),
        migrations.AddField(
            model_name='blogdata',
            name='brandName',
            field=models.CharField(max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='blogdata',
            name='convertedDate',
            field=models.CharField(max_length=10, null=True),
        ),
    ]