# assessments/serializers.py
from rest_framework import serializers
from .models import Category, Question

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class QuestionSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Question
        fields = ['id', 'role', 'category', 'text', 'options']
