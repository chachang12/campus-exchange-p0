import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRouter from './routes/authRoutes.js';
import productRoutes from './routes/product.route.js';
import userRoutes from './routes/user.route.js';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import session from 'express-session';
import User from './models/user.model.js';

dotenv.config(); // Initializes the dotenv configuration

const app = express(); // Initializes the express server
const port = process.env.PORT || 8080; // Sets the port to the environment variable PORT or 8080 if the environment variable is not set

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:8080/auth/google/callback',
            scope: ['profile', 'email'], // Ensure the email scope is included
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const user = await User.findOrCreate(profile);
                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

// Save the user in the session in a cookie
passport.serializeUser((user, done) => {
    done(null, user);
});

// Read the user out of the section from the cookie
passport.deserializeUser((user, done) => {
    done(null, user);
});

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 1000 * 60 * 60 }
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json()); // Allows the server to accept JSON objects in the request body (Middleware: functions that run before you send a response to the client)

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/profile');
    }
);

app.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
        res.send(`<h1>Profile</h1><pre>${JSON.stringify(req.user, null, 2)}</pre>`);
    } else {
        res.redirect('/');
    }
});

app.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('An error occurred: ' + err);
        }
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/v1/auth', authRouter); // <- NEW LINE

app.listen(port, () => {
    connectDB(); // Initializes the connection to the database
    console.log('Server started at http://localhost:' + port);
});