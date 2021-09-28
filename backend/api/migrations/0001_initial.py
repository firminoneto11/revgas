# Generated by Django 3.2.7 on 2021-09-28 14:51

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Banks',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Created at')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Updated at')),
                ('compensation_code', models.IntegerField(unique=True, verbose_name='Código de compensação')),
                ('institution_name', models.CharField(max_length=100, verbose_name='Nome da instituição')),
            ],
            options={
                'verbose_name': 'Bank',
                'verbose_name_plural': 'Banks',
                'db_table': 'BANKS',
                'ordering': ['-id'],
            },
        ),
    ]
