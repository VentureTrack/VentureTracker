# Generated by Django 3.2.3 on 2022-01-02 06:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('portfoliotrack', '0008_remove_company_image'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='asset',
            unique_together={('name', 'url', 'image', 'catagorey', 'smartContractAddress', 'asset_platform', 'initialMarketCap', 'initialPrice')},
        ),
    ]