import { config } from '@/utils/config';
import { categories, entries } from '@/utils/endpoints';
import axios from 'axios';

const api = axios.create({
  baseURL: config.baseURLForAuth,
});

export const loginApi = async (email, password) => {
  try {
    const response = await api.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error in loginApi:', error);
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${config.baseUrl}${categories}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchEntries = async (params) => {
  try {
    let queryString = '?';
    let category = params?.category;
    let cors = params?.cors;
    
    if (category) {
      queryString = queryString + `category=${category}&`;
    }

    if (cors && cors != 'all') {
      queryString = queryString + `cors=${cors}&`;
    }
  
    const response = await axios.get(`${config.baseUrl}${entries}${queryString}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// const apiService = {
  
//   getCategories: async () => {
//     const response = await fetch(`${API_BASE_URL}/categories`);
//     if (!response.ok) {
//       throw new Error('Failed to fetch categories');
//     }
//     return response.json();
//   },

//   getEntries: async () => {
//     const response = await fetch(`${API_BASE_URL}/entries`);
//     if (!response.ok) {
//       throw new Error('Failed to fetch entries');
//     }
//     return response.json();
//   },

//   // Add more functions for other API requests
// };

// export default apiService;