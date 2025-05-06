import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { IoMenu, IoPersonCircleOutline } from 'react-icons/io5';
import { IoIosMenu } from "react-icons/io";
import { getProductsByCreatorId, updateProduct, getReviewsByUser } from '../utils/fetchUtils';
import ProductCard from '../components/ProductCard';
import { star } from '../assets';
import { Logo } from '../components/icons';
import RatingStars from '../components/RatingStars';
import { Link } from 'react-router-dom';
import { IoGrid } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";
import { getFavorites } from '../utils/fetchUtils';



const Profile = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedTab, setSelectedTab] = useState('listings');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await getProductsByCreatorId(user._id);
        console.log('Listings:', response.data);
        setListings(response.data || []);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await getReviewsByUser(user._id);
        setReviews(response || []);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    const fetchFavorites = async () => {
      try {
        const response = await getFavorites(user._id);
        setFavorites(response.data || []);
        console.log('Favorites:', response.data); // Add this line to log the fetched favorites
      } catch (error) {
        console.error('Error fetching favorites:', error);
        setError('Failed to fetch favorite products.');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
    fetchListings();
    fetchReviews();
  }, [user]);

  console.log('User:', user);

  const handleMarkAsSold = async (productId) => {
    try {
      const updatedProduct = { isSold: true };
      await updateProduct(productId, updatedProduct);
      setListings(listings.filter((product) => product._id !== productId));
    } catch (error) {
      console.error('Error marking product as sold:', error);
    }
  };

  const flooredReview = Math.floor(user.review);

  return (
    <div className='mx-2 text-white flex flex-col'>
      

      <section className='flex justify-center'>
        <div className='w-full sm:w-[1280px]'>
        <section className='bg-[#121212]'>
        <div className='flex justify-end space-x-8 mt-2'>
          <button
            className={`flex items-center text-sm text-[#426A8C]`}
            onClick={() => navigate('/profile-menu')}
          >
            Edit Profile
            <MdKeyboardArrowRight size={20}/>
          </button>
        </div>
      </section>
          <div className='flex flex-row items-center justify-center md:justify-start pl-2 py-4'>
              {user.profilePicture ? (
                <img src={user.profilePicture} alt="Profile" className='w-[120px] h-[120px] object-cover object-center rounded-full outline outline-[1px] outline-gray-500' />
              ) : (
                <IoPersonCircleOutline size={150} />
              )}
              <div className='flex-col ml-4'>
                <h1 className='text-white font-semibold text-xl sm:text-2xl'>{user.firstName}</h1>
                <h1 className='text-white text-s sm:text-s'>{user.university}</h1>
                <div className='flex gap-1 items-center'>
                  <RatingStars rating={Math.floor(user.review)} /> <div className='text-sm'>({reviews.length})</div>
                </div>
                <div className='flex flex-row pt-1'>
                  <h4 className=''>{listings.length}</h4>
                  <h4 className='font-light ml-1'> listings</h4>
                </div>
              </div>
            </div>

            <div className='flex space-x-4 mb-4 px-4 justify-center md:justify-start'>{user.bio || user.bio != '' ? (
              <p>{user.bio}</p>
            ) : (
              <></>
            )}
            </div>

            {/* Tab bar */}
            <div className='flex space-x-4 mb-4 px-4 justify-center md:justify-start'>
              <button
                className={`py-2 px-4 rounded-3xl ${selectedTab === 'listings' ? 'bg-white text-black' : 'bg-[#1F1F1F] text-white outline outline-[1px] outline-gray-500'}`}
                onClick={() => setSelectedTab('listings')}
              >
                Listings
              </button>
              <button
                className={`py-2 px-4 rounded-3xl ${selectedTab === 'reviews' ? 'bg-white text-black' : 'bg-[#1F1F1F] text-white outline outline-[1px] outline-gray-500'}`}
                onClick={() => setSelectedTab('reviews')}
              >
                Reviews
              </button> 
              <button
                className={`py-2 px-4 rounded-3xl ${selectedTab === 'favorites' ? 'bg-white text-black' : 'bg-[#1F1F1F] text-white outline outline-[1px] outline-gray-500'}`}
                onClick={() => setSelectedTab('favorites')}
              >
                Favorites
              </button> 
            </div>
          
          {/* Conditional content */}
          {/* grid grid-cols-2 sm:grid-cols-4 gap-2 w-full */}
            <section className='flex justify-center items-center w-full'>
            {selectedTab === 'listings' ? (
              <div className='pl-2 pr-2 w-full'>
                {listings.length > 0 ? (
                  <div className='grid grid-cols-2 sm:grid-cols-4 gap-2 w-full'>
                    {listings.map((product) => (
                      <Link to={`/product/${product._id}`} state={{ product }} key={product._id}>
                        <ProductCard product={product} />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-xl text-center font-bold text-darkgray mt-4">No listings found.</p>
                )}
              </div>
            ) : selectedTab === 'reviews' ? (
              <div>
                {reviews.length > 0 ? (
                  <div className='space-y-4'>
                    {reviews.map((review) => (
                      <div key={review._id} className='bg-white bg-opacity-5 p-4 rounded-xl'>
                        <p className='font-semibold'>{review.reviewer.firstName} {review.reviewer.lastName}</p>
                        <p>{review.reviewBody}</p>
                        <div className='flex'>
                          {Array.from({ length: review.starCount }).map((_, index) => (
                            <img key={index} src={star} alt="star" className='w-4 h-4 mr-1' />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xl text-center font-bold text-darkgray mt-4">No reviews found.</p>
                )}
              </div>
            ) : selectedTab === 'favorites' ? (
                <div className='pl-2 pr-2 w-full'>
                  {favorites.length > 0 ? (
                    <div className='grid grid-cols-2 sm:grid-cols-4 gap-2 w-full'>
                      {favorites.map((product) => (
                        <Link to={`/product/${product._id}`} state={{ product }} key={product._id}>
                          <ProductCard product={product} />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xl text-center font-bold text-darkgray mt-4">No listings found.</p>
                  )}
                </div>
            ) : null}
            </section>
          </div>
      </section>
    </div>
  );
};

export default Profile;