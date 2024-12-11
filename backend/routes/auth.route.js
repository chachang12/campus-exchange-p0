import express from 'express';
import {
  googleAuth,
  googleAuthCallback,
  googleAuthRedirect,
  checkAuth,
  logout,
} from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/google', googleAuth);
router.get('/google/callback', googleAuthCallback, googleAuthRedirect);
router.get('/check', checkAuth); // New route to check authentication status
router.get('/logout', logout);

export default router;