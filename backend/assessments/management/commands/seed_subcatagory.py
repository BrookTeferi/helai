from typing import Any
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from assessments.models import Category, SubCategory

class Command(BaseCommand):
    help = "Seed for subcategories"

    def handle(self, *args: Any, **options: Any) -> str | None:
        # Assuming user with ID 1 exists and will be used as the default user for created_by and updated_by
        default_user = User.objects.get(pk=1)

        # Ensure the "Personalization" category exists
        category, created = Category.objects.get_or_create(
            name="Personalization",
            defaults={
                "description": "Personalization",
                "created_by": default_user,
                "updated_by": default_user
            }
        )

        if created:
            self.stdout.write(self.style.SUCCESS(f"{category.name} category has been created successfully!"))
        else:
            self.stdout.write(self.style.WARNING(f"{category.name} category already exists!"))

        subcategories = [
            {"name": "Technology Usage", "description": "Usage of technology in learning"},
            {"name": "Learning Preferences", "description": "Preferences in learning methods"},
            {"name": "Time Management", "description": "Managing time effectively"},
            {"name": "Assessment Preferences", "description": "Preferences in assessments"},
            {"name": "Learning Style", "description": "Individual learning styles"},
            {"name": "Technology Comfort", "description": "Comfort with using technology"},
            {"name": "Motivation", "description": "Motivation levels in learning"},
            {"name": "Course Engagement", "description": "Engagement in courses"},
            {"name": "Preferred Communication", "description": "Preferred communication methods"},
            {"name": "Course Feedback", "description": "Feedback on courses"},
            {"name": "Skill Identification", "description": "Identifying skills for personalization"}
        ]

        for subcategory_data in subcategories:
            subcategory, created = SubCategory.objects.get_or_create(
                name=subcategory_data["name"],
                category=category,
                defaults={
                    "description": subcategory_data["description"],
                    "created_by": default_user,
                    "updated_by": default_user
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f"{subcategory.name} has been seeded successfully!"))
            else:
                self.stdout.write(self.style.WARNING(f"{subcategory.name} already exists!"))

        self.stdout.write(self.style.SUCCESS("Subcategories have been seeded successfully!"))