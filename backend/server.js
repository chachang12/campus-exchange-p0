import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Import cors
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import passport from 'passport';
import './config/passport.js';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import session from 'express-session';
import User from './models/user.model.js';

dotenv.config(); // Initializes the dotenv configuration

const app = express(); // Initializes the express server
const port = process.env.PORT || 8080; // Sets the port to the environment variable PORT or 8080 if the environment variable is not set

// Connect to the database
connectDB(); // Initializes the connection to the database


app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Access-Control-Allow-Credentials'],
    credentials: true // mandoatory for google auths
}));


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

app.use(express.json()); // Allows the server to accept JSON

app.use('/api/products', productRoutes);
// app.use('/api/users', userRoutes);
app.use('/user', userRoutes);
app.use('/auth', authRoutes); // Use the new auth routes

app.listen(port, () => {
    console.log('Server started at http://localhost:' + port);

});