import express from 'express';
import {
    googleAuth,
    googleAuthCallback,
    googleAuthRedirect,
    logout,
    // loginSuccess,
    // loginFailure
} from '../controllers/auth.controller.js';

const router = express.Router();

router.get('/google', googleAuth);
router.get('/google/callback', googleAuthCallback, googleAuthRedirect);
// router.get('/login/success', loginSuccess); // Add the missing handler
// router.get('/login/failure', loginFailure); // Add a failure route for completeness
// router.get('/profile', getProfile);
router.get('/logout', logout);

export default router;