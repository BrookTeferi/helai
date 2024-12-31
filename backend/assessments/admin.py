from django.contrib import admin
from .models import Category, Question

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ("role", "category", "text")
    list_filter = ("role", "category")
    search_fields = ("text",)
