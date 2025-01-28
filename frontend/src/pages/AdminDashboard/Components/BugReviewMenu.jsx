import React from 'react';

const BugReviewMenu = ({ report }) => {
  if (!report) return <div className="p-4">Select a bug report to view details</div>;

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
    </div>
  );
};

export default BugReviewMenu;