import express from 'express';
import {
    googleAuth,
    googleAuthCallback,
    googleAuthRedirect,
    logout,
} from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/google', googleAuth);
router.get('/google/callback', googleAuthCallback, googleAuthRedirect);
router.get('/logout', logout);

export default router;