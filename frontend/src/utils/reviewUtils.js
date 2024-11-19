import { getReviewsByUser, updateUser } from './fetchUtils';

export const updateAverageReview = async (userId) => {
  try {
    // Fetch all reviews for the user
    const reviews = await getReviewsByUser(userId);

    if (reviews.length === 0) {
      console.log('No reviews found for this user.');
      return;
    }

    // Calculate the average review
    const totalReview = reviews.reduce((sum, review) => sum + review.starCount, 0);
    const averageReview = totalReview / reviews.length;

    console.log('Average review:', averageReview);

    // Update the user's review on the server
    const updatedUser = {
      _id: userId,
      review: averageReview,
    };

    const response = await updateUser(updatedUser);

    if (response.success) {
      console.log('User review updated successfully.');
    } else {
      console.error(`Error updating user review: ${response.message}`);
    }
  } catch (error) {
    console.error('Error updating average review:', error);
  }
};