import React from 'react';
import { Link } from 'react-router-dom';
import CXLogo from '../components/icons/Logo';
import './WelcomePage.css'; 
import googlelogo from '../assets/google.png';

const LoginPage = () => {

    const handleLogin = () => {
        // window.location.href = 'http://localhost:8080/auth/google';
        window.location.href = 'https://campus-exchange-p0.onrender.com/api/auth/google';
    };

    return (
        <div className='flex flex-col items-center min-h-screen custom-bg justify-between text-white'>
            <div className='mt-20 w-[80%]'>
                <CXLogo className='' width="100" height="100" fill="white" />
                <div>
                    <h1 className='text-3xl mt-4'>Sign In</h1>
                    {/* <h1 className='text-3xl'>Campus Exchange</h1> */}
                </div>
            </div>
            <div className='flex flex-row gap-2 mb-20'>
                <button onClick={handleLogin} className='flex flex-row gap-2 border-white px-8 py-4 rounded-full border-[0.5px]'>
                    <img src={googlelogo} alt="google" className="w-6 h-6" />
                    <h1>Login with Google</h1>
                </button>
            </div>
        </div>
    );
}

export default LoginPage;