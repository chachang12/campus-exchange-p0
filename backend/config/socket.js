import { Server } from 'socket.io';
import dotenv from 'dotenv';

const ENV = process.env.NODE_ENV || 'development';
let envFile = './.env.development';
if (ENV === 'production') {
  envFile = './.env.production';
}
dotenv.config({ path: envFile });

const initializeSocket = (server) => {
  const io = new Server(server, { 
    cors: {
      origin: process.env.CLIENT_BASE_URL_FTB,
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  let onlineUsers = [];

  io.on("connection", (socket) => {
    socket.on("addNewUser", (userId) => {
      if (!onlineUsers.some((user) => user.userId === userId)) {
        onlineUsers.push({
          userId,
          socketId: socket.id
        });
      }

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
    });
  });
};

export default initializeSocket;