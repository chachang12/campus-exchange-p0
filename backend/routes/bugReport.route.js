// backend/routes/bugReport.route.js
import express from 'express';
import { createBugReport, getBugReports } from '../controllers/bugReport.controller.js';

const router = express.Router();

router.post('/', createBugReport);
router.get('/', getBugReports);

export default router;