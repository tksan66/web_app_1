# Generated by Django 5.0.4 on 2024-04-30 06:59

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User_Model',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.CharField(blank=True, default='', max_length=225, null=True, verbose_name='userid')),
                ('user_name', models.CharField(blank=True, default='', max_length=225, null=True, verbose_name='username')),
                ('user_email', models.CharField(blank=True, default='', max_length=225, null=True, verbose_name='useremail')),
            ],
            options={
                'db_table': 'User',
            },
        ),
    ]
