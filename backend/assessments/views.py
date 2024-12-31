# assessments/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Question
from .serializers import QuestionSerializer

class PersonalizedQuestionsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, role_name):
        questions = Question.objects.filter(role__name=role_name)
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)
