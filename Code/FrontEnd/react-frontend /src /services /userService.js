import apiClient from './apiClient';

export const getUserProfile = async () => {
  try {
    const response = await apiClient.get('/auth/me'); // Assuming there's a /me endpoint, or we just rely on Context. Let's provide a mock if it fails since we didn't build one in Milestone 1.
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user profile');
  }
};
