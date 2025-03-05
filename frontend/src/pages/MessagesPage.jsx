import React from 'react';
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { useUser } from "../context/UserContext";
import UserChat from "../components/ChatComponents/UserChat";
import ChatWindow from '../components/ChatComponents/ChatWindow';
import { useNavigate } from 'react-router-dom';

const MessagesPage = () => {
    const { user } = useUser();
    const { userChats, isUserChatsLoading, updateCurrentChat, currentChat, notifications, newMessage } = useContext(ChatContext);
    const navigate = useNavigate();
    const [isChatExpanded, setIsChatExpanded] = useState(false);
    const handleChatClick = (chat) => {
        updateCurrentChat(chat);
    };

    useEffect(() => {
        if (currentChat) {
            setIsChatExpanded(true)
        }
        else {
            setIsChatExpanded(false)
        }
    }, [currentChat])

    return (
        <section className="grid h-[calc(100dvh-4rem)] grid-cols-1 sm:grid-cols-[30%_70%] z-10">
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
            <div className={`w-full text-white m:${isChatExpanded ? "" : "hidden"}`}>
                <ChatWindow />
            </div>
        </section>
    );
};

export default MessagesPage;