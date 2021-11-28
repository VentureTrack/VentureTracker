from django.contrib import admin

from .models import Company, Assets
from django.utils.safestring import mark_safe

class CompanyAdmin(admin.ModelAdmin):
    list_display = ["name"]
    search_fields = ["name"]

class AssetsAdmin(admin.ModelAdmin):
    list_display = ('company', 'name', 'url', 'image', 'smartContractAddress', 'initialMarketCap', 'initialPrice', 'dateAdded',)

    search_fields = ['name']
    readonly_fields = ['url']

    # make url open in new tab
    def url(self, instance):
        print(instance.url + "--------------------------------------")
        return format_html(
            '<a href="{0}" target="_blank">{1}</a>',
            instance.url,
            instance.url,
        )

    url.short_description = "Click Me"


admin.site.register(Company, CompanyAdmin)
admin.site.register(Assets, AssetsAdmin)