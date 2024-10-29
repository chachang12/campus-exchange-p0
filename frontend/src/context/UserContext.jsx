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
        const { data } = await axios.get('http://localhost:8080/user/current', { withCredentials: true });
        console.log('User data: ', data);
        setUser(data);
        Cookies.set('user', JSON.stringify(data), { expires: 7 }); // Store user session in cookies
      } catch (error) {
        setUser(null);
        Cookies.remove('user'); // Remove user session from cookies if fetch fails
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

  const login = async (credentials) => {
    try {
      const { data } = await axios.post('http://localhost:8080/auth/login', credentials, { withCredentials: true });
      setUser(data);
      Cookies.set('user', JSON.stringify(data), { expires: 7 }); // Store user session in cookies
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = async () => {
    try {
      await axios.get('http://localhost:8080/auth/logout', { withCredentials: true });
      setUser(null);
      Cookies.remove('user'); // Remove user session from cookies
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