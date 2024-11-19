import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChatContext } from '../../context/ChatContext';
import { useUser } from '../../context/UserContext';
import { useFetchRecipientUser } from '../../hooks/useFetchRecipient';
import { getProductById } from '../../utils/fetchUtils';
import BackButton from '../Buttons/BackButton';

const ChatActions = () => {
  const { chatId } = useParams();
  const { user } = useUser();
  const { currentChat, deleteChat } = useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const [product, setProduct] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchProduct = async () => {
      if (currentChat?.productId) {
        try {
          const productData = await getProductById(currentChat.productId);
          setProduct(productData);
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
    // Implement the logic to write a review
  };

  let productData;
  try {
    productData = product ? product.data : null;
  } catch (error) {
    console.error('Error fetching product:', error);
  }

  return (
    <div className="flex flex-col p-4 text-white">
      <div className='flex justify-between w-full mb-4 items-center'>
        <BackButton />
        <h1 className="text-xl font-semibold">Chat Actions</h1>
        <div className='w-10 h-10'></div>
      </div>
      
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Users</h2>
        <div className="flex items-center">
          <img src={user.profilePicture} alt={user.firstName} crossOrigin='anonymous' className="w-10 h-10 rounded-full mr-2 object-cover" />
          <span>{user.firstName}</span>
        </div>
        <div className="flex items-center mt-2">
          <img src={recipientUser?.profilePicture} alt={recipientUser?.firstName} crossOrigin='anonymous' className="w-10 h-10 rounded-full mr-2 object-cover" />
          <span>{recipientUser?.firstName}</span>
        </div>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Product</h2>
        {product && (
          <div className="flex items-center">
            <img src={productData.image} crossOrigin='anonymous' alt={product.name} className="w-10 h-10 rounded-full mr-2" />
            <span>{productData.name}</span>
          </div>
        )}
        <button className="mt-2 p-2 bg-blue-500 text-white rounded" onClick={() => navigate(`/product/${product._id}`)}>
          View Product
        </button>
      </div>
      <button className="mt-2 p-2 bg-green-500 text-white rounded" onClick={handleWriteReview}>
        Write a Review
      </button>
      <button className="mt-2 p-2 bg-red-500 text-white rounded" onClick={handleDeleteChat}>
        Delete Chat
      </button>
    </div>
  );
};

export default ChatActions;