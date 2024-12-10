import User from '../models/user.model.js'
import University from '../models/university.model.js'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

export const getCurrentUser = async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            res.json(req.user); // Send user data as JSON
        } else {
            res.status(401).json({ success: false, message: 'Unauthorized: User is not authenticated' });
        }
    } catch (error) {
        console.error('Error fetching current user:', error);
        res.status(500).json({ success: false, message: 'Server error: Unable to fetch current user', error: error.message });
    }
};

export const findUser = async(req, res) => {
    const userId = req.params.userId;
    try
    {
        const user = await User.findById(userId).populate('universityId');

        res.status(200).json(user);
    }
    catch
    {
        console.log(error);
        res.status(500).json(error);
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find().populate('universityId');
        res.status(200).json(users);
    }
    catch (error)
    {
        console.log(error);
        res.status(500).json(error);
    }
};

export const getUserById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid User ID' });
    }

    try {
        const user = await User.findById(id).populate('universityId').select('firstName lastName profilePicture review universityId');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error(`Error fetching user by ID: ${error.message}`);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const updateUserUniversity = async (req, res) => {
    const { id } = req.params;
    const { universityId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(universityId)) {
        return res.status(400).json({ success: false, message: 'Invalid User ID or University ID' });
    }

    try {
        const university = await University.findById(universityId);
        if (!university) {
            return res.status(404).json({ success: false, message: 'University not found' });
        }

        const user = await User.findByIdAndUpdate(id, { universityId }, { new: true }).populate('universityId');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error(`Error updating user university: ${error.message}`);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const addFavorite = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (!user.favorites.includes(productId)) {
            user.favorites.push(productId);
            await user.save();
        }

        res.status(200).json({ success: true, message: 'Product added to favorites' });
    } catch (error) {
        console.error('Error adding favorite:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Control Logic for Favorites

export const removeFavorite = async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        user.favorites = user.favorites.filter(fav => fav.toString() !== productId);
        await user.save();

        res.status(200).json({ success: true, message: 'Product removed from favorites' });
    } catch (error) {
        console.error('Error removing favorite:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const getFavorites = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).populate('favorites');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        console.log('Fetched favorites:', user.favorites); // Add this line to log the fetched favorites

        res.status(200).json({ success: true, data: user.favorites });
    } catch (error) {
        console.error('Error fetching favorites:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, profilePicture, review } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid User ID' });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { firstName, lastName, profilePicture, review },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        console.error(`Error updating user: ${error.message}`);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};