import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin.hook';
import GoogleLogin from '../components/GoogleLogin';
import { googlelogo } from '../assets';
import './WelcomePage.css'; 
import CXLogo from '../components/icons/logo';

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isLoading } = useLogin();

    const handleLogin = () => {
        window.location.href = 'http://localhost:8080/auth/google';
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen custom-bg">
            <CXLogo className='' width="100" height="100" fill="white" />
            <h1 className='text-white text-3xl'>
                Sign In
            </h1>
            <div className="rounded-lg shadow-md mt-4">
                <button onClick={handleLogin} className="">
                    <img src={googlelogo} alt="google" className="w-10 h-10" />
                </button>
            </div>
            
        </div>
    );
}

export default LoginPage;