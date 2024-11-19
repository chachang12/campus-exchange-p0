import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createReview } from '../utils/fetchUtils';
import { useUser } from '../context/UserContext';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { FaRegStar, FaStar } from "react-icons/fa6";
import BackButton from '../components/Buttons/BackButton';
import { updateAverageReview } from '../utils/reviewUtils';

const ReviewCreationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, reviewee } = location.state || {};
  const [starCount, setStarCount] = useState(0);
  const [reviewBody, setReviewBody] = useState("");
  const { user } = useUser();

  const handleStarClick = (count) => {
    setStarCount(count);
  };

  const handleSubmit = async () => {
    if (!starCount || !reviewBody) {
      alert("Please provide a star rating and a review description.");
      return;
    }

    const reviewData = {
      starCount,
      reviewBody,
      reviewer: user._id,
      reviewee: reviewee._id,
      product: product._id,
    };

    try {
      const response = await createReview(reviewData);
      if (response.success) {
        alert("Review submitted successfully!");
        // Update the average rating for the reviewee
        await updateAverageReview(reviewee._id);
        navigate(`/product/${product._id}`);
      } else {
        alert(`Error: ${response.message}`);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert("An error occurred while submitting the review.");
    }
  };

  if (!product || !reviewee) {
    return <div>Product or user information is missing.</div>;
  }

  return (
    <div className="p-4 text-white">
      <div className="flex justify-between items-center mb-4">
        <BackButton />
        <h1 className="text-xl font-semibold">Write a Review</h1>
        <button onClick={handleSubmit} className="">Submit</button>
      </div>
      <h1 className='flex justify-center mb-4'>
        How was your experience with {reviewee.firstName} {reviewee.lastName}?
      </h1>
      <div className="mb-4">
        <div className='flex flex-col items-center justify-center'>
          <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
          <img src={product.image} alt={product.name} crossOrigin='anonymous' className="w-40 h-40 object-cover rounded-md" />
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Rating</h3>
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <button key={index} onClick={() => handleStarClick(index + 1)}>
              {starCount > index ? <FaStar size={30} /> : <FaRegStar size={30} />}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Review Description</h3>
        <textarea
          className="w-full p-4 border bg-inherit border-white border-opacity-50 rounded-md"
          placeholder="Write your review here..."
          value={reviewBody}
          onChange={(e) => setReviewBody(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ReviewCreationPage;