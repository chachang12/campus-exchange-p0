import { useContext, useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SlArrowLeft } from 'react-icons/sl';
import { useUser } from "../../context/UserContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";

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
    <div className="flex items-center p-4 w-full bg-[#1A1E26] backdrop-blur bg-opacity-30" onClick={() => navigate(`/chat/${currentChat._id}/actions`)}>
      <SlArrowLeft className="text-white text-2xl mr-4 cursor-pointer" onClick={() => navigate('/messages')} />
      <img src={recipientUser?.profilePicture} crossOrigin="anonymous" className="w-[50px] h-[50px] rounded-full mr-4 object-cover object-center" />
      <div>
        <strong className="text-white text-lg">{recipientUser?.firstName}</strong>
        {productData && <p className="text-gray-400 text-sm">{productData.name}</p>}
      </div>
    </div>
  );
};

export default ChatHeader;