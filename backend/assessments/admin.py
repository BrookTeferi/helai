from django.contrib import admin
from .models import Category, SubCategory, QuestionType, Choice, Question, UserAnswer

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'created_by', 'updated_by', 'created_at', 'updated_at')
    search_fields = ('name', 'description')
    list_filter = ('created_at', 'updated_at')

@admin.register(SubCategory)
class SubCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'category', 'created_by', 'updated_by', 'created_at', 'updated_at')
    search_fields = ('name', 'description')
    list_filter = ('category', 'created_at', 'updated_at')

@admin.register(QuestionType)
class QuestionTypesAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'created_by', 'updated_by', 'created_at', 'updated_at')
    search_fields = ('name', 'description')
    list_filter = ('created_at', 'updated_at')

@admin.register(Choice)
class ChoiceAdmin(admin.ModelAdmin):
    list_display = ('text', 'sub_catagory', 'created_by', 'updated_by', 'created_at', 'updated_at')
    search_fields = ('text',)
    list_filter = ('sub_catagory', 'created_at', 'updated_at')

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('text', 'role', 'sub_catagory', 'question_type', 'created_by', 'updated_by', 'created_at', 'updated_at')
    search_fields = ('text',)
    list_filter = ('role', 'sub_catagory', 'question_type', 'created_at', 'updated_at')

@admin.register(UserAnswer)
class UserAnswerAdmin(admin.ModelAdmin):
    list_display = ('user', 'question', 'selected_option', 'custom_answer', 'created_by', 'updated_by', 'submitted_at', 'created_at', 'updated_at')
    search_fields = ('user__username', 'question__text', 'custom_answer')
    list_filter = ('question', 'submitted_at', 'created_at', 'updated_at')
