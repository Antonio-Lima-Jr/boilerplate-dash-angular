from django.contrib import admin

from m_user.models import MUser

from django.contrib.auth.admin import UserAdmin


class MyUserAdmin(UserAdmin):
    model = MUser
    fieldsets = UserAdmin.fieldsets


admin.site.register(MUser, MyUserAdmin)
