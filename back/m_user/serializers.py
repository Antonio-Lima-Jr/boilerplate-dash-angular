from django.contrib.auth.models import Group
from rest_framework import serializers

from m_user.models import Avatar, MUser
from versatileimagefield.serializers import VersatileImageFieldSerializer
from rest_flex_fields import FlexFieldsModelSerializer


class UserSerializer(FlexFieldsModelSerializer):
    class Meta:
        model = MUser
        fields = ["url", "username", "email", "groups"]
        expandable_fields = {
            "avatar": ("m_user.AvatarSerializer"),
        }


class GroupSerializer(FlexFieldsModelSerializer):
    class Meta:
        model = Group
        fields = ["url", "name"]


class AvatarSerializer(FlexFieldsModelSerializer):
    image = VersatileImageFieldSerializer(
        sizes=[
            ("full_size", "url"),
            ("small_square_crop", "crop__50x50"),
            ("thumbnail", "thumbnail__100x100"),
            ("medium_square_crop", "crop__400x400"),
        ]
    )

    class Meta:
        model = Avatar
        fields = ["pk", "name", "image"]
