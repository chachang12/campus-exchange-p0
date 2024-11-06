import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { IoMenu, IoPersonCircleOutline } from 'react-icons/io5';
import { IoIosMenu } from "react-icons/io";
import { getProductsByCreatorId, updateProduct } from '../utils/fetchUtils';
import ProductCard from '../components/ProductCard';
import { star } from '../assets';
import { Logo } from '../components/icons';


const Profile = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [ratings, setRatings] = useState([
    { id: 1, reviewer: 'John Doe', comment: 'Great product!', rating: 5 },
    { id: 2, reviewer: 'Jane Smith', comment: 'Good value for money.', rating: 4 },
  ]);
  const [selectedTab, setSelectedTab] = useState('listings');

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await getProductsByCreatorId(user._id);
        console.log('Listings:', response.data);
        setListings(response.data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, [user]);

  const handleMarkAsSold = async (productId) => {
    try {
      const updatedProduct = { isSold: true };
      await updateProduct(productId, updatedProduct);
      setListings(listings.filter((product) => product._id !== productId));
    } catch (error) {
      console.error('Error marking product as sold:', error);
    }
  };

  const flooredRating = Math.floor(user.rating);

  return (
    <div className='mx-4 text-white flex flex-col pb-40 pt-4'>
      <section className='fixed top-0 left-0 right-0 z-10 bg-[#121212] pt-4'>
        <div className="flex flex-row mb-2 justify-between items-center mx-4">
          <div className=''>
            <Logo fill={'white'} width={40} height={40}/>
          </div>
          
          <h1 className='text-center justify-center text-xl font-semibold mx-auto'>
              Profile
          </h1>
          <button className='w-10 h-10 bg-[#1F1F1F] rounded-full flex items-center justify-center outline outline-1 outline-gray-500' onClick={() => navigate('/profile-menu')}>
            <IoIosMenu size={30} />
          </button>
        </div>
        <div className='flex flex-row items-center justify-center py-4'>
          {user.profilePicture ? (
            <img crossOrigin="anonymous" src={user.profilePicture} alt="Profile" className='rounded-full w-[120px] outline outline-[1px] outline-gray-500' />
          ) : (
            <IoPersonCircleOutline size={150} />
          )}
          <div className='flex-col ml-4'>
            <h1 className='text-white font-semibold text-xl'>{user.firstName}</h1>
            <div className='flex flex-row'>
              <h4 className=''>{listings.length}</h4>
              <h4 className='font-light ml-1 opacity-60'> listings</h4>
            </div>
            <div className='flex flex-row items-center'>
              {Array.from({ length: flooredRating }).map((_, index) => (
                <img key={index} src={star} alt="star" className='w-4 h-4 mr-1' />
              ))}
            </div>
          </div>
        </div>

        {/* Tab bar */}
        <div className='flex justify-center space-x-4 mb-4'>
          <button
            className={`py-2 px-4 rounded-3xl ${selectedTab === 'listings' ? 'bg-white text-black' : 'bg-[#1F1F1F] text-white outline outline-[1px] outline-gray-500'}`}
            onClick={() => setSelectedTab('listings')}
          >
            Listings
          </button>
          <button
            className={`py-2 px-4 rounded-3xl ${selectedTab === 'ratings' ? 'bg-white text-black' : 'bg-[#1F1F1F] text-white outline outline-[1px] outline-gray-500'}`}
            onClick={() => setSelectedTab('ratings')}
          >
            Ratings
          </button> 
        </div>
      </section>
      

      {/* Conditional content */}
      <section className='mt-[250px]'>
        {selectedTab === 'listings' ? (
          <div>
            {listings.length > 0 ? (
              <div className='space-y-4'>
                {listings.map((product) => (
                  <ProductCard key={product._id} product={product} showButtons={true} onMarkAsSold={handleMarkAsSold} />
                ))}
              </div>
            ) : (
              <p>No listings found.</p>
            )}
          </div>
        ) : (
          <div>
            {ratings.length > 0 ? (
              <div className='space-y-4'>
                {ratings.map((rating) => (
                  <div key={rating.id} className='bg-white bg-opacity-5 p-4 rounded-xl'>
                    <p className='font-semibold'>{rating.reviewer}</p>
                    <p>{rating.comment}</p>
                    <div className='flex'>
                      {Array.from({ length: rating.rating }).map((_, index) => (
                        <img key={index} src={star} alt="star" className='w-4 h-4 mr-1' />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No ratings found.</p>
            )}
          </div>
        )}
      </section>
      
    </div>
  );
};

export default Profile;