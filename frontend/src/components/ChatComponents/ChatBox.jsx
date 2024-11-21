import { useContext, useState, useRef, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import moment from "moment";
import { FaArrowUp } from "react-icons/fa6";
import { close } from "../../assets";


const ChatBox = () => {
    const { user } = useUser();
    const { currentChat, isMessagesLoading, messages, sendTextMessage } = useContext(ChatContext);
    const { recipientUser, currentProduct } = useFetchRecipientUser( currentChat, user, );
    const [textMessage, setTextMessage] = useState("");
    const messagesEndRef = useRef(null);

    // if (!recipientUser) return (
    //     <p className="text-center text-white">
    //         No conversation selected yet.
    //     </p>
    // );

    // if (isMessagesLoading) return (
    //     <p className="flex text-center text-white">
    //         Loading conversation...
    //     </p>
    // );

    useEffect(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, [messages]);

    return (
        <section className="flex flex-col h-screen pb-10">
            <div className='mb-4 flex items-center justify-center p-4 border-b border-gray-700'>
                <div className="flex items-center space-x-3">
                <img crossOrigin="anonymous" src={recipientUser?.profilePicture} alt="recipientUser" className='rounded-full w-[40px] h-[40px] object-cover object-center' />
                <h2 className='text-white font-semibold text-lg'>{recipientUser?.firstName} {recipientUser?.lastName}</h2>
                </div>
            </div>
            <div className='pt-2 p-4 flex space-x-4 items-center border-b border-gray-700'>
            <img crossOrigin="anonymous" src={currentProduct?.image} alt={currentProduct?.name} className="w-16 h-16 mb-2 object-cover object-center" />
            <div className='truncate'>
                <p className='font-bold truncate'>{currentProduct?.name}</p>
                <p className='font-normal truncate'>{currentProduct?.description}</p>
                ${currentProduct?.price}
            </div>
            </div>
            <section className="flex-1 p-4 overflow-y-auto">
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
}

export default ChatBox;