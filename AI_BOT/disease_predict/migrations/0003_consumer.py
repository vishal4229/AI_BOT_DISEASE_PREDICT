# Generated by Django 3.2.5 on 2022-04-04 05:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('disease_predict', '0002_available_room_online'),
    ]

    operations = [
        migrations.CreateModel(
            name='Consumer',
            fields=[
                ('consumer_id', models.AutoField(primary_key=True, serialize=False)),
                ('first_name', models.CharField(blank=True, max_length=200)),
            ],
        ),
    ]
