from django.contrib.auth.models import Group
from rest_framework import serializers

from m_user.models import MUser


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = MUser
        fields = ["url", "username", "email", "groups"]


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ["url", "name"]
