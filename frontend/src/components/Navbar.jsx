import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from "../context/UserContext";

import { HomeIcon, ExploreIcon, ProfileIcon } from '../components/icons';

const Navbar = () => {
  const { user } = useUser();

  const navigate = useNavigate();
  const location = useLocation();



  return (
    // <div className="h-screen bg-darkblue">
    //   <div className="w-full flex flex-col h-full items-center p-4">
    //     <div className="flex flex-row text-left mt-4 items-center justify-between">
    //       <Link
    //         to="/"
    //         className="text-2xl sm:text-3xl font-bold uppercase bg-clip-text"
    //       >
    //         <MdPerson size={80} color="white"/>
    //       </Link>
    //       <div className="flex flex-col text-white">
    //         <span>
    //           Caleb Shim
    //         </span>
    //         <span>
    //           {user?.data.email}
    //         </span>
    //         <span>
    //           Spalding Cove
    //         </span>
    //       </div>
    //     </div>
    //     <button onClick={handleClick}>
    //       Log Out
    //     </button>
    //     <div className="flex flex-col items-center mt-4 space-y-4 w-full">
    //       <Link to="/create" className="w-5/6">
    //         <button className="w-full py-4 bg-lightgray rounded-lg">
    //           <div className="flex flex-row justify-between px-4">
    //             <span className="mr-2 text-darkgray">Sell</span>
    //             <CiSquarePlus className="text-2xl" color="darkgray" />
    //           </div>
    //         </button>
    //       </Link>
    //       <Link to="/" className="w-5/6">
    //         <button className="w-full py-4 bg-lightgray rounded-lg">
    //           <div className="flex flex-row justify-between px-4">
    //             <span className="mr-2 text-darkgray">Browse</span>
    //             <CiSquarePlus className="text-2xl" color="darkgray" />
    //           </div>
    //         </button>
    //       </Link>
    //       <Link to="/messages" className="w-5/6">
    //         <button className="w-full py-4 bg-lightgray rounded-lg">
    //           <div className="flex flex-row justify-between px-4">
    //             <span className="mr-2 text-darkgray">Messages</span>
    //             <CiSquarePlus className="text-2xl" color="darkgray" />
    //           </div>
    //         </button>
    //       </Link>
    //     </div>
    //   </div>
    // </div>

    <div className='fixed inset-x-0 bottom-6 flex justify-center'>
      <div className='flex flex-row justify-center space-x-8 backdrop-blur-md bg-opacity-30 bg-dark-blue w-[75%] rounded-full py-2 border border-white border-opacity-40'>
        <div className={location.pathname === '/home' ? 'p-1 rounded-full bg-white' : 'p-1 rounded-full border-transparent'}>
          <HomeIcon color={location.pathname === '/home' ? '#011C40' : 'white'} className='w-[35px] relative z-10' onClick={() => navigate('/home')} />        
        </div>
        <div className={location.pathname === '/explore' ? 'p-1 rounded-full bg-white' : 'p-1 rounded-full border-transparent'}>
          <ExploreIcon color={location.pathname === '/explore' ? '#011C40' : 'white'} className='w-[35px] relative z-10' onClick={() => navigate('/explore')} />
        </div>
        {/* <div className={location.pathname === '/match-creation' ? 'p-1 rounded-full bg-white' : 'p-1 rounded-full border-transparent'}>
          <CourtIcon color={location.pathname === '/match-creation' ? '#011C40' : 'white'} className='w-[35px] relative z-10' onClick={() => navigate('/match-creation')} />
        </div> */}
        <div className={location.pathname === '/profile' ? 'p-1 rounded-full bg-white' : 'p-1 rounded-full border-transparent'}>
          <ProfileIcon color={location.pathname === '/profile' ? '#011C40' : 'white'} className='w-[35px] relative z-10' onClick={() => navigate('/profile')} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;