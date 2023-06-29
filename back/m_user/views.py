from django.contrib.auth.models import Group
from rest_framework import viewsets
from rest_framework import permissions
from m_user.models import MUser
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiExample
from m_user.serializers import GroupSerializer, UserSerializer


@extend_schema(
    summary="Api to users.",
    description="Return a list of all users in the system.",
)
class UserViewSet(viewsets.ModelViewSet):
    queryset = MUser.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

@extend_schema(
    summary="Api to groups.",
)
class GroupViewSet(viewsets.ModelViewSet):
    """
    Return a list of all groups in the system.
    """

    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]
