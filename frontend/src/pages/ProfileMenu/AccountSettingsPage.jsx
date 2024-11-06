import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { updateUserUniversity, fetchUniversities } from '../../utils/fetchUtils';
import { useNavigate } from 'react-router-dom';
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";


const AccountSettingsPage = () => {
  const { user, setUser } = useUser();
  const [universityId, setUniversityId] = useState(user.universityId || '');
  const [universities, setUniversities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUniversities = async () => {
      try {
        const response = await fetchUniversities();
        setUniversities(response);
      } catch (error) {
        console.error('Error fetching universities:', error);
      }
    };

    loadUniversities();
  }, []);

  const handleSave = async () => {
    try {
      const response = await updateUserUniversity(user._id, universityId);
      if (response.success) {
        setUser(response.data);
        alert('University updated successfully');
      } else {
        alert('Error updating university');
      }
    } catch (error) {
      console.error('Error updating university:', error);
      alert('Error updating university');
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-4 mt-1 text-white bg-dark-blue pb-28">
      <div className="flex justify-between w-full mb-4 items-center">
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-[#1F1F1F] rounded-full flex items-center justify-center outline outline-1 outline-gray-500">
          <SlArrowLeft size={20} />
        </button>
        <h1 className="text-white text-xl font-semibold">Account Settings</h1>
        <div className="w-10 h-10"></div>
      </div>
      <div className="space-y-4 w-full">
        <h2 className='font-[600]'>University</h2>
        <select
          value={universityId}
          onChange={(e) => setUniversityId(e.target.value)}
          className="w-full p-2 rounded-md bg-inherit border border-white border-opacity-50"
        >
          <option value="">Select University</option>
          {universities.map((university) => (
            <option key={university._id} value={university._id}>
              {university.name}
            </option>
          ))}
        </select>
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

export default AccountSettingsPage;