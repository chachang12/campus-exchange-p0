import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import ProductCard from '../components/ProductCard';
import { star } from '../assets';
import { getProductsByCreatorId } from '../utils/fetchUtils';

const Profile = () => {
  const { user, logout } = useUser();
  // const { user } = useUser();
  // const { logout } = useUser();

    

  // State variables for listings and ratings
  const [listings, setListings] = useState([]);
  const [ratings, setRatings] = useState([
    // Static Review Data
    { id: 1, reviewer: 'John Doe', comment: 'Great product!', rating: 5 },
    { id: 2, reviewer: 'Jane Smith', comment: 'Good value for money.', rating: 4 },
  ]);


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


  // State variable to track the selected tab
  const [selectedTab, setSelectedTab] = useState('listings');

  // Floor the rating
  const flooredRating = Math.floor(user.rating);

  return (
    <div className='mx-4 text-white'>
      <div className='flex flex-row items-center py-4'>
        <img crossOrigin="anonymous" src={user.profilePicture} alt="Profile" className='rounded-full w-[150px]'/>
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
          className={`py-2 px-4 rounded-3xl ${selectedTab === 'listings' ? 'bg-white text-black' : 'bg-implicit text-white outline outline-1 outline-white'}`}
          onClick={() => setSelectedTab('listings')}
        >
          Listings
        </button>
        <button
          className={`py-2 px-4 rounded-3xl ${selectedTab === 'ratings' ? 'bg-white text-black' : 'bg-implicit text-white outline outline-1 outline-white'}`}
          onClick={() => setSelectedTab('ratings')}
        >
          Ratings
        </button>
        {/* Logout Button */}
      
        <button
          className='py-2 px-4 bg-red-500 text-white rounded-3xl'
          onClick={logout}
        >
          Logout
        </button>
      
      </div>

      {/* Conditional content */}
      {selectedTab === 'listings' ? (
        <div>
          {listings.length > 0 ? (
            <div className='space-y-4'>
              {listings.map((product) => (
                <ProductCard key={product._id} product={product} showButtons={true} />
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
      
    </div>
  );
};

export default Profile;