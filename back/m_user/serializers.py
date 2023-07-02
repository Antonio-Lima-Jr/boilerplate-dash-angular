from django.contrib.auth.models import Group
from rest_framework import serializers
from app.settings import MEDIA_ROOT

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
    user = serializers.PrimaryKeyRelatedField(queryset=MUser.objects.all())

    class Meta:
        model = Avatar
        fields = ["pk", "name", "image", "user"]

    def create(self, validated_data):
        user = validated_data.get("user", None)
        if not user.is_authenticated:
            return

        avatar, _ = Avatar.objects.update_or_create(
            user=user,
            defaults={
                "name": validated_data.get("name", None),
                "image": validated_data.get("image", None),
            },
        )

        if user.avatar is not avatar:
            user.avatar = avatar
            user.save()

        return avatar
