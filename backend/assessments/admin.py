from django.contrib import admin
from .models import Category, Choice, Question, UserAnswer

@admin.register(UserAnswer)
class UserAnswerAdmin(admin.ModelAdmin):
    list_display = ('user', 'question', 'selected_option', 'custom_answer', 'submitted_at')
    list_filter = ('user', 'question__category', 'submitted_at')
    search_fields = ('user__username', 'question__text')

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ("role", "category", "text")
    list_filter = ("role", "category")
    search_fields = ("text",)

@admin.register(Choice)
class ChoiceAdmin(admin.ModelAdmin):
    list_display = ('id', 'category', 'text')
    list_filter = ('category',)