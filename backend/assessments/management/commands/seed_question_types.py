from typing import Any
from django.core.management.base import BaseCommand
from account_users.models import User  # Correct import for the User model
from assessments.models import QuestionType

class Command(BaseCommand):
    help = "Seed for question types"

    def getuserbyrole(self):
        user = User.objects.filter(role='admin').first()
        if user:
            return user
        else:
            return User.objects.first()

    def handle(self, *args: Any, **options: Any) -> str | None:
        default_user = self.getuserbyrole()

        question_types = [
            {"name": "Multiple Choice", "description": "Questions with multiple choice answers"},
            {"name": "True or False", "description": "Questions with true or false answers"},
            {"name": "Short Answer", "description": "Questions requiring a short written answer"},
            {"name": "Long Answer", "description": "Questions requiring a long written answer"},
            {"name": "Matching", "description": "Questions requiring matching items"},
            {"name": "Fill in the Blanks", "description": "Questions requiring filling in the blanks"},
            {"name": "Ranking", "description": "Questions requiring ranking items"},
            {"name": "Rating Scale", "description": "Questions requiring rating on a scale"},
        ]

        for question_type_data in question_types:
            question_type, created = QuestionType.objects.get_or_create(
                name=question_type_data["name"],
                defaults={
                    "description": question_type_data["description"],
                    "created_by": default_user,
                    "updated_by": default_user
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f"{question_type.name} has been seeded successfully!"))
            else:
                self.stdout.write(self.style.WARNING(f"{question_type.name} already exists!"))

        self.stdout.write(self.style.SUCCESS("Question types have been seeded successfully!"))