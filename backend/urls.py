from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('account_users/', include('account_users.urls')),
    # Add other includes here
]