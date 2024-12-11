import express from 'express';
import { Server } from "socket.io";
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import chatRoutes from './routes/chat.route.js';
import messageRoutes from './routes/message.route.js';
import universityRoutes from './routes/university.route.js';
import passport from 'passport';
import './config/passport.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import reviewRoutes from './routes/review.route.js';
import s3Routes from './routes/s3.route.js';
import { initializeSocket } from './config/socketConfig.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ path: '../.env' });

const app = express();
const port = process.env.PORT || 8080;

// Create HTTP server
const httpServer = createServer(app);

// Connect to the database
connectDB();

// CORS configuration
app.use(cors({
  origin: [
    'https://campus-exchange-p0.onrender.com',
    'https://campus-exchange-p0-1.onrender.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.set('trust proxy', 1); // Trust the first proxy

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,           // Ensure HTTPS
    sameSite: 'none',       // Necessary for cross-site cookies
    domain: '.onrender.com',// Allow all subdomains
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  },
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions',
  }),
}));

// Middleware to log cookies
app.use((req, res, next) => {
  console.log('Cookies:', req.cookies);
  console.log('Session ID:', req.sessionID);
  console.log('Session Data:', req.session);
  next();
});

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/products', productRoutes);
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/chats', chatRoutes);
app.use('/messages', messageRoutes);
app.use('/api/universities', universityRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/s3', s3Routes);

// // Serve static files from the React app
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// app.use(express.static(path.join(__dirname, '../frontend/dist')));

// // Catch-all handler to serve the index.html file for all non-API routes
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
// });

// Start the server
const server = httpServer.listen(port, () => {
  console.log(`Server started at https://campus-exchange-p0.onrender.com`);
});

const io = new Server(server, { 
  cors: {
    origin: 'https://campus-exchange-p0-1.onrender.com',
    methods: ["GET", "POST"],
    credentials: true
  }
});

let onlineUsers = [];

io.on("connection", (socket) => {

    socket.on("addNewUser", (userId) => {
        !onlineUsers.some((user) => user.userId === userId) &&
        onlineUsers.push({
            userId,
            socketId: socket.id
        });

        io.emit("getOnlineUsers", onlineUsers);
    });

    socket.on("sendMessage", (message) => {
        const user = onlineUsers.find(user => user.userId === message.recipientId);

        if(user) {
            io.to(user.socketId).emit("getMessage", message);
            io.to(user.socketId).emit("getNotification", {
                senderId: message.senderId,
                isRead: false,
                date: new Date(),
                text: message.text,
                chatId: message.chatId
            });
        }
    });

    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id)

        io.emit("getOnlineUsers", onlineUsers);
    })
});