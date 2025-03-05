import { useNavigate, useLocation } from 'react-router-dom';
import { useContext, useState } from "react";
import { HomeIcon, ProfileIcon, SearchIcon, TagIcon, MessageIcon, Logo } from '../components/icons';
import { IoNotifications, IoMenu, IoClose, IoPersonCircleOutline } from 'react-icons/io5';
import { ChatContext } from "../context/ChatContext";
import { useUser } from "../context/UserContext";
import { unreadNotificationsFunc } from "../utils/unreadNotifications";
import { IoIosNotificationsOutline } from "react-icons/io";
import { HiOutlineMenuAlt4 } from "react-icons/hi";

const NavbarMkII = () => {
  const { user } = useUser();
  const { notifications } = useContext(ChatContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const unreadNotifications = unreadNotificationsFunc(notifications, user);

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <div className='w-full top-0 flex justify-between items-center backdrop-blur-md bg-opacity-50 bg-inherit p-4 relative z-50'>
      <div className='flex items-center space-x-4 cursor-pointer'>
        <Logo fill={'white'} width={30} height={30} onClick={() => handleNavigate('/home')} />
        <div className='w-8 h-8'>

        </div>
      </div>
      <div className='hidden md:flex items-center space-x-4 cursor-pointer'>
        <div className='p-2' onClick={() => handleNavigate('/home')}>
          <span className='text-white'>Home</span>
        </div>
        <div className='p-2' onClick={() => handleNavigate('/search')}>
          <span className='text-white'>Search</span>
        </div>
        <div className='p-2' onClick={() => handleNavigate('/create')}>
          <span className='text-white'>Create</span>
        </div>
        <div className='p-2' onClick={() => handleNavigate('/messages')}>
          <span className='text-white'>Messages</span>
        </div>
      </div>
      <div className='flex items-center space-x-4 cursor-pointer'>
        {user && user.profilePicture ? (
          <img
            src={user.profilePicture}
            alt="Profile"
            className='w-8 h-8 object-cover object-center rounded-full'
            onClick={() => handleNavigate('/profile')}
          />
        ) : (
          <IoPersonCircleOutline size={150} />
        )}
        <div className='relative'>
          <IoIosNotificationsOutline className='w-8 h-8 text-white' onClick={() => handleNavigate('/notifications')} />
          {unreadNotifications.length > 0 && (
            <div className="absolute top-0 right-0 w-5 h-5 rounded-full bg-blue-500 text-sm text-white text-center">
              {unreadNotifications.length}
            </div>
          )}
        </div>
        <div className='md:hidden'>
          {menuOpen ? (
            <IoClose className='w-8 h-8 text-white' onClick={() => setMenuOpen(!menuOpen)} />
          ) : (
            <HiOutlineMenuAlt4 className='w-8 h-8 text-white' onClick={() => setMenuOpen(!menuOpen)} />
          )}
        </div>
      </div>
      {menuOpen && (
        <div className='absolute top-16 left-0 right-0 bg-[#121212] p-4 md:hidden transition-all duration-300 ease-in-out transform z-50'>
          <div className='flex flex-col space-y-4'>
            <div className={`flex items-center space-x-2 p-2 `} onClick={() => handleNavigate('/home')}>
              <span className='text-white'>Home</span>
            </div>
            <div className={`flex items-center space-x-2 p-2 `} onClick={() => handleNavigate('/search')}>
              <span className='text-white'>Search</span>
            </div>
            <div className={`flex items-center space-x-2 p-2 `} onClick={() => handleNavigate('/create')}>
              <span className='text-white'>Create</span>
            </div>
            <div className={`flex items-center space-x-2 p-2 `} onClick={() => handleNavigate('/messages')}>
              <span className='text-white'>Messages</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarMkII;