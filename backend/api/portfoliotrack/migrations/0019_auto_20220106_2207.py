# Generated by Django 3.2.3 on 2022-01-07 03:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfoliotrack', '0018_alter_category_tag'),
    ]

    operations = [
        migrations.AddField(
            model_name='asset',
            name='sparkline',
            field=models.CharField(blank=True, default=None, max_length=400, null=True),
        ),
        migrations.AlterField(
            model_name='asset',
            name='category',
            field=models.ManyToManyField(blank=True, to='portfoliotrack.Category'),
        ),
        migrations.AlterField(
            model_name='category',
            name='tag',
            field=models.CharField(default=None, max_length=600, unique=True),
            preserve_default=False,
        ),
    ]
