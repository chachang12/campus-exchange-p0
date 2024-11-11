import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Import cors
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import chatRoutes from './routes/chat.route.js';
import messageRoutes from './routes/message.route.js';
import universityRoutes from './routes/university.route.js'; // Import university routes
import passport from 'passport';
import './config/passport.js';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import session from 'express-session';
import User from './models/user.model.js';
import ratingRoutes from './routes/rating.route.js'; // Import rating routes


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

// Set COEP headers
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    next();
  });
  


app.use(
session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {secure: false}
})
);


app.use(passport.initialize());
app.use(passport.session());

app.use(express.json()); // Allows the server to accept JSON

// Proxy route for profile pictures
app.get('/proxy', async (req, res) => {
    const { url } = req.query;
    try {
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      res.set('Content-Type', response.headers['content-type']);
      res.send(response.data);
    } catch (error) {
      res.status(500).send('Error fetching image');
    }
  });

app.use('/api/products', productRoutes);
// app.use('/api/users', userRoutes);
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/chats', chatRoutes);
app.use('/messages', messageRoutes);
app.use('/api/universities', universityRoutes); 
app.use('/api/ratings', ratingRoutes);


app.listen(port, () => {
    console.log('Server started at http://localhost:' + port);

});