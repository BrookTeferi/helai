from django.core.management.base import BaseCommand
from assessments.models import Category
from django.contrib.auth import get_user_model

User = get_user_model()

class Command(BaseCommand):
    help = "Seed initial categories"

    def getuserbyrole(self):
        # Replace 'admin' with the username of the default user you want to set as created_by and updated_by
        user = User.objects.filter(username='admin').first()
        if user:
            return user
        else:
            return User.objects.first()

    def handle(self, *args, **kwargs):
        default_user = self.getuserbyrole()
        if not default_user:
            self.stdout.write(self.style.ERROR("Default user not found. Please ensure the user exists."))
            return

        categories = [
            {"name": "Personalization", "description": "Personalization"},
            {"name": "Skill Identification", "description": "Skill Identification"},
        ]

        for category_data in categories:
            category, created = Category.objects.get_or_create(
                name=category_data["name"],
                defaults={
                    "description": category_data["description"],
                    "created_by": default_user,
                    "updated_by": default_user
                }
            )
        self.stdout.write(self.style.SUCCESS("Categories seeded successfully!"))