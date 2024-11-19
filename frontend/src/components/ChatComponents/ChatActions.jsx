import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChatContext } from '../../context/ChatContext';
import { useUser } from '../../context/UserContext';
import { useFetchRecipientUser } from '../../hooks/useFetchRecipient';
import { getProductById } from '../../utils/fetchUtils';
import BackButton from '../Buttons/BackButton';
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const ChatActions = () => {
  const { chatId } = useParams();
  const { user } = useUser();
  const { currentChat, deleteChat } = useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      if (currentChat?.productId) {
        try {
          const productData = await getProductById(currentChat.productId);
          setProduct(productData.data); // Ensure you set the correct data
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      }
    };

    fetchProduct();
  }, [currentChat]);

  const handleDeleteChat = async () => {
    try {
      await deleteChat(chatId);
      navigate('/messages');
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };

  const handleWriteReview = () => {
    if (product && recipientUser) {
      navigate('/write-review', { state: { product, reviewee: recipientUser } });
    } else {
      alert('Product or recipient user information is missing.');
    }
  };

  const buttonStyle = 'flex justify-between w-full py-2  text-white text-left';

  return (
    <div className="flex flex-col items-start p-4 text-white">
      <div className='flex justify-between w-full mb-4 items-center'>
        <BackButton />
        <h1 className="text-xl font-semibold">Chat Actions</h1>
        <div className='w-10 h-10'></div>
      </div>
      
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Chat Members</h2>
        <div className="flex items-center">
          <img src={user?.profilePicture} alt={user?.firstName} crossOrigin='anonymous' className="w-10 h-10 rounded-full mr-2 object-cover" />
          <span>{user?.firstName}</span>
        </div>
        {recipientUser && (
          <div className="flex items-center mt-2">
            <img src={recipientUser?.profilePicture} alt={recipientUser?.firstName} crossOrigin='anonymous' className="w-10 h-10 rounded-full mr-2 object-cover" />
            <span>{recipientUser?.firstName}</span>
          </div>
        )}
      </div>

      <button className={buttonStyle} onClick={() => navigate(`/product/${product._id}`, { state: { product } })}>
        View Product
        <SlArrowRight size={20} />
      </button>
      <button className={buttonStyle} onClick={handleWriteReview}>
        Write a Review
        <SlArrowRight size={20} />
      </button>
      <button className={buttonStyle} onClick={handleDeleteChat}>
        Delete Chat
        <SlArrowRight size={20} />
      </button>
    </div>
  );
};

export default ChatActions;