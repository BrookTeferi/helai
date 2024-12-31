# assessments/serializers.py
from rest_framework import serializers
from .models import Category, Question, UserAnswer

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class QuestionSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Question
        fields = ['id', 'role', 'category', 'text', 'options']
class UserAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAnswer
        fields = ['id', 'user', 'question', 'selected_option', 'custom_answer', 'submitted_at']