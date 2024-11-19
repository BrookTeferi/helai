from django.contrib.auth import authenticate  # Add this import
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError

# Assuming you have a custom user model with 'role' as a choice field
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    role = serializers.ChoiceField(choices=['STUDENT', 'INSTRUCTOR'], required=False, default='STUDENT')  # Default role set to 'STUDENT'

    class Meta:
        model = get_user_model()
        fields = ('email', 'first_name', 'last_name', 'username', 'password', 'role')

    def create(self, validated_data):
        """
        Create a new user with a default role if not provided.
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


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for user data (for when we need to return user data).
    """
    class Meta:
        model = get_user_model()
        fields = ('id', 'email', 'first_name', 'last_name', 'role')


class LoginSerializer(serializers.Serializer):
    """
    Serializer for login, expecting email and password.
    """
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        """
        Authenticate the user.
        """
        email = attrs.get('email')
        password = attrs.get('password')

        # Check if the user exists and authenticate using email instead of username
        user_model = get_user_model()
        user = user_model.objects.filter(email=email).first()

        if user is None or not user.check_password(password):
            raise ValidationError("Invalid email or password.")
        
        attrs['user'] = user
        return attrs