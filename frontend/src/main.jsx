import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { AuthContextProvider } from './context/AuthContext';
import { GoogleOAuthProvider } from "@react-oauth/google";


// const clientId = process.env.GOOGLE_CLIENT_ID;

const clientId = '632110188324-f9bujqcc2ea83bp50dhl5v9miube7p88.apps.googleusercontent.com';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <AuthContextProvider>
        <BrowserRouter>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </BrowserRouter>
      </AuthContextProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);