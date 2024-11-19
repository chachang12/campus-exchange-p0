import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { updateUser } from '../../utils/fetchUtils';
import { useNavigate } from 'react-router-dom';
import { SlArrowLeft } from "react-icons/sl";
import ProfilePicturePopup from './ProfilePicturePopup';
import BackButton from '../../components/Buttons/BackButton';

const EditProfilePage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleProfilePictureUpload = async (file) => {
    try {
      // Your upload logic here
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      alert('Error uploading profile picture.');
    }
  };

  const handleSave = async () => {
    try {
      const updatedUser = { ...user, firstName, lastName };
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

  return (
    <div className="flex flex-col items-center min-h-screen px-4 mt-1 text-white bg-dark-blue pb-28 p-4">
      <div className="flex justify-between w-full mb-4 items-center">
        <BackButton />
        <h1 className="text-white text-xl font-semibold">Edit Profile</h1>
        <button onClick={handleSave} className="">Save</button>
      </div>

      <div className="space-y-4 w-full flex flex-col">
        <div className="flex justify-center items-center w-full">
          <img src={user.profilePicture} crossOrigin='anonymous' alt="Profile" className="w-20 h-20 object-cover rounded-full" />
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
        
      </div>

      <ProfilePicturePopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onUpload={handleProfilePictureUpload}
      />
    </div>
  );
};

export default EditProfilePage;