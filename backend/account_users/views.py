from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from .serializers import RegisterSerializer, UserSerializer, LoginSerializer
import logging
logger = logging.getLogger(__name__)
class RegisterView(APIView):
    def post(self, request):
        
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"user": UserSerializer(user).data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        logger.debug(f"Request data: {request.data}")  # Log the incoming data
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data  # The user object returned from the serializer
            refresh = RefreshToken.for_user(user)  # Generate tokens for the user
            return Response({
                'id': user.id,  # Include the user ID in the response
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_200_OK)
        logger.error(f"Serializer errors: {serializer.errors}")  # Log the errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class HelloWorldView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "Hello, World!"})
    
class OnboardingDashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.role == 'STUDENT' and user.onboarding_status == 'NOT_STARTED':
            return Response({
                "welcome_message": f"Welcome to Helai, {user.first_name or user.username}!",
                "next_steps": [
                    "Complete your profile",
                    "Take the knowledge assessment",
                    "Enroll in your first course",
                    "Explore the dashboard",
                    "Start learning"
                ],
                "onboarding_status": user.onboarding_status,
            })
        elif user.onboarding_status == 'IN_PROGRESS':
            return Response({
                "message": "You're making great progress!",
                "onboarding_status": user.onboarding_status,
            })
        else:
            return Response({
                "message": "Welcome back!",
                "onboarding_status": user.onboarding_status,
            })