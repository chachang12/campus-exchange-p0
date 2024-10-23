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

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen custom-bg">
            <CXLogo className='' width="100" height="100" fill="white" />
            <h1 className='text-white text-3xl'>
                Sign In
            </h1>
            <div className="rounded-lg shadow-md mt-4">
                <GoogleLogin />
            </div>
            <form className="p-8 rounded-lg shadow-md" onSubmit={handleSubmit}>
                <h1 className="text-2xl font-bold mb-6 text-center">
                    
                </h1>
                <div className="form-group mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="form-group mb-6">
                    <label htmlFor="password" className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button disabled={isLoading} type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Login
                </button>
                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </form>
        </div>
    );
}

export default LoginPage;