# assessments/urls.py
from django.urls import path
from .views import PersonalizedQuestionsView, UserAnswerAPIView

urlpatterns = [
    path('questions/<str:role_name>/', PersonalizedQuestionsView.as_view(), name='personalized_questions'),
    path('answers/', UserAnswerAPIView.as_view(), name='user_answers'),
]
