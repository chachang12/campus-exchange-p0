import { createContext, useState, useEffect, useCallback } from "react";

import { getProductById } from "../utils/fetchUtils";
import { io } from "socket.io-client";
import axios from 'axios';

export const ChatContext = createContext();
const axiosInstance = axios.create({
  // baseURL: 'http://localhost:8080',
  // baseURL: 'https://campus-exchange-p0.onrender.com',
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // Ensure cookies are sent with requests
});



export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState([]);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState(null);
  const [sendTextMessageError, setSendTextMessageError] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [socket, setSocket] = useState(null);
  const [product, setProduct] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]); // Define onlineUsers state
  const [notifications, setNotifications] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    try {
      const newSocket = io(import.meta.env.VITE_SOCKET_URL, {
        reconnectionAttempts: 1,
        timeout: 10000,
      });
  
      newSocket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
        setSocket(null);
      });
  
      newSocket.on("connect_failed", () => {
        console.error("Socket connection failed");
        setSocket(null);
      });
  
      setSocket(newSocket);
  
      return () => {
        newSocket.disconnect();
      };
    } catch (error) {
      console.error("Error initializing socket:", error);
    }
  }, [user]);

    // Very much required but theres got to be a better or more defined way to do this. Maybe query for smth more specific than all users.
  useEffect(() => {
    const getUsers = async () => {
      const response = await axiosInstance.get(`/user/GetAllUsers`);
      if (response.error) {
        return console.log("Error fetching users", response);
      }

      const pChats = response.data.filter((u) => {
        let isChatCreated = false;
        if (user?._id === u._id) return false;

        if (userChats) {
          isChatCreated = userChats?.some((chat) => {
            return chat.members[0] === u._id || chat.members[1] === u._id;
          });
        }

        return !isChatCreated;
      });
      setPotentialChats(pChats);

      setAllUsers(response.data);

    };

    getUsers();
  }, [userChats]);

  useEffect(() => {
    const getUserChats = async () => {
      const chatsResponse = await axiosInstance.get(`/chats/${user?._id}`);
      const userChats = chatsResponse.data;
 
 
      const chatsWithRecentMessages = await Promise.all(
          userChats.map(async (chat) => {
              const recentMessageResponse = await axiosInstance.get(`/messages/${chat?._id}/recent`);
              return {
                  ...chat,
                  recentMessage: recentMessageResponse.data, // Assuming the API returns the most recent message
              };
          })
      );
 
 
      // Step 3: Sort chats based on the recent message's timestamp
      const sortedChats = chatsWithRecentMessages.sort((a, b) => {
          const timeA = new Date(a.recentMessage.data.createdAt); // Adjust key if API response differs
          const timeB = new Date(b.recentMessage.data.createdAt);
          return timeB - timeA; // Newest first
      });
 
 
      setUserChats(sortedChats);
    }
    getUserChats();
  }, [user, newMessage, notifications])

  useEffect(() => {
    const getMessages = async () => {
      setIsMessagesLoading(true);
      setMessagesError(null);

      const response = await axiosInstance.get(`/messages/${currentChat?._id}`);

      setIsMessagesLoading(false);

      if (response.error) {
        return setMessagesError(response);
      }


      setMessages(response.data);
    };
    getMessages();
  }, [currentChat]);

  const fetchUnreadMessages = async (chatId) => {
    try {
        const response = await axiosInstance.get(`/messages/${chatId}`);
        return response.data.filter(message => !message.isRead);
    } catch (error) {
        console.error(`Error fetching unread messages for chat ${chatId}: `, error);
        return [];
    }
};

  useEffect(() => {
    const getNotifications = async () => {
      const response = await axiosInstance.get(`/chats/${user?._id}`);
      const unreadMessagesPromises = response.data.map(chat => fetchUnreadMessages(chat._id));
      const allUnreadMessages = await Promise.all(unreadMessagesPromises);

      const flattenedUnreadMessages = allUnreadMessages.flat();
      setNotifications(flattenedUnreadMessages);
    };
  
    getNotifications();
  }, [user]);
  
  useEffect(() => {
    const fetchProduct = async () => {
      if (currentChat?.productId) {
        try {
          const productData = await getProductById(currentChat.productId);
          setProduct(productData);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      }
    };

    fetchProduct();
  }, [currentChat]);

  const sendTextMessage = useCallback(
    async (textMessage, sender, currentChatId, setTextMessage) => {
      if (!textMessage) return console.log("You must type something...");

      const response = await axiosInstance.post(
        `/messages`,
        {
          chatId: currentChatId,
          senderId: sender._id,
          text: textMessage,
          isRead: false
        }
      );

      if (response.error) {
        return setSendTextMessageError(response);
      }

      setNewMessage(response.data);
      setMessages((prev) => [...prev, response.data]);
      setTextMessage("");
    },
    []
  );

  useEffect(() => {
    if (socket === null) return;
    socket.emit("addNewUser", user?._id);

    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    });

    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket]);

  //send message
  useEffect(() => {
    if (socket === null) return;

    const recipientId = currentChat?.members.find((id) => id !== user?._id);

    socket.emit("sendMessage", { ...newMessage, recipientId });
  }, [newMessage]);

  //receive message and notification
  useEffect(() => {
    if (socket === null) return;

    socket.on("getMessage", (res) => {
      if (currentChat?._id !== res.chatId) return;

      setMessages((prev) => [...prev, res]);
    });

    socket.on("getNotification", (res) => {
      const isChatOpen = currentChat?.members.some(id => id === res.senderId);

      if (isChatOpen)
      {
        setNotifications(prev => [{...res, isRead:true}, ...prev])
      }
      else
      {
        setNotifications(prev => [res, ...prev])
      }
    });

    return () => {
      socket.off("getMessage");
      socket.off("getNotification");
    };

  }, [socket, currentChat, newMessage]);


  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);

  const createChat = useCallback(async (firstId, secondId, productId) => {

    const response = await axiosInstance.post(
      `/chats`,
      { firstId, secondId, productId }

    );

    if (response.error) {
      return console.log("Error creating chat", response);
    }

    setUserChats((prev) => [...prev, response]);
  }, []);

  const markAllNotificationsAsRead = useCallback(async (notifications) => {
    try {
      const response = await axiosInstance.patch('/messages/read', {
        messageIds: notifications.map((n) => n._id),
      });

      const mNotifications = notifications.map((n) => {
        return { ...n, isRead: true}
      });
      setNotifications(mNotifications);
    } catch (error) {
      console.error('Error marking notifications as read:', error);
    }

  }, []);

  const markNotificationAsRead = useCallback((n, userChats, user, notifications) => {
    const desiredChat = userChats.find(chat => {
      const chatMembers = [user._id, n.senderId]
      const isDesiredChat = chat?.members.every((member) => {
        return chatMembers.includes(member);
      });

      return isDesiredChat;
    });

    //mark notification as read
    const mNotifications = notifications.map(el => {
      if(n.senderId === el.senderId) {
        return {...n, isRead: true}
      }
      else{
        return el
      }
    })

    updateCurrentChat(desiredChat);
    setNotifications(mNotifications);
  }, []);

  const markThisUserNotificationsAsRead = useCallback(async (thisUserNotifications, notifications) => {
    const messageIds = notifications
    .filter(n => thisUserNotifications.some(u => u.senderId === n.senderId)) // Filter notifications based on senderId
    .map(n => n._id);

    if (messageIds.length > 0) {
      try {
        const response = await axiosInstance.patch('/messages/read', {
          messageIds: messageIds,
        });
        
      const mNotifications = notifications.map(el => {
        let notification;
  
        thisUserNotifications.forEach(n => {
          if (n.senderId === el.senderId) {
            notification = {...n, isRead: true}
          }
          else {
            notification = el
          }
        })
  
        return notification
      })
      setNotifications(mNotifications);
      } catch (error) {
        console.error('Error marking notifications as read:', error);
      }
    }
  }, []);

  const markThisChatNotificationsAsRead = useCallback(async (thisUserNotifications, notifications) => {
    const messageIds = notifications
    .filter(n => thisUserNotifications.some(u => u.senderId === n.senderId)) // Filter notifications based on senderId
    .map(n => n._id);

    if (messageIds.length > 0) {
      try {
        const response = await axiosInstance.patch('/messages/read', {
          messageIds: messageIds,
        });
        
      const mNotifications = notifications.map(el => {
        let notification;
  
        thisUserNotifications.forEach(n => {
          if (n.senderId === el.senderId && n.chatId === el.chatId) {
            notification = {...n, isRead: true}
          }
          else {
            notification = el
          }
        })
  
        return notification
      })
      setNotifications(mNotifications);
      } catch (error) {
        console.error('Error marking notifications as read:', error);
      }
    }
  }, []);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
        updateCurrentChat,
        messages,
        isMessagesLoading,
        currentChat,
        messagesError,
        sendTextMessage,
        onlineUsers,
        product,
        notifications,
        allUsers,
        markAllNotificationsAsRead,
        markNotificationAsRead,
        markThisUserNotificationsAsRead,
        markThisChatNotificationsAsRead,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};