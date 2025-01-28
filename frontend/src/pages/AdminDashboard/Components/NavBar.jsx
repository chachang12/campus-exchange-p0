import React from 'react';
import { Link } from 'react-router-dom';
import { FaBug, FaClipboardList, FaUsers, FaUserCircle } from 'react-icons/fa';

const NavBar = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      </div>
      <nav className="flex flex-col p-4 space-y-4">
        <Link to="/admin/user-management" className="flex items-center p-2 hover:bg-gray-700 rounded">
          <FaUsers className="mr-2" />
          User Management
        </Link>
        <Link to="/admin/report-requests" className="flex items-center p-2 hover:bg-gray-700 rounded">
          <FaClipboardList className="mr-2" />
          Report Requests
        </Link>
        <Link to="/admin/bug-reports" className="flex items-center p-2 hover:bg-gray-700 rounded">
          <FaBug className="mr-2" />
          Bug Reports
        </Link>
        <Link to="/profile" className="flex items-center p-2 hover:bg-gray-700 rounded">
          <FaUserCircle className="mr-2" />
          Profile
        </Link>
      </nav>
    </div>
  );
};

export default NavBar;