import BugReport from '../models/bugReport.model.js';

export const createBugReport = async (req, res) => {
  const { title, classification, reproducibility, location, description, browser } = req.body;
  const userId = req.user._id; // Assuming user is attached to the request

  if (!title || !classification || !location || !description || !browser || !userId) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const newBugReport = new BugReport({
      title,
      classification,
      reproducibility,
      location,
      description,
      browser,
      userId,
    });

    const savedBugReport = await newBugReport.save();
    return res.status(201).json({ success: true, message: 'Bug report created successfully', data: savedBugReport });
  } catch (error) {
    console.error('Error creating bug report:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getBugReports = async (req, res) => {
  try {
    const bugReports = await BugReport.find();
    return res.status(200).json({ success: true, data: bugReports });
  } catch (error) {
    console.error('Error fetching bug reports:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deleteBugReport = async (req, res) => {
  try {
    const { id } = req.params;
    await BugReport.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: 'Bug report deleted successfully' });
  } catch (error) {
    console.error('Error deleting bug report:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};