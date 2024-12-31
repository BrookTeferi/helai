# assessments/urls.py
from django.urls import path
from .views import PersonalizedQuestionsView

urlpatterns = [
    path('questions/<str:role_name>/', PersonalizedQuestionsView.as_view(), name='personalized_questions'),
]
