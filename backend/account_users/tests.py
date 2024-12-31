from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from account_users.models import User

class RegisterViewTestCase(APITestCase):
    def test_register_success(self):
        # Arrange
        url = reverse('account_users:register')
        data = {
            "username": "testuser",
            "password": "testpassword123",
            "email": "testuser@example.com",
            "first_name": "Test"
        }
        
        # Act
        response = self.client.post(url, data, format='json')
        
        # Assert
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue('user' in response.data)
        self.assertTrue('is_registering' in response.data)
        self.assertEqual(response.data['is_registering'], True)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().username, 'testuser')

    def test_register_invalid_data(self):
        # Arrange
        url = reverse('account_users:register')
        data = {
            "username": "",
            "password": "testpassword123",
            "email": "invalid-email"
        }
        
        # Act
        response = self.client.post(url, data, format='json')
        
        # Assert
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertTrue('username' in response.data)
        self.assertTrue('email' in response.data)
        self.assertEqual(User.objects.count(), 0)