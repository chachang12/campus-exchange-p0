// backend/controllers/auth.controller.js

import passport from 'passport';
import dotenv from 'dotenv';

// Ensure the correct .env file is loaded
const ENV = process.env.NODE_ENV || 'development';
let envFile = '../.env.development';
if (ENV === 'production') {
  envFile = '../.env.production';
}
dotenv.config({ path: envFile });

export const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

export const googleAuthCallback = passport.authenticate('google', { failureRedirect: `${process.env.FRONTEND_URL}/login` });

export const googleAuthRedirect = (req, res) => {
  if (req.isAuthenticated()) {
    console.log('User authenticated [auth.controller.js]:', req.user);
    res.redirect(`${process.env.FRONTEND_URL}/profile`); // Use environment variable
  } else {
    console.log('Authentication failed. [auth.controller.js]');
    res.redirect(`${process.env.FRONTEND_URL}/login`);
  }
};

export const checkAuth = (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ authenticated: true, user: req.user });
  } else {
    console.log("User not authenticated [auth.controller.js]");
    res.status(401).json({ authenticated: false });
  }
};

export const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Logout Error:', err);
      return res.status(500).json({ message: 'Error logging out.' });
    }
    res.redirect(`${process.env.FRONTEND_URL}/login`);
  });
};