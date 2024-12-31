from django.core.management.base import BaseCommand
from assessments.models import Category, Choice

class Command(BaseCommand):
    help = "Seed choices for categories"

    def handle(self, *args, **kwargs):
        choices_data = {
            "Technology Usage": ["Tablet", "Computer", "Both"],
            "Learning Preferences": ["Reading", "Videos", "Interactive Quizzes"],
            "Time Management": ["1-2 hours", "3-4 hours", "5+ hours"],
        }

        for category_name, choices in choices_data.items():
            category = Category.objects.get(name=category_name)
            for choice_text in choices:
                Choice.objects.get_or_create(category=category, text=choice_text)

        self.stdout.write(self.style.SUCCESS("Choices have been seeded successfully!"))
