from django.core.management.base import BaseCommand
from assessments.models import Category
from django.contrib.auth import get_user_model

User = get_user_model()

class Command(BaseCommand):
    help = "Seed initial categories"

    def handle(self, *args, **kwargs):
        # Replace 'admin' with the username of the default user you want to set as created_by
        default_user = User.objects.get(username='admin')
        
        categories = ["Time Management", "Learning Preferences", "Technology Usage"]
        for category in categories:
            Category.objects.get_or_create(name=category, defaults={'created_by': default_user})
        self.stdout.write(self.style.SUCCESS("Categories seeded successfully!"))