import express from 'express';
import { Server } from "socket.io"
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
import reviewRoutes from './routes/review.route.js';
import s3Routes from './routes/s3.route.js';
import { initializeSocket } from './config/socketConfig.js';

dotenv.config({ path: '../.env' });

const app = express();
const port = process.env.PORT || 8080;

// Create HTTP server
const httpServer = createServer(app);

// Connect to the database
connectDB();

// app.use(cors({
//   origin: 'https://localhost:5173',
//   methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
//   allowedHeaders: ['Content-Type', 'Access-Control-Allow-Credentials'],
//   credentials: true,
// }));

const allowedOrigins = [
    'http://localhost:5173',
    'https://localhost:5173',
    'https://campus-exchange-p0.onrender.com',
  ];
  
  app.use(
    cors({
      origin: function (origin, callback) {
        if (allowedOrigins.includes(origin) || !origin) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );

app.use(express.json());

// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: true,
//   saveUninitialized: true,
//   cookie: { secure: false },
// }));


// app.set('trust proxy', 1); // Trust the first proxy

app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
      cookie: {
        secure: true,      // Ensure the browser only sends the cookie over HTTPS
        sameSite: 'none',  // Allow sending cookies in cross-origin requests
      },
    })
  );

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

// Start the server
const server = httpServer.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

const io = new Server(server, { cors: "https://localhost:5173" });

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

//add message

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