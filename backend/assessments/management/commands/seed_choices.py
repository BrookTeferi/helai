from typing import Any
from django.core.management.base import BaseCommand
from account_users.models import User  # Correct import for the User model
from assessments.models import Choice, SubCategory, QuestionType

class Command(BaseCommand):
    help = "Seed for choices"

    def getuserbyrole(self):
        user = User.objects.filter(role='admin').first()
        if user:
            return user
        else:
            return User.objects.first()
        
   
        
    def getquestiontype(self):
        question_type = QuestionType.objects.filter(question_type='choices').first()
        if question_type:
            return question_type
        else:
            return QuestionType.objects

    def handle(self, *args: Any, **options: Any) -> str | None:
        default_user = self.getuserbyrole()
        default_question_type = QuestionType.objects.first()

        choices = [
            {"sub_category_id": 1, "text": "Using laptops for learning"},
            {"sub_category_id": 2, "text": "Preferring visual aids"},
            {"sub_category_id": 3, "text": "Using planners"},
            {"sub_category_id": 4, "text": "Preferring multiple choice tests"},
            {"sub_category_id": 5, "text": "Preferring hands-on activities"},
            {"sub_category_id": 6, "text": "Comfortable with new software"},
            {"sub_category_id": 7, "text": "Motivated by grades"},
            {"sub_category_id": 8, "text": "Active participation in discussions"},
            {"sub_category_id": 9, "text": "Preferring email communication"},
            {"sub_category_id": 10, "text": "Providing constructive feedback"},
            {"sub_category_id": 11, "text": "Identifying strengths in problem-solving"}
        ]

        for choice_data in choices:
            sub_category = SubCategory.objects.get(pk=choice_data["sub_category_id"])
            choice, created = Choice.objects.get_or_create(
                text=choice_data["text"],
                sub_category=sub_category,
                defaults={
                    "question_type": default_question_type,
                    "created_by": default_user,
                    "updated_by": default_user
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f"{choice.text} has been seeded successfully!"))
            else:
                self.stdout.write(self.style.WARNING(f"{choice.text} already exists!"))

        self.stdout.write(self.style.SUCCESS("Choices have been seeded successfully!"))