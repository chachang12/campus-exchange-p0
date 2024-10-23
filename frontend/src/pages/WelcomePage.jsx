import React from 'react';
import { Link } from 'react-router-dom';
import CXLogo from '../components/icons/logo';
import './WelcomePage.css'; 
import rightarrow from '../assets/rightarrow.png';

const WelcomePage = () => {
  return (
    <div className='flex flex-col items-center min-h-screen custom-bg justify-between text-white'>
        <div className='mt-20'>
            <CXLogo className='' width="100" height="100" fill="white" />
            <div>
                <h1 className='text-3xl mt-4 font-light'>Welcome to</h1>
                <h1 className='text-3xl'>Campus Exchange</h1>
            </div>
            
        </div>
        <div className='flex flex-row gap-2 mb-20'>
            <Link to='/login' className='flex flex-row gap-2 border-white px-6 py-2 rounded-full border-2'>
                <button className=''>
                    Get started
                </button>
                <img src={rightarrow} alt='rightarrow' className='w-6 h-6'/>
            </Link>
        </div>
    </div>
  );
}

export default WelcomePage;