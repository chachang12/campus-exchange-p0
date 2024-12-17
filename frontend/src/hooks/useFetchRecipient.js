// frontend/src/hooks/useFetchRecipient.js

import { useEffect, useState } from "react";
import axios from 'axios';

// Set the base URL for Axios
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

export const useFetchRecipientUser = (chat, user) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [mostRecentMessage, setMostRecentMessage] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [error, setError] = useState(null);

  const recipientId = chat?.members.find((id) => id !== user?._id);
  const chatId = chat?._id;
  const productId = chat?.productId;

  useEffect(() => {
    const getUser = async () => {
      if (!recipientId) return null;

      try {
        const response = await axiosInstance.get(`/user/find/${recipientId}`);

        if (response.error) {
          return setError(response.error);
        }

        setRecipientUser(response.data);
      } catch (error) {
        console.error('Error fetching recipient user:', error);
        setError(error);
      }
    };

    getUser();
  }, [recipientId]);

  //put this in its own file eventually

  useEffect(() => {
    const getProduct = async () => {
      if (!productId) return null;

      try {
        const response = await axiosInstance.get(`/products/${productId}`); // Removed /api/ since baseURL includes /api/

        if (response.error) {
          return setError(response.error);
        }
        setCurrentProduct(response.data.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError(error);
      }
    };

    getProduct();
  }, [productId]);

  return { recipientUser, mostRecentMessage, currentProduct, error };
};