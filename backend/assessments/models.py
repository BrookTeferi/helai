from django.db import models
from django.conf import settings
from account_users.models import Role 


class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Choice(models.Model):
    category = models.ForeignKey(Category, related_name="choices", on_delete=models.CASCADE)
    text = models.CharField(max_length=255)

    def __str__(self):
        return self.text

class Question(models.Model):
    role = models.ForeignKey(Role, on_delete=models.CASCADE)  # Role associated with the question
    category = models.ForeignKey(Category, on_delete=models.CASCADE)  # Category associated with the question
    text = models.TextField()  # Question text
    options = models.JSONField()  # JSON field for answer options

    def __str__(self):
        return f"{self.role} - {self.category}: {self.text[:50]}"

class UserAnswer(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  # Corrected user reference
    question = models.ForeignKey(Question, on_delete=models.CASCADE)  # Link to the question being answered
    selected_option = models.ForeignKey(Choice, null=True, blank=True, on_delete=models.SET_NULL)  # Selected choice
    custom_answer = models.TextField(null=True, blank=True)  # Free-text answer field
    submitted_at = models.DateTimeField(auto_now_add=True)  # Timestamp for the answer submission

    def __str__(self):
        return f"{self.user.username} - {self.question.text[:50]}: {self.selected_option or self.custom_answer}"