import { useContext, useState } from "react";
import { useUser } from "../../context/UserContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import moment from "moment";

const ChatBox = () => {
    const { user } = useUser();
    const { currentChat, isMessagesLoading, messages, sendTextMessage } = useContext(ChatContext);
    const { recipientUser } = useFetchRecipientUser(currentChat, user);
    const [textMessage, setTextMessage] = useState("");

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
        <section className="flex flex-col h-full">
            <div className="flex items-center p-4 bg-gray-800">
                <img src={recipientUser?.profilePicture} crossOrigin="anonymous" className="w-[50px] h-[50px] rounded-full mr-4" />
                <strong className="text-white text-lg">{recipientUser?.name}</strong>
            </div>
            <section className="flex-1 p-4 overflow-y-auto">
                {messages && messages.map((message, index) => (
                    <div key={index} className={`mb-4 ${message?.senderId === user?._id ? "text-right" : "text-left"}`}>
                        <div className={`inline-block p-2 rounded-lg ${message?.senderId === user?._id ? "bg-blue-500 text-white" : "bg-gray-700 text-white"}`}>
                            {message.text}
                        </div>
                        <div className="text-gray-400 text-xs mt-1">
                            {moment(message.createdAt).calendar({ sameDay: 'h:mm A', lastDay: '[Yesterday]', lastWeek: 'MMM D', sameElse: 'MMM D, YYYY' })}
                        </div>
                    </div>
                ))}
            </section>
            <section className="p-4 bg-gray-800 flex items-center">
                <input className="flex-1 p-2 rounded bg-gray-700 text-white outline-none" placeholder="Message" type="text" value={textMessage} onChange={(e) => setTextMessage(e.target.value)} />
                <button className="ml-4 p-2 bg-blue-500 text-white rounded" onClick={() => sendTextMessage(textMessage, user, currentChat._id, setTextMessage)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                </button>
            </section>
        </section>
    );
}

export default ChatBox;