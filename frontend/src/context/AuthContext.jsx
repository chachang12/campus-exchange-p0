// AuthContext.js
import { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const initialState = {
    user: null,
    isAuthenticated: false,
};

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload, isAuthenticated: true };
        case 'LOGOUT':
            return { ...state, user: null, isAuthenticated: false };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Check if user is already logged in
    useEffect(() => {
        const fetchUser = async () => {
            console.log('Checking user session...');
            try {
                // const response = await axios.get('http://localhost:8080/auth/login/success', {
                const response = await axios.get('https://campus-exchange-p0.onrender.com/auth/login/success', {
                    withCredentials: true,
                });
                if (response.data.user) {
                    console.log('User data: ', response.data.user);
                    dispatch({ type: 'LOGIN', payload: response.data.user });
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                }
            } catch (error) {
                console.error('Failed to fetch authenticated user:', error);
            }
        };

        // Check local storage or backend session
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            dispatch({ type: 'LOGIN', payload: storedUser });
        } else {
            fetchUser();
        }
    }, []);

    const logout = async () => {
        try {
            await axios.get('http://localhost:8080/auth/logout', { withCredentials: true });
            // await axios.get('https://campus-exchange-p0.onrender.com/auth/logout', { withCredentials: true });
            localStorage.removeItem('user');
            dispatch({ type: 'LOGOUT' });
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ ...state, dispatch, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
