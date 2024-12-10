// middleware/authMiddleware.js
export const ensureAuthenticated = (req, res, next) => {
  console.log('Session:', req.session);
  console.log('Session ID:', req.sessionID);
  console.log('User:', req.user);
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized. Please log in.' });
};
