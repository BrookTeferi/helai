from django.db import models
from django.conf import settings
from django.conf import settings
from account_users.models import Role, User

class Category(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='categories_created')
    updated_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='categories_updated')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Categories'
        ordering = ['name']

class SubCategory(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='subcategories_created')
    updated_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='subcategories_updated')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Sub Categories'
        ordering = ['name']

class QuestionType(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='question_types_created')
    updated_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='question_types_updated')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Question Types'
        ordering = ['name']

def get_default_question_type():
    return QuestionType.objects.filter(question_type='default').first()

class Choice(models.Model):
    sub_category = models.ForeignKey(SubCategory, related_name="choices", on_delete=models.CASCADE)
    question_type = models.ForeignKey(QuestionType, on_delete=models.CASCADE, default=get_default_question_type)
    text = models.CharField(max_length=255)
    answer=models.CharField(max_length=255,null=True, blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='choices_created')
    updated_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='choices_updated')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.text

    class Meta:
        verbose_name_plural = 'Choices'
        ordering = ['text']

class Question(models.Model):
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    sub_category = models.ForeignKey(SubCategory, on_delete=models.CASCADE)
    question_type = models.ForeignKey(QuestionType, on_delete=models.CASCADE)
    text = models.TextField()
    options = models.JSONField()
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='questions_created')
    updated_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='questions_updated')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.role} - {self.sub_category}: {self.text[:50]}"

    class Meta:
        verbose_name_plural = 'Questions'
        ordering = ['text']

class UserAnswer(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='answers')
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    selected_option = models.ForeignKey(Choice, null=True, blank=True, on_delete=models.SET_NULL)
    custom_answer = models.TextField(null=True, blank=True)
    submitted_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_answers_created')
    updated_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_answers_updated')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.question.text[:50]}: {self.selected_option or self.custom_answer}"