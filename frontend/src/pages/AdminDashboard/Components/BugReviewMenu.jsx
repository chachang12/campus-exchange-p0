import React from 'react';
import axios from 'axios';

const BugReviewMenu = ({ report, onDelete }) => {
  if (!report) return <div className="p-4">Select a bug report to view details</div>;

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/bug-reports/${report._id}`);
      onDelete(report._id);
    } catch (error) {
      console.error('Error deleting bug report:', error);
    }
  };

  return (
    <div className="w-2/3 p-4 bg-white">
      <h2 className="text-2xl font-semibold mb-4">{report.title}</h2>
      <p><strong>Classification:</strong> {report.classification}</p>
      {report.classification === 'Bug' && (
        <p><strong>Reproducibility:</strong> {report.reproducibility}</p>
      )}
      <p><strong>Location:</strong> {report.location}</p>
      <p><strong>Browser:</strong> {report.browser}</p>
      <p><strong>Description:</strong> {report.description}</p>
      {/* <p><strong>Reported by:</strong> {report.user.firstName} {report.userId.lastName}</p> */}
      <button onClick={handleDelete} className="mt-4 py-2 px-4 bg-red-500 text-white rounded">
        Resolve Bug
      </button>
    </div>
  );
};

export default BugReviewMenu;