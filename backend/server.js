import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import passport from 'passport';
import { createServer } from 'http';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import chatRoutes from './routes/chat.route.js';
import messageRoutes from './routes/message.route.js';
import universityRoutes from './routes/university.route.js';
import './config/passport.js';
import reviewRoutes from './routes/review.route.js';
import s3Routes from './routes/s3.route.js';
import cors from 'cors';
import MongoStore from 'connect-mongo';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import initializeSocket from './config/socket.js'; // Use default import


dotenv.config();

// Determine the environment
const ENV = process.env.NODE_ENV || 'development';

// Set the path to the appropriate .env file within the backend directory
let envFile = './.env.development';
if (ENV === 'production') {
  envFile = './.env.production';
}

// Load environment variables from the specified .env file
dotenv.config({ path: './.env.production' });

console.log(`Running in ${ENV} mode`);
console.log('Loaded MONGO_URI:', process.env.MONGO_URI);

// Initialize Express app
const app = express();
const port = process.env.PORT || 8080;

// Create HTTP server
const httpServer = createServer(app);

// Connect to the database
connectDB();


// Middleware to parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Trust the first proxy (useful if behind a proxy like Nginx)
app.set('trust proxy', 1);


// Middleware to log cookies and session ID
app.use((req, res, next) => {
  // console.log('Cookies:', req.cookies);
  // console.log('Session ID:', req.session);
  next();
});

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false, // Do not save session if unmodified
  saveUninitialized: false, // Do not create session until something stored
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions',
  }),
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    sameSite: 'none', // Adjust based on your needs
    secure: true, // Use secure cookies in production
  }
}));

// Initialize Passport for authentication
app.use(passport.initialize());
app.use(passport.session());


app.use(cors({
  origin: process.env.VITE_CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Prefix all API routes with /api/
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/products', productRoutes);
app.use('/api/universities', universityRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/s3', s3Routes);


// Start the server
const server = httpServer.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// Initialize Socket.io
initializeSocket(httpServer);
