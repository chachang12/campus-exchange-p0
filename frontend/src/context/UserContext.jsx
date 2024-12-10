// frontend/src/context/UserContext.jsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('https://campus-exchange-p0.onrender.com/user/current', {
          withCredentials: true,
        });
        if (response.data) {
          setUser(response.data);
          Cookies.set('user', JSON.stringify(response.data), { expires: 7, secure: true, sameSite: 'None' });
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
        Cookies.remove('user');
      } finally {
        setLoading(false);
      }
    };
  
    const storedUser = Cookies.get('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
    } else {
      fetchUser();
    }
  }, []);

  const login = async () => {
    // Redirect to Google OAuth
    window.location.href = 'https://campus-exchange-p0.onrender.com/auth/google';
  };

  const logout = async () => {
    try {
      await axios.get('https://campus-exchange-p0.onrender.com/auth/logout', { withCredentials: true });
      setUser(null);
      Cookies.remove('user');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);