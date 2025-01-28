import React, { useEffect, useState } from 'react';
import { getAllBugReports } from '../../utils/adminUtils';
import BugCardColumn from './Components/BugCardColumn';
import BugReviewMenu from './Components/BugReviewMenu';

const BugReports = () => {
  const [bugReports, setBugReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    const fetchBugReports = async () => {
      try {
        const reports = await getAllBugReports();
        reports.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by date
        setBugReports(reports);
        setSelectedReport(reports[0]); // Select the latest report by default
      } catch (error) {
        console.error('Error fetching bug reports:', error);
      }
    };

    fetchBugReports();
  }, []);

  return (
    <div className="flex h-full">
      <BugCardColumn bugReports={bugReports} onSelectReport={setSelectedReport} />
      <BugReviewMenu report={selectedReport} />
    </div>
  );
};

export default BugReports;