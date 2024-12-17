import React from 'react';
import { useContext, useEffect } from "react";
import { ChatContext } from "../context/ChatContext";
import { useUser } from "../context/UserContext";
import UserChat from "../components/ChatComponents/UserChat";
import { useNavigate } from 'react-router-dom';

const MessagesPage = () => {
    const { user } = useUser();
    const { userChats, isUserChatsLoading, updateCurrentChat, setUserChats, notifications, newMessage } = useContext(ChatContext);
    const navigate = useNavigate();
    const handleChatClick = (chat) => {
        updateCurrentChat(chat);
        navigate(`/chat/${chat._id}`);
    };

    useEffect(() => {
        // This useEffect will run whenever `notifications` changes
        console.log("Notifications updated:", notifications);
        // Optionally, you can trigger specific logic here
    }, [notifications, newMessage]);

    return (
        <section className="flex flex-col h-screen">
            <div className="w-full overflow-y-auto">
                <h2 className="text-white text-xl font-semibold mb-4 text-center pt-4">Messages</h2>
                {isUserChatsLoading ? (
                    <p className="text-white">Loading chats...</p>
                ) : userChats?.length > 0 ? (
                        userChats.map((chat, index) => (
                            <div key={index} onClick={() => handleChatClick(chat)} className="border-b border-gray-700">
                                <UserChat chat={chat} user={user} />
                            </div>
                        ))
                    ) : (
                        <div className='flex flex-col justify-center items-center space-y-3 pt-5'>
                            <p className="text-xl text-center font-bold text-darkgray mt-4">No messages found.</p>
                        </div>
                    )
                }
            </div>
        </section>
    );
};

export default MessagesPage;