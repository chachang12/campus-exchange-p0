import React, { useState } from 'react';

const ProfilePicturePopup = ({ isOpen, onClose, onUpload }) => {
  const [profilePictureFile, setProfilePictureFile] = useState(null);

  const handleUpload = () => {
    onUpload(profilePictureFile);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Change Profile Picture</h2>
        <input type="file" onChange={(e) => setProfilePictureFile(e.target.files[0])} />
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="mr-2 py-2 px-4 bg-gray-500 text-white rounded-lg">Cancel</button>
          <button onClick={handleUpload} className="py-2 px-4 bg-blue-500 text-white rounded-lg">Upload</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePicturePopup;