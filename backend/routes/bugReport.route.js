// backend/routes/bugReport.route.js
import express from 'express';
import { createBugReport, getBugReports, deleteBugReport } from '../controllers/bugReport.controller.js';

const router = express.Router();

router.post('/', createBugReport);
router.get('/', getBugReports);
router.delete('/:id', deleteBugReport);

export default router;