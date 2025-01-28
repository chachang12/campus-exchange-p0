import mongoose from 'mongoose';

const bugReportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  classification: {
    type: String,
    required: true,
    enum: ['Feature Request', 'Bug', 'Crash', 'Other'],
  },
  reproducibility: {
    type: String,
    required: false,
    enum: ['Always', 'Sometimes', 'Rarely', 'Unable to Reproduce'],
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  browser: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

const BugReport = mongoose.model('BugReport', bugReportSchema);

export default BugReport;