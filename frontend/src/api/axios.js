import axios from 'axios';
const api = axios.create({
  baseURL: "https://team-project-management-nzl1.onrender.com/api"
});
api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem('token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});
export default api;
