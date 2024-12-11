import axios from 'axios';

// Set the base URL for Axios
const axiosInstance = axios.create({
  // baseURL: 'http://localhost:8080',
  // baseURL: 'https://campus-exchange-p0.onrender.com',
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // Ensure cookies are sent with requests
});

export const fetchChat = async (firstId, secondId, productId) => {
    try {
      const res = await axiosInstance.get(`/chats/find/${firstId}/${secondId}/${productId}`);
      return res.data;
    } catch (error) {
      console.error('Error fetching chat:', error);
      throw error;
    }
  };