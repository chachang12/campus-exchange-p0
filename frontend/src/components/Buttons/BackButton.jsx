import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SlArrowLeft } from 'react-icons/sl';
import { ChatContext } from '../../context/ChatContext';

const BackButton = () => {
  const navigate = useNavigate();
  const {updateCurrentChat} = useContext(ChatContext);

  const handleClick = () => {
    updateCurrentChat(null);
    navigate(-1);
  }

  return (
    <button onClick={() => handleClick()} className="w-10 h-10 bg-[#1F1F1F] rounded-full flex items-center justify-center outline outline-1 outline-gray-500">
      <SlArrowLeft size={20} />
    </button>
  );
};

export default BackButton;