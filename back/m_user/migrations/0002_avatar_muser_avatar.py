# Generated by Django 4.2.2 on 2023-06-29 07:16

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import versatileimagefield.fields


class Migration(migrations.Migration):

    dependencies = [
        ('m_user', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Avatar',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('image', versatileimagefield.fields.VersatileImageField(upload_to='images/', verbose_name='Image')),
                ('image_ppoi', versatileimagefield.fields.PPOIField(default='0.5x0.5', editable=False, max_length=20)),
                ('user', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='muser',
            name='avatar',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='avatar', to='m_user.avatar'),
        ),
    ]
