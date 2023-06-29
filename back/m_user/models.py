from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser
from versatileimagefield.fields import VersatileImageField, PPOIField


class Avatar(models.Model):
    user = models.OneToOneField(
        "m_user.MUser",
        name="user",
        null=True,
        blank=True,
        related_name="user",
        on_delete=models.CASCADE,
    )
    name = models.CharField(max_length=255)
    image = VersatileImageField("Image", upload_to="images/", ppoi_field="image_ppoi")
    image_ppoi = PPOIField()

    def __str__(self):
        return self.name


class MUser(AbstractUser):
    avatar = models.OneToOneField(
        "m_user.Avatar",
        null=True,
        blank=True,
        related_name="avatar",
        on_delete=models.SET_NULL,
    )
    email = models.EmailField(
        verbose_name="email address",
        max_length=255,
        unique=True,
    )
    USERNAME_FIELD = "email"
    EMAIL_FIELD = "email"
    REQUIRED_FIELDS = ["username"]
