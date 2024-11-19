import Review from '../models/review.model.js';
import User from '../models/user.model.js';
import Product from '../models/product.model.js';

export const createReview = async (req, res) => {
    const { starCount, reviewBody, reviewer, reviewee, product } = req.body;

    if (!starCount || !reviewBody || !reviewer || !reviewee || !product) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        const newReview = new Review({
            starCount,
            reviewBody,
            reviewer,
            reviewee,
            product
        });

        const savedReview = await newReview.save();
        return res.status(201).json({ success: true, message: 'Review created successfully', data: savedReview });
    } catch (error) {
        console.error('Error creating review:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const getReviewsByUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const reviews = await Review.find({ reviewee: userId }).populate('reviewer').populate('product');
        return res.status(200).json({ success: true, data: reviews });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const getReviewsByProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        const reviews = await Review.find({ product: productId }).populate('reviewer').populate('reviewee');
        return res.status(200).json({ success: true, data: reviews });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};