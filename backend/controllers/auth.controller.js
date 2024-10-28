// import passport from 'passport';

// export const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

// export const googleAuthCallback = passport.authenticate('google', { failureRedirect: '/' });

// export const googleAuthRedirect = (req, res) => {
//     if (req.isAuthenticated()) {
//         res.json({
//             user: req.user,
//             message: 'Successfully authenticated with Google',
//         });
//     } else {
//         res.status(401).json({ message: 'Authentication failed' });
//     }
// };

// export const getProfile = (req, res) => {
//     if (req.isAuthenticated()) {
//         res.json(req.user); // Send user data as JSON
//     } else {
//         res.status(401).json({ message: 'Unauthorized' });
//     }
// };

// export const logout = (req, res) => {
//     req.logout();
//     req.session.destroy((err) => {
//         if (err) {
//             console.log(err);
//             return res.status(500).send('An error occurred: ' + err);
//         }
//         res.clearCookie('connect.sid');
//         res.redirect('/');
//     });
// };

// export const loginSuccess = (req, res) => {
//     res.status(200).json({
//         success: true,
//         message: "successfull",
//         user: req.user,
//         corrId: req.headers['x-correlation-id']
//     })
// };

// export const loginFailure = (req, res) => {
//     res.status(401).json({
//         success: false,
//         message: "failed",
//     })
// }

import passport from 'passport';

export const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

export const googleAuthCallback = passport.authenticate('google', { failureRedirect: '/' });

export const googleAuthRedirect = (req, res) => {
    res.redirect('http://localhost:5173/profile');
};

export const logout = (req, res) => {
    req.logout();
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('An error occurred: ' + err);
        }
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
};


// export const loginSuccess = (req, res) => {
//     if (req.isAuthenticated()) {
//         res.json({
//             user: req.user,
//             message: 'Successfully authenticated with Google',
//         });
//     } else {
//         res.status(401).json({ message: 'Authentication failed' });
//     }
// };

// export const getProfile = (req, res) => {
//     if (req.isAuthenticated()) {
//         res.json(req.user); // Send user data as JSON
//     } else {
//         res.status(401).json({ message: 'Unauthorized' });
//     }
// };
// export const loginFailure = (req, res) => {
//     res.status(401).json({
//         success: false,
//         message: "failed",
//     })
// }