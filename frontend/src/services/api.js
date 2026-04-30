import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const collegeService = {
  getColleges: (params) => api.get('/colleges', { params }),
  getCollegeById: (id) => api.get(`/colleges/${id}`),
  compareColleges: (ids) => api.post('/colleges/compare', { ids }),
  getLocations: () => api.get('/colleges/locations'),
};

export default api;
