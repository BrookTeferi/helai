import re
from django.contrib.auth import get_user_model, authenticate
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from account_users.models import User

# UserSerializer
class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for returning user details.
    """
    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'first_name', 'last_name', 'username', 'role','onboarding_status')
        read_only_fields = ('id', 'email', 'username', 'role')


# RegisterSerializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'first_name']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email'],
            first_name=validated_data['first_name']
        )
        return user

    def validate_email(self, value):
        """
        Check if the email is unique in the system.
        """
        if get_user_model().objects.filter(email=value).exists():
            raise ValidationError("This email address is already in use.")
        return value

    def validate_username(self, value):
        """
        Check if the username is valid and unique.
        """
        username_pattern = r'^[a-zA-Z0-9@._+\-/_]+$'
        if not re.match(username_pattern, value):
            raise ValidationError("Username can only contain letters, numbers, and @/./+/-/_ characters.")
        if get_user_model().objects.filter(username=value).exists():
            raise ValidationError("This username is already taken.")
        return value
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):  # Use 'attrs' instead of 'data'
        username = attrs.get('username')
        password = attrs.get('password')

        if not username or not password:
            raise ValidationError({"detail": "Both username and password are required."})

        user = authenticate(username=username, password=password)

        if not user:
            raise ValidationError({"detail": "Invalid username or password."})
        elif not user.is_active:
            raise ValidationError({"detail": "This account is inactive."})

        return user  # Return the user object