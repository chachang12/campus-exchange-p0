import axios from 'axios';

export const getAllBugReports = async () => {
  try {
    const res = await axios.get('/api/bug-reports');
    return res.data.data;
  } catch (error) {
    console.error('Error fetching bug reports:', error);
    throw error;
  }
};