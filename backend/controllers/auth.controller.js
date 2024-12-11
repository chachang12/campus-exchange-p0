// backend/controllers/auth.controller.js

import passport from 'passport';

export const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

export const googleAuthCallback = passport.authenticate('google', { failureRedirect: 'https://campus-exchange-p0-1.onrender.com/login' });

export const googleAuthRedirect = (req, res) => {
  if (req.isAuthenticated()) {
    console.log('User authenticated [auth.controller.js]:', req.user);
    res.redirect('https://campus-exchange-p0-1.onrender.com/profile');
  } else {
    console.log('Authentication failed. [auth.controller.js]');
    res.redirect('/login');
  }
};

export const checkAuth = (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ authenticated: true, user: req.user });
  } else {
    res.status(401).json({ authenticated: false });
  }
};

export const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Session destruction failed' });
      }
      res.clearCookie('connect.sid', { path: '/' }); // Ensure the path matches your session cookie
      res.status(200).json({ message: 'Logout successful' });
    });
  });
};