# Generated by Django 3.2.3 on 2022-01-06 06:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('portfoliotrack', '0014_auto_20220106_0108'),
    ]

    operations = [
        migrations.RenameField(
            model_name='asset',
            old_name='lastMonthMarketCap',
            new_name='monthlyChange',
        ),
    ]