// const express = require('express');
// const authController = require('../controllers/authController');

// const Router = express.Router();


// Router.get("/google", authController.googleAuth);


// module.exports = Router;

// backend/routes/authRoutes.js
import express from 'express';
import { googleAuth } from '../controllers/authController.js';

const router = express.Router();

router.get('/google', googleAuth);

export default router;