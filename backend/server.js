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

dotenv.config();

// Determine the environment
const ENV = process.env.NODE_ENV || 'development';

// Set the path to the appropriate .env file within the backend directory
let envFile = './.env.development';
if (ENV === 'production') {
  envFile = './.env.production';
}

// Load environment variables from the specified .env file
dotenv.config({ path: envFile });

console.log(`Running in ${ENV} mode`);
console.log('Loaded MONGO_URI:', process.env.MONGO_URI);

console.log(process.env.CLIENT_BASE_URL_FTB);

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
  // cookie: {
  //   maxAge: 24 * 60 * 60 * 1000, // 1 day
  //   sameSite: 'none',
  //   secure: true,
  // }
}));

// app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));

// Initialize Passport for authentication
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
  origin: [ 'http://localhost:5173', 'http://localhost:8080' ],
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

const __dirname = path.resolve();

// Adjust the path to serve static files from the correct location
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Catch-all handler to serve index.html for any route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});



// Start the server
const server = httpServer.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// Initialize Socket.io
initializeSocket(httpServer);