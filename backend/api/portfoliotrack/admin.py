from django.contrib import admin

from .models import Company, Asset, Category

from django.utils.safestring import mark_safe
from django.utils.html import format_html

class CompanyAdmin(admin.ModelAdmin):
    list_display = ["name"]
    search_fields = ["name"]

class AssetsAdmin(admin.ModelAdmin):
    # list_display = ('company', 'name', 'url', 'image', 'smartContractAddress', 'initialMarketCap', 'initialPrice', 'dateAdded',)
    filter_horizontal = ('company', 'category',)
    list_display = ('name', 'companies', 'currentMarketCap', 'currentPrice', 'url', 'smartContractAddress', 'dateAdded',)

    search_fields = ['name']
    
    def companies(self, obj):
        return ",\n".join([p.name for p in obj.company.all()])

    # def categories(self, obj):
    #     return ",\n".join([p.tag for p in obj.category.all()])

    def url(self, obj):
        return format_html("<a href='{url}'>{url}</a>", url=obj.firm_url)

    def image(self, obj):
        return format_html("<img src='{image}'>{image}</img>", url=obj.firm_url)


admin.site.register(Company, CompanyAdmin)
admin.site.register(Asset, AssetsAdmin)
admin.site.register(Category)