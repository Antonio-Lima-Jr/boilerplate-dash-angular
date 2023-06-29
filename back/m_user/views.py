from django.contrib.auth.models import Group
from rest_framework import viewsets
from rest_framework import permissions
from m_user.models import Avatar, MUser
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiExample
from m_user.serializers import AvatarSerializer, GroupSerializer, UserSerializer
from rest_flex_fields.views import FlexFieldsModelViewSet

@extend_schema(
    summary="Api to users.",
    description="Access for all users in the system.",
)
class UserViewSet(FlexFieldsModelViewSet):
    queryset = MUser.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


@extend_schema(
    summary="Api to groups.",
    description="Access for all groups in the system.",
)
class GroupViewSet(FlexFieldsModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


@extend_schema(
    summary="Api to Avatars.",
    description="Access for all avatars in the system.",
)
class AvatarViewSet(FlexFieldsModelViewSet):
    queryset = Avatar.objects.all()
    serializer_class = AvatarSerializer
    permission_classes = [permissions.IsAuthenticated]
