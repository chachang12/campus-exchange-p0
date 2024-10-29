import React, { useState } from 'react';
import { googlelogo } from '../assets';
import './WelcomePage.css'; 
import CXLogo from '../components/icons/Logo';

export const LoginPage = () => {

    const handleLogin = () => {
        window.location.href = 'http://localhost:8080/auth/google';
    };

    return (
        <div className="flex flex-col items-center justify-between min-h-screen custom-bg">
            <div className='my-20'>
                <CXLogo className='' width="100" height="100" fill="white" />
            </div>

            <div className='bg-white w-full flex-grow rounded-t-[40px] backdrop-blur-md flex flex-col items-center justify-start bg-opacity-5'>
                <h1 className='text-white text-3xl mt-20 mb-6 weight font-semibold'>
                    Sign In
                </h1>
                <div className="">
                    <button onClick={handleLogin} className="">
                        <img src={googlelogo} alt="google" className="w-20 h-20" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;