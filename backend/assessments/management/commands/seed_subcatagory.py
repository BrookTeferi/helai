from typing import Any
from django.core.management.base import BaseCommand
from account_users.models import User
from assessments.models import Category, SubCategory

class Command(BaseCommand):
    help = "Seed for subcategories"
    def getuserbyrole(self):
        user = User.objects.filter(role='admin').first()
        if user:
            return user
        else:
            return User.objects.first()
        
    def getcatagorybyname(self):
        category = Category.objects.filter(name='Personalization').first()
        if category:
            return category
        else:
            return Category.objects.first()

    def handle(self, *args: Any, **options: Any) -> str | None:
        # Assuming user with ID 1 exists and will be used as the default user for created_by and updated_by
        default_user = self.getuserbyrole()

        # Ensure the "Personalization" category exists
        category=self.getcatagorybyname()

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