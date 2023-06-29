from django.urls import path, include, re_path

from rest_framework import routers

from m_user import views


router = routers.DefaultRouter()

router.register(r"users", views.UserViewSet)
router.register(r"groups", views.GroupViewSet)
router.register(r"avatars", views.AvatarViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
