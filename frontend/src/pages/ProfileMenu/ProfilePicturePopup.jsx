import React, { useState } from 'react';
import { IoMdPhotos } from "react-icons/io";

const ProfilePicturePopup = ({ isOpen, onClose, onUpload }) => {
  const [profilePictureFile, setProfilePictureFile] = useState(null);

  const handleUpload = () => {
    onUpload(profilePictureFile);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#222222] p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Change Profile Picture</h2>
        <input 
          type="file" 
          id="fileInput" 
          onChange={(e) => setProfilePictureFile(e.target.files[0])} 
          style={{ display: 'none' }} 
        />
        <label htmlFor="fileInput" className="flex items-center cursor-pointer mb-4">
          <IoMdPhotos size={24} />
          <span className="ml-2">Choose File</span>
        </label>
        <div className="flex flex-col items-start gap-2">
          <button onClick={handleUpload} className="">Upload</button>
          <button onClick={onClose} className="mr-2">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePicturePopup;