from django.db import models
from account_users.models import Role  # Import Role model

class Category(models.Model):
    name = models.CharField(max_length=50, unique=True)  # Category name (e.g., "Time Management")

    def __str__(self):
        return self.name

class Question(models.Model):
    role = models.ForeignKey(Role, on_delete=models.CASCADE)  # Role associated with the question
    category = models.ForeignKey(Category, on_delete=models.CASCADE)  # Category associated with the question
    text = models.TextField()  # Question text
    options = models.JSONField()  # JSON field for answer options

    def __str__(self):
        return f"{self.role} - {self.category}: {self.text[:50]}"
