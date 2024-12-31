# assessments/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Question
from .serializers import QuestionSerializer, UserAnswerSerializer

class PersonalizedQuestionsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, role_name):
        questions = Question.objects.filter(role__name=role_name)
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)
class UserAnswerAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = UserAnswerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response({"message": "Answer submitted successfully!"}, status=201)
        return Response(serializer.errors, status=400)