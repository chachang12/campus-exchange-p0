import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserManagement from './UserManagement';
import ReportRequests from './ReportRequests';
import BugReports from './BugReports';
import NavBar from './Components/NavBar';

const AdminDashboard = () => {
  return (
    <div className="flex h-screen">
      <NavBar />
      <div className="flex-1 p-4 bg-slate-50">
        <Routes>
          <Route path="user-management" element={<UserManagement />} />
          <Route path="report-requests" element={<ReportRequests />} />
          <Route path="bug-reports" element={<BugReports />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;