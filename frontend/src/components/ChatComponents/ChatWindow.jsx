import { useContext, useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import moment from "moment";
import { FaArrowUp } from "react-icons/fa6";
import ChatHeader from "./ChatHeader";

const ChatWindow = () => {
  const { user } = useUser();
  const { userChats, currentChat, isMessagesLoading, messages, sendTextMessage, updateCurrentChat, product, isUserChatsLoading } = useContext(ChatContext);
  const { chatId } = useParams();
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const [textMessage, setTextMessage] = useState("");
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  let productData;
  try {
    productData = product ? product.data : null;
  } catch (error) {
    console.error('Error fetching product:', error);
  }

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return isMessagesLoading? (
    <div className="text-center text-white">
        Loading messages...
    </div>
    ) : (
    <section className="flex flex-col h-screen items-center">
      <section className="fixed w-full">
        <ChatHeader />
      </section>
        <section id="chat-box" className="overscroll-y-auto flex-1 pb-14 flex-col p-4 items-start w-full pt-[90px]">
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
      <section className="p-2 flex items-center fixed bottom-0 h=[5%] w-[95%] mb-2 border border-white border-opacity-20 rounded-full bg-[#1A1E26] backdrop-blur-md bg-opacity-30">
        <input className="flex-1 px-2 py-2 rounded-full bg-inherit text-white outline-none" placeholder="Message" type="text" value={textMessage} onChange={(e) => setTextMessage(e.target.value)} />
        <button className="ml-4 p-2 bg-blue-500 text-white rounded-full" onClick={() => sendTextMessage(textMessage, user, currentChat._id, setTextMessage)}>
          <FaArrowUp />
        </button>
      </section>
    </section>
  );
};

export default ChatWindow;