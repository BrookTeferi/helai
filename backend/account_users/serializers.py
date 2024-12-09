import re
from django.contrib.auth import get_user_model, authenticate
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

# UserSerializer
class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for returning user details.
    """
    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'first_name', 'last_name', 'username', 'role')
        read_only_fields = ('id', 'email', 'username', 'role')


# RegisterSerializer
class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration.
    """
    password = serializers.CharField(write_only=True)
    role = serializers.ChoiceField(choices=['STUDENT', 'INSTRUCTOR'], required=False, default='STUDENT')

    class Meta:
        model = get_user_model()
        fields = ('email', 'first_name', 'last_name', 'username', 'password', 'role')

    def create(self, validated_data):
        """
        Create a new user with the provided or default role.
        """
        role = validated_data.get('role', 'STUDENT')  # Default to 'STUDENT' if role is not provided
        user = get_user_model().objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            username=validated_data['username'],
            role=role
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