import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { AuthContextProvider } from './context/AuthContext';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from './context/UserContext';


createRoot(document.getElementById('root')).render(
  <StrictMode>
      {/* <AuthContextProvider> */}
      <UserProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserProvider>
      {/* </AuthContextProvider> */}
  </StrictMode>
);