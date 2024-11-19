import { useContext, useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import BackButton from "../Buttons/BackButton";

const ChatHeader = () => {
  const { user } = useUser();
  const { currentChat, product } = useContext(ChatContext);
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
      <div className='mr-4'>
        <BackButton />
      </div>
      
        <div className='flex' onClick={() => navigate(`/chat/${currentChat._id}/actions`)}>
          <img src={recipientUser?.profilePicture} crossOrigin="anonymous" className="w-[50px] h-[50px] rounded-full mr-4 object-cover" />
            <div>
              <strong className="text-white text-lg">{recipientUser?.firstName}</strong>
              {productData && <p className="text-gray-400 text-sm">{productData.name}</p>}
            </div>
        </div>

      
    </div>
  );
};

export default ChatHeader;