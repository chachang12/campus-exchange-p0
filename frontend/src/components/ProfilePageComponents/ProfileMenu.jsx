import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { FaQuestion } from "react-icons/fa6";


const ProfileMenu = () => {
  const { logout } = useUser();
  const navigate = useNavigate();

  const handleEditProfile = () => {
    // Navigate to edit profile page
    navigate('/edit-profile');
  };

  const handleViewFavoritedListings = () => {
    navigate('/profile/favorites');
  };

  const handleViewActiveListings = () => {
    // Navigate to active listings page
    navigate('/active-listings');
  };

  const handleViewReviews = () => {
    // Navigate to reviews page
    navigate('/reviews');
  };

  const handleChangeAccountSettings = () => {
    // Navigate to account settings page
    navigate('/account-settings');
  };

  const handleViewArchivedListings = () => {
    // Navigate to archived listings page
    navigate('/archived-listings');
  };

  const buttonStyle = 'flex justify-between w-full py-2 px-4 text-white text-left';
  return (
    <div className="flex flex-col items-center min-h-screen px-4 mt-1 text-white bg-dark-blue pb-28 p-4">
      <div className="flex justify-between w-full mb-4 items-center">
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-[#1F1F1F] rounded-full flex items-center justify-center outline outline-1 outline-gray-500">
          <SlArrowLeft size={20} />
        </button>
        <h1 className="text-white text-xl font-semibold">Settings and activity</h1>
        <button className='w-10 h-10 bg-[#1F1F1F] rounded-full flex items-center justify-center outline outline-1 outline-gray-500'>
          <FaQuestion size={20} />
        </button>
      </div>
      
      <div className="space-y-4 w-full">
        <h2 className='font-[600]'>Your account</h2>
        <button
          className={buttonStyle}
          onClick={handleEditProfile}
        >
          Edit Profile
          <SlArrowRight size={20} />
        </button>
        <button
          className={buttonStyle}
          onClick={handleChangeAccountSettings}
        >
          Change Account Settings
          <SlArrowRight size={20} />
        </button>
        <h2 className='font-[600]'>Your activity</h2>
        <button
          className={buttonStyle}
          onClick={handleViewFavoritedListings}
        >
          View Favorited Listings
          <SlArrowRight size={20} />
        </button>
        {/* <button
          className={buttonStyle}
          onClick={handleViewActiveListings}
        >
          View Active Listings
          <SlArrowRight size={20} />
        </button>
        <button
          className={buttonStyle}
          onClick={handleViewReviews}
        >
          View Archived Listings
          <SlArrowRight size={20} />
        </button> */}
        {/* <button
          className={buttonStyle}
          onClick={handleViewReviews}
        >
          View Reviews
          <SlArrowRight size={20} />
        </button> */}
      </div>
      <button
        className="w-full py-2 px-4 bg-red-500 text-white rounded-lg mt-4"
        onClick={logout}
      >
        Log Out
      </button>
    </div>
  );
};

export default ProfileMenu;