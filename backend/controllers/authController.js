// const axios = require('axios');
// const jwt = require('jsonwebtoken');
// const { promisify } = require('util');
// const oauth2Client = require('../utils/oauth2client');
// const catchAsync = require('./../utils/catchAsync');
// const AppError = require('./../utils/appError');
// const User = require('../models/userModel');

// const signToken = (id) => {
//     return jwt.sign({ id }, process.env.JWT_SECRET, {
//         expiresIn: process.env.JWT_TIMEOUT,
//     });
// };
// // Create and send Cookie ->
// const createSendToken = (user, statusCode, res) => {
//     const token = signToken(user.id);

//     console.log(process.env.JWT_COOKIE_EXPIRES_IN);
//     const cookieOptions = {
//         expires: new Date(Date.now() + +process.env.JWT_COOKIE_EXPIRES_IN),
//         httpOnly: true,
//         path: '/',
//         // sameSite: "none",
//         secure: false,
//     };
//     if (process.env.NODE_ENV === 'production') {
//         cookieOptions.secure = true;
//         cookieOptions.sameSite = 'none';
//     }

//     user.password = undefined;

//     res.cookie('jwt', token, cookieOptions);

//     console.log(user);

//     res.status(statusCode).json({
//         message: 'success',
//         token,
//         data: {
//             user,
//         },
//     });
// };
// /* GET Google Authentication API. */
// exports.googleAuth = catchAsync(async (req, res, next) => {
//     const code = req.query.code;
//     console.log("USER CREDENTIAL -> ", code);

//     const googleRes = await oauth2Client.oauth2Client.getToken(code);
    
//     oauth2Client.oauth2Client.setCredentials(googleRes.tokens);

//     const userRes = await axios.get(
//         `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
// 	);
	
//     let user = await User.findOne({ email: userRes.data.email });
   
//     if (!user) {
//         console.log('New User found');
//         user = await User.create({
//             name: userRes.data.name,
//             email: userRes.data.email,
//             image: userRes.data.picture,
//         });
//     }

//     createSendToken(user, 201, res);
// });

// backend/controllers/authController.js
import { oauth2Client } from '../utils/oauth2client.js';
import axios from 'axios';

export const googleAuth = async (req, res) => {
    const { code } = req.query;

    try {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                Authorization: `Bearer ${tokens.access_token}`,
            },
        });

        const user = response.data;

        // Here you can handle user data, e.g., save it to the database or create a session
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};