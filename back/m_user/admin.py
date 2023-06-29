from django.contrib import admin

from m_user.models import Avatar, MUser

from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserChangeForm


class MyUserChangeForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = MUser


class MyUserAdmin(UserAdmin):
    model = MyUserChangeForm
    fieldsets = UserAdmin.fieldsets + (("Custom Fields", {"fields": ("avatar",)}),)


admin.site.register(MUser, MyUserAdmin)
admin.site.register(Avatar)
