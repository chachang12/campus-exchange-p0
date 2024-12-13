// frontend/src/context/UserContext.jsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const UserContext = createContext();

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // Ensure cookies are sent with requests
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/auth/check");
        const data = await res.data;
        setUser(data.user);
      } catch (error) {
        console.log("Check user logged in error:", error);
      } finally {
        setLoading(false);
      }
    };
    checkUserLoggedIn();
  }, []);

  const login = async () => {
    window.location.href = '/auth/google';
  };

  const logout = async () => {
    try {
      await axiosInstance.get('/auth/logout');
      setUser(null);
      Cookies.remove('user');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, loading, checkUserLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);