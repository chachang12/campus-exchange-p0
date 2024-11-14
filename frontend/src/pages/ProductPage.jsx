import {React, useContext, useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { messageIcon, close, share, star } from '../assets';
import { useUser } from "../context/UserContext";
import { ChatContext } from '../context/ChatContext';
import { getUserById } from '../utils/fetchUtils';
import { fetchChat } from '../utils/fetchChat';
import ChatBox from '../components/ChatComponents/ChatBox';
import { FaArrowUp } from "react-icons/fa6";

const ProductPage = () => {
  const location = useLocation();
  const { product } = location.state;
  const navigate = useNavigate();
  const { createChat } = useContext(ChatContext);
  const [doesChatExist, setDoesChatExist] = useState(false);
  const { user } = useUser();
  const [creator, setCreator] = useState(null);
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const [textMessage, setTextMessage] = useState("");
  const { currentChat, sendTextMessage, updateCurrentChat} = useContext(ChatContext);

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        const response = await getUserById(product.creatorId);
        setCreator(response.data);
      } catch (error) {
        console.error('Error fetching creator:', error);
      }
    };

    fetchCreator();
  }, [product.creatorId]);

  const checkExistingChat = async () => {
    const response = await fetchChat(user._id, product.creatorId, product._id);

    if (response)
    {
      updateCurrentChat(response);
      setDoesChatExist(true);
    }
  }

  // Function to handle back navigation
  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleCreateChat = async (textMessage, user, currentChatId, setTextMessage) => {
    try {
      await createChat(user._id, product.creatorId, product._id);
      await sendTextMessage(textMessage, user, currentChatId, setTextMessage);
      console.log('Chat created successfully');
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

  // const handleSendMessage = async () => {
  //   try {
  //     await 
  //   }
  // }

  return (
    <div className="p-4 text-white">
      <div className='mb-4'>
        <img src={close} alt="Close" className="w-6 h-6 cursor-pointer" onClick={handleBack} />
      </div>
      <div className='flex flex-col'>
        <img crossOrigin="anonymous" src={product.image} alt={product.name} className="w-full h-auto rounded-xl mb-2" />
        <h1 className="text-3xl font-medium">{product.name}</h1>
        <p className="text-lg font-light">${product.price}</p>
        <div className='flex flex-row justify-between mb-2'>
            {product.condition && <p className="text-lg">{product.condition}</p>}
            {product.size && <p className="text-lg">Size: {product.size}</p>}
        </div>      
      </div>
      
      {/* TODO : Implement this button to start a new chat with the seller revolving around the product id.  */}
      <div className='flex flex-row justify-between mb-4'>
        <button onClick={() => {setIsChatExpanded((curr) => !curr); checkExistingChat()}} className=''>
            <img src={messageIcon} alt="Message Seller" className="w-8 h-8" />
        </button>
        <button>
            <img src={share} alt="Share" className="w-8 h-8" />
        </button>
      </div>
      
      <p className='font-light mb-6'>
          {product.description}
      </p>

      <h1 className='font-[600] mb-2'>
        Seller Information
      </h1>
      {creator && (
        <div className='flex flex-row items-center'>
          {creator.profilePicture ? (
            <img crossOrigin="anonymous" src={creator.profilePicture} alt="Creator" className='rounded-full w-[50px]' />
          ) : (
            <IoPersonCircleOutline size={50} />
          )}
          <div className='flex-col ml-4'>
            <h2 className='text-white font-semibold text-lg'>
              {creator.firstName} {creator.lastName && creator.lastName}
            </h2>            <div className='flex flex-row items-center'>
              {Array.from({ length: Math.floor(creator.rating) }).map((_, index) => (
                <img key={index} src={star} alt="star" className='w-4 h-4 mr-1' />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* create a chat */}
      <div className={`fixed pl-4 pr-4 left-0 bottom-0 w-full overflow-hidden transition-all duration-500 origin-bottom bg-[#1A1E26] ${isChatExpanded ? "scale-y-100 h-[100vh]" : "scale-y-0 h-0"}`}>
        <div className='mb-4 flex items-center justify-center p-4 border-b border-gray-700'>
            <img src={close} alt="Close" className="fixed left-4 mr-auto w-6 h-6 cursor-pointer" onClick={() => setIsChatExpanded((curr) => !curr)} />
            <div className="flex items-center space-x-3">
              <img crossOrigin="anonymous" src={creator?.profilePicture} alt="Creator" className='rounded-full w-[40px]' />
              <h2 className='text-white font-semibold text-lg'>{creator?.firstName} {creator?.lastName}</h2>
            </div>
        </div>
        <div className='pt-2 p-4 flex space-x-4 items-center border-b border-gray-700'>
          <img crossOrigin="anonymous" src={product?.image} alt={product?.name} className="w-16 h-16 mb-2" />
          <div className='truncate'>
            <p className='font-bold truncate'>{product?.name}</p>
            <p className='font-normal truncate'>{product?.description}</p>
            ${product?.price}
          </div>
        </div>

        {doesChatExist? (
          <div><ChatBox></ChatBox></div>
        ) : (
          <div>Start the conversation.
          <section className="p-2 flex items-center fixed bottom-0 w-[95%] mb-2 border border-white border-opacity-20 rounded-full bg-[#1A1E26] backdrop-blur-md bg-opacity-30">
            <input className="flex-1 px-2 py-2 rounded-full bg-inherit text-white outline-none" placeholder="Message" type="text" value={textMessage} onChange={(e) => setTextMessage(e.target.value)} />
            <button className="ml-4 p-2 bg-blue-500 text-white rounded-full" onClick={() => handleCreateChat(textMessage, user, currentChat, setTextMessage)}>
                <FaArrowUp />
            </button>
          </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;