import { useEffect, useState } from "react";
import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:8080',
    baseURL: 'https://campus-exchange-p0.onrender.com',
    withCredentials: true, // Ensure cookies are sent with requests
  });

export const useFetchLatestMessage = (chat) => {
    const [latestMessage, setLatestMessage] = useState(null)

    const chatId = chat?._id

    useEffect(() => {
        const getMostRecentMessage = async () => {
            try {
                const recentMessageResponse = await axiosInstance.get(`/messages/${chatId}/recent`);
                setLatestMessage(recentMessageResponse.data.data);
            } catch (error) {
                console.error("Error fetching latest message:", error);
            }
        };
        getMostRecentMessage();
    }, [chatId]);

    return { latestMessage };
};