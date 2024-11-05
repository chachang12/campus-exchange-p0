import {React, useContext, useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { messageIcon, close, share, star } from '../assets';
import { useUser } from "../context/UserContext";
import { ChatContext } from '../context/ChatContext';
import { getUserById } from '../utils/fetchUtils';

const ProductPage = () => {
  const location = useLocation();
  const { product } = location.state;
  const navigate = useNavigate();
  const { createChat } = useContext(ChatContext);
  const { user } = useUser();
  const [creator, setCreator] = useState(null);

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

  // Function to handle back navigation
  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleCreateChat = async () => {
    try {
      await createChat(user._id, product.creatorId, product._id);
      console.log('Chat created successfully');
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

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
        <button onClick={handleCreateChat} className=''>
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
    </div>
  );
};

export default ProductPage;