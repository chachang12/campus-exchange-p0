import {React, useContext, useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { messageIcon, close, share, star } from '../assets';
import { IoIosShareAlt } from "react-icons/io";
import { FiMessageCircle } from "react-icons/fi";
import { useUser } from "../context/UserContext";
import { ChatContext } from '../context/ChatContext';
import { getUserById, addFavorite, removeFavorite } from '../utils/fetchUtils';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const ProductPage = () => {
  const location = useLocation();
  const { product } = location.state;
  const navigate = useNavigate();
  const { createChat } = useContext(ChatContext);
  const [isFavorite, setIsFavorite] = useState(false);
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

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await removeFavorite(user._id, product._id);
      } else {
        await addFavorite(user._id, product._id);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <div className="p-4 text-white">
      <div className='mb-4 p-3 bg-[#1F1F1F] w-[40px] flex items-center justify-center rounded-full outline outline-1 outline-gray-500'>
        <SlArrowLeft onClick={handleBack} />
      </div>
      <div className='flex flex-col'>
        <img crossOrigin="anonymous" src={product.image} alt={product.name} className="w-full h-auto rounded-xl mb-2" />
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-lg font-semibold">${product.price}</p>
        <div className='flex flex-row justify-between mb-2'>
            {product.condition && <p className="text-lg font-light text-gray-400">{capitalizeFirstLetter(product.condition)}</p>}
            {product.size && <p className="text-lg">Size: {product.size}</p>}
        </div>       
      </div>
      
      {/* TODO : Implement this button to start a new chat with the seller revolving around the product id.  */}
      <div className='flex flex-row justify-between mb-4'>
        <button onClick={handleCreateChat} className='flex items-center py-2 px-4 outline outline-1 outline-gray-500 rounded-full bg-[#1F1F1F] gap-1'>
          < FiMessageCircle size={20}/>
          <span>Message</span>
        </button>
        <button className='flex items-center py-2 px-4 outline outline-1 outline-gray-500 rounded-full bg-[#1F1F1F] gap-1'>
          < IoIosShareAlt size={20}/>
          <span>Share</span>
        </button>
        <button onClick={toggleFavorite} className="flex items-center py-2 px-4 outline outline-1 outline-gray-500 rounded-full bg-[#1F1F1F] gap-1">
          {isFavorite ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
          <span>Favorite</span>
        </button>
      </div>

      <div className='border-b border-gray-500 mb-2'>

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