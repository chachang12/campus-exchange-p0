import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:8080',
    baseURL: 'https://campus-exchange-p0.onrender.com',
    withCredentials: true, // Ensure cookies are sent with requests
  });

export const useFetchLatestMessage = (chat) => {
    const {newMessage, notifications} = useContext(ChatContext);
    const [latestMessage, setLatestMessage] = useState(null);

    useEffect(() => {
        const getMostRecentMessage = async () => {
            const response = await axiosInstance.get(`/messages/${chat?._id}/recent`);
    
            if (response.error) {
                return setError(response.error);
            }
            const lastMessage = response.data.data;
            setLatestMessage(lastMessage)
        }
        getMostRecentMessage();
    }, [newMessage, notifications]);

    return { latestMessage };
};