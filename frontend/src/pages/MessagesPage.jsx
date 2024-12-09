import React from 'react';
import { useContext, useEffect } from "react";
import { ChatContext } from "../context/ChatContext";
import { useUser } from "../context/UserContext";
import UserChat from "../components/ChatComponents/UserChat";
import { useNavigate } from 'react-router-dom';
import { useFetchLatestMessage } from '../hooks/useFetchLatestMessage';

const MessagesPage = () => {
    const { user } = useUser();
    const { userChats, isUserChatsLoading, updateCurrentChat, setUserChats } = useContext(ChatContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMessagesForChats = async () => {
          const chatsWithLatestMessages = await Promise.all(
            userChats.map(async (chat) => {
              // Fetch the latest message for each chat using the custom hook
              const { latestMessage } = useFetchLatestMessage(chat);
    
              return { ...chat, latestMessage }; // Merge the latestMessage with the chat data
            })
          );
    
          // Set the state with chats and their latest messages
          setChatsWithMessages(chatsWithLatestMessages);
        };
    
        if (userChats?.length) {
          fetchMessagesForChats();
        }
      }, [userChats]);

    const handleChatClick = (chat) => {
        updateCurrentChat(chat);
        navigate(`/chat/${chat._id}`);
    };

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
                            <p className="text-white">No conversations found.</p>
                        </div>
                    )
                }
            </div>
        </section>
    );
};

export default MessagesPage;