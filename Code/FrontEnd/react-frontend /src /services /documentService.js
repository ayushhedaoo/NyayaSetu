import apiClient from './apiClient';

export const getDocuments = async () => {
  try {
    const response = await apiClient.get('/documents');
    return response.data; // Expected array of documents
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Failed to fetch documents');
    }
    throw new Error('An error occurred while fetching documents');
  }
};

export const getDocumentById = async (id) => {
  try {
    const response = await apiClient.get(`/documents/${id}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Failed to fetch document');
    }
    throw new Error('An error occurred while fetching document');
  }
};

export const uploadDocument = async (formData) => {
  try {
    const response = await apiClient.post('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Failed to upload document');
    }
    throw new Error('An error occurred while uploading the document');
  }
};

export const generateSummary = async (id) => {
  try {
    const response = await apiClient.post(`/documents/${id}/summarize`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Failed to generate summary');
    }
    throw new Error('An error occurred while generating the summary');
  }
};
