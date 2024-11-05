import passport from 'passport';

export const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

export const googleAuthCallback = passport.authenticate('google', { failureRedirect: '/' });

export const googleAuthRedirect = (req, res) => {
    res.redirect('http://localhost:5173/profile');
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
        res.clearCookie('connect.sid'); // Adjust the cookie name if necessary
        res.status(200).json({ message: 'Logout successful' });
      });
    });
  };

