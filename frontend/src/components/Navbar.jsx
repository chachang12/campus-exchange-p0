import { useNavigate, useLocation } from 'react-router-dom';

import { HomeIcon, ProfileIcon, SearchIcon, TagIcon, MessageIcon } from '../components/icons';

const Navbar = () => {

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className='fixed inset-x-0 bottom-6 z-40 flex justify-center'>
      <div className='flex flex-row justify-center space-x-8 backdrop-blur-md bg-opacity-50 bg-[#1F1F1F] w-[365px] rounded-full py-2 border border-white border-opacity-40'>
        <div className={location.pathname === '/create' ? 'p-1 rounded-full bg-white' : 'p-1 rounded-full border-transparent'}>
          <TagIcon color={location.pathname === '/create' ? '#1A1E26' : 'white'} className='w-[35px] relative z-10 top-1' onClick={() => navigate('/create')} />
        </div>
        <div className={location.pathname === '/search' ? 'px-[9px] py-2  rounded-full bg-white' : 'px-[9px] py-2 rounded-full border-transparent'}>
          <SearchIcon color={location.pathname === '/search' ? '#1A1E26' : 'white'} className='w-[35px] relative z-10' onClick={() => navigate('/search')} />
        </div>
        <div className={location.pathname === '/home' ? 'p-1 rounded-full bg-white items-center justify-center' : 'p-1 rounded-full border-transparent'}>
          <HomeIcon color={location.pathname === '/home' ? '#1A1E26' : 'white'} className='w-[35px] relative z-10' onClick={() => navigate('/home')} />        
        </div>
        <div className={location.pathname === '/messages' ? ' px-[7px] py-[5px] rounded-full bg-white' : 'px-[7px] py-[5px] rounded-full border-transparent'}>
          <MessageIcon color={location.pathname === '/messages' ? '#1A1E26' : 'white'} className='w-[35px] relative z-10' onClick={() => navigate('/messages')} />
        </div>
        <div className={location.pathname === '/profile' ? 'p-1 rounded-full bg-white' : 'p-1 rounded-full border-transparent'}>
          <ProfileIcon color={location.pathname === '/profile' ? '#1A1E26' : 'white'} className='w-[35px] relative z-10' onClick={() => navigate('/profile')} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;