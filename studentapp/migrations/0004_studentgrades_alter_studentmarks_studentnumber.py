# Generated by Django 5.0.7 on 2024-07-23 18:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('studentapp', '0003_studentmarks'),
    ]

    operations = [
        migrations.CreateModel(
            name='StudentGrades',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('grade', models.CharField(max_length=60)),
                ('marklevelstart', models.IntegerField()),
                ('marklevelend', models.IntegerField()),
            ],
        ),
        migrations.AlterField(
            model_name='studentmarks',
            name='studentNumber',
            field=models.CharField(max_length=60),
        ),
    ]
