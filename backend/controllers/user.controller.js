import User from '../models/user.model.js'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

export const getCurrentUser = async (req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.user); // Send user data as JSON
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

export const findUser = async(req, res) => {
    const userId = req.params.userId;
    try
    {
        const user = await User.findById(userId)

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
        const users = await User.find();
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
        const user = await User.findById(id).select('firstName lastName profilePicture rating');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error(`Error fetching user by ID: ${error.message}`);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};