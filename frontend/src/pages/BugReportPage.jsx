import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { IoClose } from "react-icons/io5";


const BugReportPage = () => {
  const [title, setTitle] = useState('');
  const [classification, setClassification] = useState('Bug');
  const [reproducibility, setReproducibility] = useState('Always');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [browser, setBrowser] = useState('');
  const navigate = useNavigate();
  const { user } = useUser(); // Get the user from context

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bugReportData = {
      title,
      classification,
      reproducibility,
      location,
      description,
      browser,
      userId: user._id, // Include user ID
    };

    try {
      const response = await axios.post('/api/bug-reports', bugReportData);
      if (response.data.success) {
        alert('Bug report submitted successfully!');
        navigate('/');
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error('Error submitting bug report:', error);
      alert('An error occurred while submitting the bug report.');
    }
  };

  return (
    <div className="flex flex-col max-w-lg mx-auto p-4 text-white justify-between">
      <div className="flex flex-row mb-4 justify-between items-center">
      <h1 className="text-xl font-semibold">
          File a Bug Report
        </h1>
        <a className="" href="/home">
          <IoClose size={30}/>
        </a>
        
        
      </div>
      <div className="space-y-8">
        <div className="w-full">
          <div className="space-y-4">
            <input
              className="w-full p-4 border bg-inherit border-white border-opacity-50 rounded-md"
              placeholder="Title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <select
              className="w-full p-4 border bg-inherit border-white border-opacity-50 rounded-md"
              name="classification"
              value={classification}
              onChange={(e) => setClassification(e.target.value)}
            >
              <option className="text-black" value="Feature Request">Feature Request</option>
              <option className="text-black" value="Bug">Bug</option>
              <option className="text-black" value="Crash">Crash</option>
              <option className="text-black" value="Other">Other</option>
            </select>
            {classification === 'Bug' && (
              <select
                className="w-full p-4 border bg-inherit border-white border-opacity-50 rounded-md"
                name="reproducibility"
                value={reproducibility}
                onChange={(e) => setReproducibility(e.target.value)}
              >
                <option className="text-black" value="Always">Always</option>
                <option className="text-black" value="Sometimes">Sometimes</option>
                <option className="text-black" value="Rarely">Rarely</option>
                <option className="text-black" value="Unable to Reproduce">Unable to Reproduce</option>
              </select>
            )}
            <input
              className="w-full p-4 border bg-inherit border-white border-opacity-50 rounded-md"
              placeholder="Location"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <textarea
              className="w-full p-4 border bg-inherit border-white border-opacity-50 rounded-md"
              placeholder="Description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              className="w-full p-4 border bg-inherit border-white border-opacity-50 rounded-md"
              placeholder="Browser"
              name="browser"
              value={browser}
              onChange={(e) => setBrowser(e.target.value)}
            />
            <button
              className="w-full p-2 bg-darkblue text-white rounded"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <p className="opacity-50 text-center font-light">
        Please note that by submitting this bug report, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
};

export default BugReportPage;