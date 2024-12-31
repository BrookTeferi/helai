from django.core.management.base import BaseCommand
from assessments.models import Category, Choice,Question
from account_users.models import Role
from django.conf import settings


class Command(BaseCommand):
    help = "Seed Questions"
    def handle(self, *args, **kwargs):
        questions_data = {
            "Student": {
                "Technology Usage": {
                    "text": "How do you prefer to access educational content?",
                    "options": ["Tablet", "Computer", "Both"],
                },
                "Learning Preferences": {
                    "text": "What is your preferred method of learning?",
                    "options": ["Reading", "Videos", "Interactive Quizzes"],
                },
                "Time Management": {
                    "text": "How many hours a day can you dedicate to learning?",
                    "options": ["1-2 hours", "3-4 hours", "5+ hours"],
                },
            },
            "Instructor": {
                "Technology Usage": {
                    "text": "How do you prefer to access educational content?",
                    "options": ["Tablet", "Computer", "Both"],
                },
                "Learning Preferences": {
                    "text": "What is your preferred method of teaching?",
                    "options": ["Lectures", "Interactive Sessions", "Group Activities"],
                },
                "Time Management": {
                    "text": "How many hours a day can you dedicate to teaching?",
                    "options": ["1-2 hours", "3-4 hours", "5+ hours"],
                },
            },
        }

        for role_name, categories in questions_data.items():
            role = Role.objects.get(name=role_name)
            for category_name, question_data in categories.items():
                category = Category.objects.get(name=category_name)
                question = Question.objects.create(
                    role=role,
                    category=category,
                    text=question_data["text"],
                    options=question_data["options"],
                )

        self.stdout.write(self.style.SUCCESS("Questions have been seeded successfully!"))
