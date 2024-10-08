import express from 'express';

import { loginUser, registerUser } from '../controllers/user.controller.js';

const router = express.Router();

// Login Route

router.post('/login', loginUser);

// Register Route

router.post('/register', registerUser);

export default router; // Exports the router so that it can be used in other files