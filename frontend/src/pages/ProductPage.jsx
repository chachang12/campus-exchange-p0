import {React, useContext} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { messageIcon, close, share } from '../assets';
import { useUser } from "../context/UserContext";
import { ChatContext } from '../context/ChatContext';

const ProductPage = () => {
  const location = useLocation();
  const { product } = location.state;
  const navigate = useNavigate();
  const {createChat} = useContext(ChatContext);
  const {user} = useUser();

  // const user = {
  //   _id: "67204b014e8dad2e12cd9aa3",
  //   firstName: 'Caleb',
  //   lastName: 'shim',
  //   email: 'poop@gmail.com',
  //   profilePicture: 'https://avatars.githubusercontent.com/u/136373179?v=4',
  //   listings: 5,
  //   rating: 4.5,
  // };

  // Function to handle back navigation
  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
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
        <button onClick={() => createChat(user._id, product.creatorId, product._id)} className=''>
            <img src={messageIcon} alt="Message Seller" className="w-8 h-8" />
        </button>
        <button>
            <img src={share} alt="Share" className="w-8 h-8" />
        </button>
      </div>
      
      <p className='font-light'>
            {product.description}
        </p>
    </div>
  );
};

export default ProductPage;