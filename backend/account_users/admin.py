from django.contrib import admin
from account_users.models import Role, User

# Register your models here.
@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)

# Register your models here with pagination
@admin.register(User)
class UserAdmin(admin.ModelAdmin):

    list_display = ("username", "role", "email")
    list_per_page = 10
    
    search_fields = ("username", "role", "email")
    list_filter = ("role",)
    fieldsets = (
        (None, {"fields": ("username", "password")}),
        ("Personal Info", {"fields": ("first_name", "last_name", "email", "phone_number", "date_of_birth")}),
        ("Professional Info", {"fields": ("profession", "specialization", "years_of_experiance")}),
        ("Location", {"fields": ("country",)}),
        ("Bio", {"fields": ("bio",)}),
        ("Social Media", {"fields": ("linkedin_profile", "website", "twitter_profile", "facebook_profile", "instagram_profile")}),
        ("Profile Picture", {"fields": ("profile_picture",)}),
        ("Role", {"fields": ("role",)}),
        ("Onboarding Status", {"fields": ("onboarding_status",)}),
    )
    readonly_fields = ("onboarding_status",)