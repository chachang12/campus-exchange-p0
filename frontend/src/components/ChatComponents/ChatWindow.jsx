import { useContext, useState, useEffect, useRef, useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import moment from "moment";
import { FaArrowUp } from "react-icons/fa6";
import { SlArrowLeft } from 'react-icons/sl';

const ChatWindow = () => {
  const { user } = useUser();
  const { userChats, currentChat, isMessagesLoading, messages, sendTextMessage, updateCurrentChat, product, isProductLoading } = useContext(ChatContext);
  const [page, setPage] = useState(1)
  const [visibleMessages, setVisibleMessages] = useState([])
  const scrollRef = useRef(null)
  const { recipientUser, isRecipientUserLoading } = useFetchRecipientUser(currentChat, user);
  const [textMessage, setTextMessage] = useState("");
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  let productData;
  try {
    productData = product ? product.data : null;
  } catch (error) {
    console.error('Error fetching product:', error);
  }

  useEffect(() => {
    loadMoreMessages();
  
  }, [messages, currentChat, userChats]);

  const loadMoreMessages = () => {
    if (messages) {
      const itemsPerPage = 20;
      const newMessages = messages.slice(
        Math.max(0, messages.length - page * itemsPerPage),
        messages.length - (page - 1) * itemsPerPage
      );
      setVisibleMessages(prev => [...newMessages, ...prev]);
    }
  };

  useEffect(() => {  
    // Only attempt scroll if messages are loaded, defined, and refs are attached
    if (
      messages && // Ensure messages is not undefined
      messages.length > 0
    ) {
      let attempts = 0;
      const maxAttempts = 5;
      const delay = 100;
  
      const scrollToBottom = () => {
        attempts++;
  
        const scrollHeight = scrollRef.current.scrollHeight;
        const clientHeight = scrollRef.current.clientHeight;
  
        if (scrollHeight > clientHeight && messagesEndRef.current) {
          requestAnimationFrame(() => {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
            scrollRef.current.scrollTop = scrollHeight; // Fallback
          });
        } else {
          setTimeout(scrollToBottom, delay);
        }
      };
  
      // Debounce to handle rapid updates
      const debounceId = setTimeout(scrollToBottom, 100);
  
      return () => clearTimeout(debounceId);
    } else {
      console.log('Scroll skipped due to:', {
        hasMessages: !!messages,
        messagesLength: messages?.length,
        hasMessagesEndRef: !!messagesEndRef.current,
        hasScrollRef: !!scrollRef.current,
      });
    }
  }, [messages]);

  const handleScroll = () => {
    if (scrollRef.current.scrollTop === 0) {
      setPage(prev => prev + 1);
    }
  };

  if (!currentChat) {
    return (
      <p className="text-2xl items-center justify-center text-center font-bold text-darkgray mt-4 h-3/4 hidden sm:flex">
        No chat selected.
      </p>
    )
  }
  else if (isMessagesLoading || isProductLoading || isRecipientUserLoading) {
    return (
      <p className="text-2xl sm:flex items-center justify-center text-center font-bold hidden text-darkgray mt-4 h-3/4">
        Loading messages...
      </p>
    )
  }
  else {
    return (
      <section className="flex flex-col w-full h-[calc(100dvh-4rem)] items-center p-4">
        <section className="top-0 w-full">
          <div className="flex items-center p-4 w-full backdrop-blur bg-opacity-30" >
            <div onClick={() => updateCurrentChat(null)} className='mr-4 w-10 h-10 bg-[#1F1F1F] rounded-full flex items-center justify-center outline outline-1 outline-gray-500 sm:hidden'>
              <SlArrowLeft size={20} color={'white'}/>
            </div>
              <div className='flex' onClick={() => navigate(`/chat/${currentChat?._id}/actions`)}>
                <img src={recipientUser?.profilePicture} className="w-[50px] h-[50px] rounded-full mr-4 object-cover object-center cursor-pointer" />
                  <div>
                    <strong className="text-white text-lg">{recipientUser?.firstName}</strong>
                    {productData && <p className="text-gray-400 text-sm">{productData.name}</p>}
                  </div>
              </div>
          </div>
        </section>
        <section id="chat-box" ref={scrollRef} onScroll={handleScroll} className="flex-1 overflow-y-auto w-full pt-8">
          {messages && messages.map((message, index) => (
            <div key={index} className={`mb-4 ${message?.senderId === user?._id ? "flex justify-end" : "flex justify-start"}`}>
              <div className={`flex flex-col w-9/12 ${message?.senderId === user?._id ? "items-end" : "items-start"}`}>
                <div className={`inline-block s:max-w-md px-4 py-2 rounded-2xl ${message?.senderId === user?._id ? "bg-blue-500 text-white" : "bg-gray-700 text-white"}`}>
                  {message.text}
                </div>
                <div className="text-gray-400 text-xs mt-1">
                  {moment(message.createdAt).calendar({ sameDay: 'h:mm A', lastDay: '[Yesterday]', lastWeek: 'MMM D', sameElse: 'MMM D, YYYY' })}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </section>
        <section className="chat-input p-2 flex items-center bottom w-[95%] mb-2 border border-white border-opacity-20 rounded-full bg-[#1A1E26] backdrop-blur-md bg-opacity-30">
          <input className="flex-1 px-2 py-2 rounded-full bg-inherit text-white outline-none" placeholder="Message" type="text" value={textMessage} onChange={(e) => setTextMessage(e.target.value)} />
          <button className="ml-4 p-2 bg-blue-500 text-white rounded-full" onClick={() => sendTextMessage(textMessage, user, currentChat._id, setTextMessage)}>
            <FaArrowUp />
          </button>
        </section>
      </section>
    )
  }
}

export default ChatWindow;