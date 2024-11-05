import { useContext, useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import moment from "moment";
import { SlArrowLeft } from "react-icons/sl";
import { FaArrowUp } from "react-icons/fa6";

const ChatWindow = () => {
    const { user } = useUser();
    const { userChats, currentChat, isMessagesLoading, messages, sendTextMessage, updateCurrentChat, product } = useContext(ChatContext);
    const { chatId } = useParams();
    const { recipientUser } = useFetchRecipientUser(currentChat, user);
    const [textMessage, setTextMessage] = useState("");
    const navigate = useNavigate();
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (chatId) {
            const chat = userChats.find(chat => chat._id === chatId);
            if (chat) {
                updateCurrentChat(chat);
            }
        }
    }, [chatId, userChats, updateCurrentChat]);

    useEffect(() => {
        const handleResize = () => {
            const chatBox = document.getElementById('chat-box');
            if (chatBox) {
                chatBox.scrollTop = chatBox.scrollHeight;
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    if (!recipientUser) return (
        <p className="text-center text-white">
            No conversation selected yet.
        </p>
    );

    if (isMessagesLoading) return (
        <p className="text-center text-white">
            Loading conversation...
        </p>
    );

    return (
        <section className="flex flex-col h-screen items-center">
            <div className="flex items-center p-4 w-full bg-[#1A1E26] backdrop-blur bg-opacity-30">
                <SlArrowLeft className="text-white text-2xl mr-4 cursor-pointer" onClick={() => navigate('/messages')} />
                <img src={recipientUser?.profilePicture} crossOrigin="anonymous" className="w-[50px] h-[50px] rounded-full mr-4" />
                <div>
                    <strong className="text-white text-lg">{recipientUser?.firstName}</strong>
                    {product && <p className="text-gray-400 text-sm">{product.name}</p>}
                </div>
            </div>
            <section id="chat-box" className="flex-1 flex-col-reverse p-4 overflow-y-auto items-start w-full pb-20">
                {messages && messages.map((message, index) => (
                    <div key={index} className={`mb-4 ${message?.senderId === user?._id ? "text-right" : "text-left"}`}>
                        <div className={`inline-block px-4 py-2 rounded-full ${message?.senderId === user?._id ? "bg-blue-500 text-white" : "bg-gray-700 text-white"}`}>
                            {message.text}
                        </div>
                        <div className="text-gray-400 text-xs mt-1">
                            {moment(message.createdAt).calendar({ sameDay: 'h:mm A', lastDay: '[Yesterday]', lastWeek: 'MMM D', sameElse: 'MMM D, YYYY' })}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </section>
            <section className="p-2 flex items-center fixed bottom-0 w-[95%] mb-2 border border-white border-opacity-20 rounded-full bg-[#1A1E26] backdrop-blur-md bg-opacity-30">
                <input className="flex-1 px-2 py-2 rounded-full bg-inherit text-white outline-none" placeholder="Message" type="text" value={textMessage} onChange={(e) => setTextMessage(e.target.value)} />
                <button className="ml-4 p-2 bg-blue-500 text-white rounded-full" onClick={() => sendTextMessage(textMessage, user, currentChat._id, setTextMessage)}>
                    <FaArrowUp />
                </button>
            </section>
        </section>
    );
};

export default ChatWindow;