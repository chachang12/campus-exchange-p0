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
import {RedisStore} from "connect-redis"
import { createClient } from 'redis';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import initializeSocket from './config/socket.js';

// Load environment variables from the specified .env file
dotenv.config({ path: './.env.production' });

console.log(`Running in PRODUCTION mode`);
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

// Create Redis client
const redisClient = createClient({ url: process.env.REDIS_URL });
redisClient.connect().catch(console.error);

// Use Redis for session storage
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({ client: redisClient }),
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    sameSite: 'none',
    secure: true,
    domain: 'onrender.com'
  }
}));

// Initialize Passport for authentication
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
  origin: process.env.CLIENT_BASE_URL,
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
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