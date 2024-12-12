from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import OnboardingDashboardView, RegisterView, LoginView, HelloWorldView

urlpatterns = [
    # Token-related views for JWT authentication
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # User-related views
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),

    # A simple view to return a greeting message (authenticated users only)
    path('api/hello/', HelloWorldView.as_view(), name='hello_world'),
    path('onboarding-dashboard/', OnboardingDashboardView.as_view(), name='onboarding_dashboard'),
]
