import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById } from '../utils/fetchUtils';
import { IoPersonCircleOutline } from 'react-icons/io5';
import ProductCard from '../components/ProductCard';
import { star } from '../assets';
import { Logo } from '../components/icons';
import { getProductsByCreatorId, getRatingsByUser } from '../utils/fetchUtils';

const OtherUserProfilePage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [listings, setListings] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [selectedTab, setSelectedTab] = useState('listings');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(userId);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    const fetchListings = async () => {
      try {
        const response = await getProductsByCreatorId(userId);
        setListings(response.data || []);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    const fetchRatings = async () => {
      try {
        const response = await getRatingsByUser(userId);
        setRatings(response.data || []);
      } catch (error) {
        console.error('Error fetching ratings:', error);
      }
    };

    fetchUser();
    fetchListings();
    fetchRatings();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

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
          <div className='w-10 h-10'></div>
        </div>
        <div className='flex flex-row items-center justify-center py-4'>
          {user.profilePicture ? (
            <img crossOrigin="anonymous" src={user.profilePicture} alt="Profile" className='w-[120px] h-[120px] object-cover object-center rounded-full outline outline-[1px] outline-gray-500' />
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
      <section className='mt-[270px]'>
        {selectedTab === 'listings' ? (
          <div>
            {listings.length > 0 ? (
              <div className='space-y-4'>
                {listings.map((product) => (
                  <ProductCard key={product._id} product={product} />
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

export default OtherUserProfilePage;