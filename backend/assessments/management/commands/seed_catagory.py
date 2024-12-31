from typing import Any
from django.core.management.base import BaseCommand
from assessments.models import Category

class Command(BaseCommand):
    help = "Seed for categories"
    def handle(self, *args: Any, **options: Any) -> str | None:
        categories = [
            "Technology Usage",
            "Learning Preferences",
            "Time Management",
            "Assessment Preferences",
            "Learning Style",
            "Technology Comfort",
            "Motivation",
            "Course Engagement",
            "Preferred Communication",
            "Course Feedback"
        ]
        for category in categories:
            category, created=Category.objects.get_or_create(name=category)
            if created:
                self.stdout.write(self.style.SUCCESS(f"{category} has been seeded successfully!"))
            else:
                self.stdout.write(self.style.WARNING(f"{category} already exists!"))
        
        self.stdout.write(self.style.SUCCESS("Categories have been seeded successfully!"))