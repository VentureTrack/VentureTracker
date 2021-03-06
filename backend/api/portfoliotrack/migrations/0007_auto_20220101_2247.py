# Generated by Django 3.2.3 on 2022-01-02 03:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfoliotrack', '0006_rename_assets_asset'),
    ]

    operations = [
        migrations.AddField(
            model_name='company',
            name='image',
            field=models.ImageField(blank=True, default=None, null=True, upload_to='media'),
        ),
        migrations.AddField(
            model_name='company',
            name='website',
            field=models.CharField(blank=True, default=None, max_length=200, null=True),
        ),
    ]
