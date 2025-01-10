from typing import Any
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from assessments.models import Category

class Command(BaseCommand):
    help = "Seed for categories"

    def handle(self, *args: Any, **options: Any) -> str | None:
        # Assuming user with ID 1 exists and will be used as the default user for created_by and updated_by
        default_user = User.objects.get(pk=1)

        categories = [
            {"name": "Persionalization", "description": "persionalization"},
            {"name": "Skill identification", "description": "Skill identification"},
         
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