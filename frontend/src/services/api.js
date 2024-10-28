import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:8080", // Ensure this matches your backend URL
    withCredentials: true,
});

export const googleAuth = (code) => api.get(`/auth/google/callback?code=${code}`);
export const fetchUserData = () => api.get('/auth/login/success', { withCredentials: true });