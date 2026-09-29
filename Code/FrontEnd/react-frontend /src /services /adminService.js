import apiClient from './apiClient';

export const getDashboardStats = async () => {
  const response = await apiClient.get('/admin/stats');
  return response.data;
};

export const getAllUsers = async () => {
  const response = await apiClient.get('/admin/users');
  return response.data;
};

export const getAllDocuments = async () => {
  const response = await apiClient.get('/admin/documents');
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await apiClient.delete(`/admin/users/${id}`);
  return response.data;
};

export const getFreeTrials = async () => {
  const response = await apiClient.get('/admin/free-trials');
  return response.data;
};

// TODO: Replace these mock functions with real API calls once backend endpoints are available
export const getSystemHealth = async () => {
  return {
    data: {
      uptime: 36000,
      cpuUsage: 45,
      memoryUsage: 60,
      status: 'healthy'
    }
  };
};

export const getQueueStatus = async () => {
  return {
    data: {
      pendingJobs: 12,
      activeJobs: 3,
      completedJobs: 1240,
      failedJobs: 5
    }
  };
};
