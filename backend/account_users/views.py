from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from .serializers import RegisterSerializer, UserSerializer, LoginSerializer
import logging

logger = logging.getLogger(__name__)

ONBOARDING_NOT_STARTED = 'NOT_STARTED'
ONBOARDING_IN_PROGRESS = 'IN_PROGRESS'
ONBOARDING_COMPLETED = 'COMPLETED'
ROLE_STUDENT = 'STUDENT'

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            response_data = {
                "user": UserSerializer(user).data,
                "is_registering": True
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        logger.debug(f"Request data: {request.data}")
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data  # The user object returned from the serializer
            refresh = RefreshToken.for_user(user)
            return Response({
                'id': user.id,
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                "is_logging_in": True  # Inform the frontend about the login
            }, status=status.HTTP_200_OK)
        logger.error(f"Serializer errors: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserDetailsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        profile_fields = ['first_name', 'last_name', 'email', 'profile_picture', 'bio']
        completed_fields = sum(1 for field in profile_fields if getattr(user, field))
        total_fields = len(profile_fields)
        profile_completion = int((completed_fields / total_fields) * 100)

        data = {
            "userName": user.username,
            "isNewUser": user.onboarding_status != ONBOARDING_COMPLETED,
            "profileCompletion": profile_completion
        }
        return Response(data, status=status.HTTP_200_OK)

class OnboardingDashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.role == ROLE_STUDENT and user.onboarding_status == ONBOARDING_NOT_STARTED:
            return Response({
                "message": f"Welcome to Helai, {user.first_name or user.username}!",
                "next_steps": [
                    "Complete your profile",
                    "Take the knowledge assessment",
                    "Enroll in your first course",
                    "Explore the dashboard",
                    "Start learning"
                ],
                "onboarding_status": user.onboarding_status,
            })
        elif user.onboarding_status == ONBOARDING_IN_PROGRESS:
            return Response({
                "message": "You're making great progress!",
                "onboarding_status": user.onboarding_status,
            })
        else:
            return Response({
                "message": "Welcome back!",
                "onboarding_status": user.onboarding_status,
            })