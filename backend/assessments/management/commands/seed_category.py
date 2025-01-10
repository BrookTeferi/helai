from typing import Any
from django.core.management.base import BaseCommand
from account_users.models import User  # Correct import for the User model
from assessments.models import Category

class Command(BaseCommand):
    help = "Seed for categories"

    def getuserbyrole(self):
        user = User.objects.filter(role='admin').first()
        if user:
            return user
        else:
            return User.objects.first()

    def handle(self, *args: Any, **options: Any) -> str | None:
        default_user = self.getuserbyrole()

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
            if created:
                self.stdout.write(self.style.SUCCESS(f"{category.name} has been seeded successfully!"))
            else:
                self.stdout.write(self.style.WARNING(f"{category.name} already exists!"))

        self.stdout.write(self.style.SUCCESS("Categories have been seeded successfully!"))