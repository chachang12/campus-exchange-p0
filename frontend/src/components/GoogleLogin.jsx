// GoogleLogin.js
import React, { useContext } from 'react';
import { googlelogo } from '../assets';
import { AuthContext } from '../context/AuthContext';

const GoogleLogin = () => {
    const { isAuthenticated } = useContext(AuthContext);

    const handleLogin = () => {
        window.location.href = 'http://localhost:8080/auth/google';
    };

    return (
        <button onClick={handleLogin} className="">
            <img src={googlelogo} alt="google" className="w-10 h-10" />
        </button>
    );
};

export default GoogleLogin;
