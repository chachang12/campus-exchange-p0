import express from 'express';
import { getUniversities } from '../controllers/university.controller.js';

const router = express.Router();

router.get('/', getUniversities);

export default router;