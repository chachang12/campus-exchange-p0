import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://localhost:8080',
    baseURL: 'https://campus-exchange-p0.onrender.com',
    withCredentials: true,
});

export const googleAuth = (code) => api.get(`/auth/google/callback?code=${code}`);
export const fetchUserData = () => api.get('/auth/login/success', { withCredentials: true });