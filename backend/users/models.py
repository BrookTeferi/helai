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

    