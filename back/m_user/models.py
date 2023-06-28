from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser


class MUser(AbstractUser):
    email = models.EmailField(verbose_name="email address", max_length=255, unique=True)
    USERNAME_FIELD = "email"
    EMAIL_FIELD = "email"
    REQUIRED_FIELDS = ["username"]
