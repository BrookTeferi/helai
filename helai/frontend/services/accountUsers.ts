import { apiRequest } from '../utils/api';

export const registerUser = (formData: Record<string, any>) =>
  apiRequest('account_users/register/', 'POST', formData);

export const loginUser = (formData: Record<string, any>) =>
  apiRequest('account_users/login/', 'POST', formData);
