import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import ProductCard from '../components/ProductCard';
import { star } from '../assets';

const Profile = () => {
  const { user, logout } = useUser();
  console.log('User:', user);
  // const { user } = useUser();
  // const { logout } = useUser();

  // Static User Data for development
  // const user = {
  //   _id: '1',
  //   firstName: 'Carson',
  //   lastName: 'Chang',
  //   email: 'cadchang@gmail.com',
  //   profilePicture: 'https://avatars.githubusercontent.com/u/136373179?v=4',
  //   listings: 5,
  //   rating: 4.5,
  // };

  

  // State variables for listings and ratings
  const [listings, setListings] = useState([
    // Example listings
    {
      _id: "1",
      name: "Kith Seoul Hoodie",
      category: "Clothing",
      image: "https://eu.kith.com/cdn/shop/files/KHM032123-001-FRONT.jpg?v=1716536682&width=1920",
      price: 80.00,
      size: "M",
      condition: "New",
      description: "Kith Seoul Hoodie in Black. Made from 100% cotton, this hoodie features a kangaroo pocket, a drawstring hood, and a Kith logo on the chest. The hoodie is in new condition and has never been worn. Size M.",
    },
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