from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    ROLE_CHOICES = [
        (_('student'), _('Student')),
        (_('instructor'), _('Instructor')),
        (_('admin'), _('Administrator')),
    ]
    role = models.CharField(
        max_length=10,
        choices=ROLE_CHOICES,
        default='student',
        verbose_name=_('Role')
    )  
    first_name = models.CharField(max_length=150, null=True, blank=True)
    last_name = models.CharField(max_length=150, null=True, blank=True)
    email = models.EmailField(max_length=254, null=True, blank=True)
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    date_of_birth=models.DateField(null=True, blank=True)
    profession=models.CharField(max_length=255, null=True, blank=True)
    specialization=models.CharField(max_length=255, null=True, blank=True)
    years_of_experiance=models.IntegerField(null=True, blank=True)
    country=models.CharField(max_length=255, null=True, blank=True)
    bio=models.TextField(max_length=1000, null=True, blank=True)
    profile_picture=models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    linkedin_profile=models.URLField(null=True, blank=True)
    website=models.URLField(null=True, blank=True)
    twitter_profile=models.URLField(null=True, blank=True)
    facebook_profile=models.URLField(null=True, blank=True)
    instagram_profile=models.URLField(null=True, blank=True)


    onboarding_status = models.CharField(
        max_length=20,
        choices=[
            ('NOT_STARTED', 'Not Started'),
            ('IN_PROGRESS', 'In Progress'),
            ('COMPLETED', 'Completed')
        ],
        default='NOT_STARTED'
    )

    def __str__(self):
        return self.username
    


    