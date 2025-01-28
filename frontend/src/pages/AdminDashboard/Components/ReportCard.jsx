import React from 'react';

const ReportCard = ({ title, classification, reproducibility, location, browser, date }) => {
  return (
    <div className="p-4 border bg-slate-50 border-gray-700 rounded-md mb-4">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p><strong>Classification:</strong> {classification}</p>
      <p>{date}</p>
    </div>
  );
};

export default ReportCard;