import User from '../models/user.model.js'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

// const createToken = (_id) => {
//     return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '30d' });
// }

// // Login a user
// export const loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.login(email, password);

//         // Create JWT token
//         const token = createToken(user._id);

//         return res.status(200).json({ success:true, data: user, token });
//     } catch (error) {
//         console.error(`Error in logging in user: ${error.message}`);
//         res.status(401).json({ success:false, message: 'Invalid Credentials' });
//     }
// }

// // Register a user

// export const registerUser = async (req, res) => {
//     const { email, password } = req.body;

//     try {    
//         const user = await User.register(email, password);

//         // Create JWT token
//         const token = createToken(user._id);

//         return res.status(201).json({ success:true, data: user, token });
//     } catch (error) {
//         console.error(`Error in registering user: ${error.message}`);
//         res.status(500).json({ success:false, message: 'Server Error' });
//     }
    

//     res.json({message: 'Register User'})
// }

export const getCurrentUser = async (req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.user); // Send user data as JSON
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};