// frontend/src/context/UserContext.jsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const UserContext = createContext();

// Create an Axios instance with baseURL set to '/'
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Relative base URL
  withCredentials: true, // Ensure cookies are sent with requests
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkUserLoggedIn = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('/auth/check'); // Updated to include /api/
      const data = res.data;
      setUser(data.user);
      if (data.user) {
        Cookies.set('user', JSON.stringify(data.user), { expires: 7, secure: true, sameSite: 'None' });
      }
    } catch (error) {
      console.error('Error checking user:', error);
      setUser(null);
      Cookies.remove('user');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedUser = Cookies.get('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
    } else {
      checkUserLoggedIn();
    }
  }, []);

  const login = async () => {
    // Redirect to Google OAuth using relative path with /api/
    window.location.href = '/api/auth/google';
  };

  const logout = async () => {
    try {
      await axiosInstance.get('/auth/logout'); // Updated to include /api/
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