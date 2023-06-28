from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, User


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = User.EMAIL_FIELD
