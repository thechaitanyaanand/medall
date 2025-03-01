import axios from 'axios';

const token = localStorage.getItem('access_token');
const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
});

export default apiClient;
