import React from 'react';
import ReportCard from './ReportCard';

const BugCardColumn = ({ bugReports, onSelectReport }) => {
  return (
    <div className="w-1/3 p-4 bg-gray-100 overflow-y-auto">
      {bugReports.map((report) => (
        <div key={report._id} onClick={() => onSelectReport(report)} className="cursor-pointer">
          <ReportCard
            title={report.title}
            classification={report.classification}
            reproducibility={report.reproducibility}
            location={report.location}
            browser={report.browser}
            date={report.createdAt}
          />
        </div>
      ))}
    </div>
  );
};

export default BugCardColumn;