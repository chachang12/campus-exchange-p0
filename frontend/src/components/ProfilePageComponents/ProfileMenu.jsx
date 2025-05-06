import React from 'react';
import { useState } from 'react';
import { updateUser, uploadProfilePicture } from '../../utils/fetchUtils';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import ProfilePicturePopup from '../../pages/ProfileMenu/ProfilePicturePopup';


const ProfileMenu = () => {
  const { logout } = useUser();
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [bio, setBio] = useState(user.bio)

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

  const handleViewBugReportMenu = () => {
    // Navigate to archived listings page
    navigate('/bug-report');
  };

  const handleProfilePictureUpload = async (file) => {
    try {
      const response = await uploadProfilePicture(file);
      if (response.success) {
        const updatedUser = { ...user, profilePicture: response.imageUrl };
        setUser(updatedUser);
        alert('Profile picture uploaded successfully');
      } else {
        alert(`Error: ${response.message}`);
      }
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      alert('Error uploading profile picture.');
    }
  };

  const handleSave = async () => {
    try {
      const updatedUser = { ...user, firstName, lastName, bio };
      const response = await updateUser(updatedUser);
      if (response.success) {
        setUser(response.data);
        alert('Profile updated successfully');
        navigate('/profile');
      } else {
        alert(`Error: ${response.message}`);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    }
  };

  const buttonStyle = 'flex justify-between w-full py-2 px-4 text-white text-left';
  return (
    <div className="flex flex-col items-center min-h-screen px-4 mt-1 text-white bg-dark-blue pb-28 p-4">
      <div className="flex justify-start w-full mb-4 items-center">
        <h1 className="text-white text-xl font-semibold">Edit Profile</h1>
      </div>
      
      <div className="space-y-4 w-full">
        <div className="flex flex-col items-center w-full">
      <div className="flex justify-end w-full mb-4 items-center">
        <button onClick={handleSave} className="">Save</button>
      </div>
        <div className="space-y-4 w-full flex flex-col">
          <div className="flex justify-center items-center w-full">
            <img src={user.profilePicture} alt="Profile" className="w-20 h-20 object-cover rounded-full" />
          </div>
          <button
            onClick={() => setIsPopupOpen(true)}
            className=""
          >
            Change Profile Picture
          </button>
          <h2 className='font-[600]'>First Name</h2>
          <input
            className="w-full p-2 rounded-md bg-inherit border border-white border-opacity-50"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <h2 className='font-[600]'>Last Name</h2>
          <input
            className="w-full p-2 rounded-md bg-inherit border border-white border-opacity-50"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <h2 className='font-[600]'>Bio</h2>
          <input
            className="w-full p-2 rounded-md bg-inherit border border-white border-opacity-50"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder='Max 150 characters.'
          />
        </div>

        <ProfilePicturePopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          onUpload={handleProfilePictureUpload}
        />
      </div>
        {/* <button
          className={buttonStyle}
          onClick={handleChangeAccountSettings}
        >
          Change Account Settings
          <SlArrowRight size={20} />
        </button> */}
        <h2 className='font-[600]'>Your activity</h2>
        {/* <button
          className={buttonStyle}
          onClick={handleViewFavoritedListings}
        >
          View Favorited Listings
          <SlArrowRight size={20} />
        </button> */}
        <button
          className={buttonStyle}
          onClick={handleViewBugReportMenu}
        >
          Report a Bug
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