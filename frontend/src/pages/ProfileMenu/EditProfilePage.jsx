import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { uploadProfilePicture, updateUser } from '../../utils/fetchUtils';
import { useNavigate } from 'react-router-dom';
import { SlArrowLeft } from "react-icons/sl";

const EditProfilePage = () => {
  const { user, setUser } = useUser();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const navigate = useNavigate();

  const handleProfilePictureUpload = async () => {
    if (!profilePictureFile) {
      alert('Please select a file to upload.');
      return;
    }

    try {
      const response = await uploadProfilePicture(profilePictureFile);
      if (response.success) {
        const updatedUser = { ...user, profilePicture: response.imageUrl };
        const updateResponse = await updateUser(updatedUser);
        if (updateResponse.success) {
          setUser(updateResponse.data);
          alert('Profile picture updated successfully.');
        } else {
          alert(`Error: ${updateResponse.message}`);
        }
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
    <div className="flex flex-col items-center min-h-screen px-4 mt-1 text-white bg-dark-blue pb-28">
      <div className="flex justify-between w-full mb-4 items-center">
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-[#1F1F1F] rounded-full flex items-center justify-center outline outline-1 outline-gray-500">
          <SlArrowLeft size={20} />
        </button>
        <h1 className="text-white text-xl font-semibold">Edit Profile</h1>
        <div className="w-10 h-10"></div>
      </div>
      <div className="space-y-4 w-full">
        <h2 className='font-[600]'>Profile Picture</h2>
        <input type="file" onChange={(e) => setProfilePictureFile(e.target.files[0])} />
        <button
          onClick={handleProfilePictureUpload}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg mt-4"
        >
          Upload Profile Picture
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
        <button
          onClick={handleSave}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg mt-4"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditProfilePage;