import Rating from '../models/rating.model.js';
import User from '../models/user.model.js';
import Product from '../models/product.model.js';

export const createRating = async (req, res) => {
    const { starCount, reviewBody, reviewer, reviewee, product } = req.body;

    if (!starCount || !reviewBody || !reviewer || !reviewee || !product) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        const newRating = new Rating({
            starCount,
            reviewBody,
            reviewer,
            reviewee,
            product
        });

        const savedRating = await newRating.save();
        return res.status(201).json({ success: true, message: 'Rating created successfully', data: savedRating });
    } catch (error) {
        console.error('Error creating rating:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const getRatingsByUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const ratings = await Rating.find({ reviewee: userId }).populate('reviewer').populate('product');
        return res.status(200).json({ success: true, data: ratings });
    } catch (error) {
        console.error('Error fetching ratings:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const getRatingsByProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        const ratings = await Rating.find({ product: productId }).populate('reviewer').populate('reviewee');
        return res.status(200).json({ success: true, data: ratings });
    } catch (error) {
        console.error('Error fetching ratings:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};