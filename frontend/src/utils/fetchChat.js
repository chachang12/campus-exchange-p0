import axios from 'axios';

// Set the base URL for Axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
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