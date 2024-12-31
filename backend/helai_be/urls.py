from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('account_users.urls')),  # Include user-related views from account_users app
    path('api/', include('assessments.urls')),  # Include assessment-related views from assessments app
    
    # JWT Token Obtain and Refresh
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
