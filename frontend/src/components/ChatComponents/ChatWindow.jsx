import { useContext, useState, useEffect, useRef } from "react";
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
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const [textMessage, setTextMessage] = useState("");
  const messagesEndRef = useRef(null);

  let productData;
  try {
    productData = product ? product.data : null;
  } catch (error) {
    console.error('Error fetching product:', error);
  }

  useEffect(() => {
    if (userChats && window.innerWidth > 640 && !currentChat) {
      updateCurrentChat(userChats[0])
    }
  })

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);


  if (!currentChat) {
    return (
      <p className="text-2xl flex items-center justify-center text-center font-bold text-darkgray mt-4 h-3/4 hidden md:flex">
        No chat selected.
      </p>
    )
  }
  else if (isMessagesLoading || isProductLoading) {
    return (
      <p className="text-2xl flex items-center justify-center text-center font-bold text-darkgray mt-4 h-3/4 m:hidden">
        Loading messages...
      </p>
    )
  }
  else {
    return (
      <section className="flex flex-col w-full h-screen min-h-[700px] items-center p-4">
        <section className="top-0 w-full z-10">
          <div className="flex items-center p-4 w-full backdrop-blur bg-opacity-30" >
            <div onClick={() => updateCurrentChat(null)} className='mr-4 w-10 h-10 bg-[#1F1F1F] rounded-full flex items-center justify-center outline outline-1 outline-gray-500 sm:hidden'>
              <SlArrowLeft size={20} color={'white'}/>
            </div>
            
              <div className='flex' onClick={() => navigate(`/chat/${currentChat?._id}/actions`)}>
                <img src={recipientUser?.profilePicture} crossOrigin="anonymous" className="w-[50px] h-[50px] rounded-full mr-4 object-cover object-center" />
                  <div>
                    <strong className="text-white text-lg">{recipientUser?.firstName}</strong>
                    {productData && <p className="text-gray-400 text-sm">{productData.name}</p>}
                  </div>
              </div>
          </div>
        </section>
        <section id="chat-box" className="flex-1 overflow-y-auto w-full pt-8 pb-20">
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