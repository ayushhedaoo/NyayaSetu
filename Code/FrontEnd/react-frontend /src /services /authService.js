import apiClient from './apiClient';

export const loginUser = async (email, password) => {
  try {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data; // Should return { user, token } based on Milestone 1
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Login failed');
    }
    throw new Error('An error occurred during login');
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Registration failed');
    }
    throw new Error('An error occurred during registration');
  }
};
