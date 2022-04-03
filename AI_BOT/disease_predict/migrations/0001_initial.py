# Generated by Django 3.2.5 on 2022-04-03 13:17

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='available_room',
            fields=[
                ('room_id', models.AutoField(primary_key=True, serialize=False)),
                ('room_name', models.CharField(blank=True, max_length=20, null=True)),
                ('is_active', models.BooleanField(blank=True, default=False, null=True)),
            ],
        ),
    ]
