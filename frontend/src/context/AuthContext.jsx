import { createContext, useContext, useReducer, useEffect } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

// Define initial state
const initialState = {
    user: null,
    isAuthenticated: false,
};

// Define reducer
const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                isAuthenticated: false,
            };
        default:
            return state;
    }
};

// AuthProvider component
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        // Checks if user is already logged in by checking local json storage
        const user = JSON.parse(localStorage.getItem('user'))
    
        if (user) {
          dispatch({ type: 'LOGIN', payload: user }) 
        }
    }, [])

    console.log('Authentication State:', state);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};