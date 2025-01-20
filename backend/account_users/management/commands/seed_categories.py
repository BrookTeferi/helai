from django.core.management.base import BaseCommand
from assessments.models import Category


class Command(BaseCommand):
    help = "Seed initial categories"

    def handle(self, *args, **kwargs):
        categories = ["Time Management", "Learning Preferences", "Technology Usage"]
        for category in categories:
            Category.objects.get_or_create(name=category)
        self.stdout.write(self.style.SUCCESS("Categories seeded successfully!"))
