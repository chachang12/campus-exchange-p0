import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById, getProductsByCreatorId, getReviewsByUser } from '../utils/fetchUtils';
import { IoPersonCircleOutline } from 'react-icons/io5';
import ProductCard from '../components/ProductCard';
import { star } from '../assets';
import { Logo } from '../components/icons';
import RatingStars from '../components/RatingStars';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowRight } from "react-icons/md";

const OtherUserProfilePage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [listings, setListings] = useState([]);
  const [reviews, setReviews] = useState([]);
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

    const fetchReviews = async () => {
      try {
        const response = await getReviewsByUser(userId);
        setReviews(response || []);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchUser();
    fetchListings();
    fetchReviews();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const flooredReview = Math.floor(user.review);

  return (
    <div className='mx-2 text-white flex flex-col'>
      <section className='flex justify-center'>
        <div className='w-full sm:w-[1280px]'>
          <section className='bg-[#121212]'>
            <div className='flex justify-between space-x-8 mt-2'>
              <h1 className='text-xl '>
                Profile
              </h1>
              
            </div>
          </section>
          <div className='flex flex-row items-center justify-center md:justify-start pl-2 py-4'>            {user.profilePicture ? (
              <img crossOrigin="anonymous" src={user.profilePicture} alt="Profile" className='w-[120px] h-[120px] object-cover object-center rounded-full outline outline-[1px] outline-gray-500' />
            ) : (
              <IoPersonCircleOutline size={150} />
            )}
            <div className='flex-col ml-4'>
              <h1 className='text-white font-semibold text-xl sm:text-2xl'>{user.firstName}</h1>
              <div className='flex'>
                <RatingStars rating={Math.floor(user.rating)} />
              </div>
              <div className='flex flex-row pt-1'>
                <h4 className=''>{listings.length}</h4>
                <h4 className='font-light ml-1'> listings</h4>
              </div>
            </div>
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
          </div>

          {/* Conditional content */}
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
            ) : (
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
            )}
          </section>
        </div>
      </section>
    </div>
  );
};

export default OtherUserProfilePage;