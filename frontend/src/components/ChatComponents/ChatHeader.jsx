import { useContext, useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { SlArrowLeft } from 'react-icons/sl';

const ChatHeader = () => {
  const { user } = useUser();
  const { currentChat, product, updateCurrentChat } = useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const navigate = useNavigate();
  
  let productData;
  try {
    productData = product ? product.data : null;
  } catch (error) {
    console.error('Error fetching product:', error);
  }

  return (
    <div className="flex items-center p-4 w-full backdrop-blur bg-opacity-30" >
      <div onClick={() => updateCurrentChat(null)} className='mr-4 w-10 h-10 bg-[#1F1F1F] rounded-full flex items-center justify-center outline outline-1 outline-gray-500 sm:hidden'>
        <SlArrowLeft size={20} color={'white'}/>
      </div>
      
        <div className='flex' onClick={() => navigate(`/chat/${currentChat._id}/actions`)}>
          <img src={recipientUser?.profilePicture} className="w-[50px] h-[50px] rounded-full mr-4 object-cover object-center" />
            <div>
              <strong className="text-white text-lg">{recipientUser?.firstName}</strong>
              {productData && <p className="text-gray-400 text-sm">{productData.name}</p>}
            </div>
        </div>
    </div>
  );
};

export default ChatHeader;