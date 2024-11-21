import { useEffect, useState } from "react";
import axios from 'axios';

// Set the base URL for Axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true, // Ensure cookies are sent with requests
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

            const response = await axiosInstance.get(`/user/find/${recipientId}`);

            if (response.error) {
                return setError(response.error);
            }

            setRecipientUser(response.data);
        };

        getUser();
    }, [recipientId]);

    useEffect(() => {
        const getProduct = async () => {
            if (!productId) return null;

            const response = await axiosInstance.get(`/api/products/${productId}`);

            if (response.error) {
                return setError(response.error);
            }
            setCurrentProduct(response.data.data);
        };

        getProduct();
    }, [productId]);

    return { recipientUser, mostRecentMessage, currentProduct, error };
};