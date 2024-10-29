import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { star } from '../assets';

const Profile = () => {
  // const { user } = useUser();

  // Static User Data for development
  const user = {
    firstName: 'Carson',
    lastName: 'Chang',
    email: 'cadchang@gmail.com',
    profilePicture: 'https://avatars.githubusercontent.com/u/136373179?v=4',
    listings: 5,
    rating: 4.5,
  };

  // State variables for listings and ratings
  const [listings, setListings] = useState([
    // Example listings
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
  ]);
  const [ratings, setRatings] = useState([
    // Example ratings
    { id: 1, reviewer: 'John Doe', comment: 'Great product!', rating: 5 },
    { id: 2, reviewer: 'Jane Smith', comment: 'Good value for money.', rating: 4 },
  ]);

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
            <h4 className=''>{user.listings}</h4>
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
          className={`py-2 px-4 rounded ${selectedTab === 'listings' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
          onClick={() => setSelectedTab('listings')}
        >
          Listings
        </button>
        <button
          className={`py-2 px-4 rounded ${selectedTab === 'ratings' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
          onClick={() => setSelectedTab('ratings')}
        >
          Ratings
        </button>
      </div>

      {/* Conditional content */}
      {selectedTab === 'listings' ? (
        <div>
          {listings.length > 0 ? (
            <div className='space-y-4'>
              {listings.map((listing) => (
                <div key={listing.id} className='p-4 bg-gray-800 rounded'>
                  <h3 className='text-lg font-bold'>{listing.name}</h3>
                  <p className='text-sm'>Price: ${listing.price}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No listings available.</p>
          )}
        </div>
      ) : (
        <div>
          {ratings.length > 0 ? (
            <div className='space-y-4'>
              {ratings.map((rating) => (
                <div key={rating.id} className='p-4 bg-gray-800 rounded'>
                  <h3 className='text-lg font-bold'>{rating.reviewer}</h3>
                  <p className='text-sm'>{rating.comment}</p>
                  <div className='flex'>
                    {Array.from({ length: rating.rating }).map((_, index) => (
                      <img key={index} src={star} alt="star" className='w-4 h-4 mr-1' />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No ratings available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;