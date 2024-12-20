import express from 'express';
import { findUser, getUsers, getUserById, updateUserUniversity, addFavorite, removeFavorite, getFavorites,  } from '../controllers/user.controller.js';

const router = express.Router();

// router.get('/current', getCurrentUser); 
router.get('/find/:userId', findUser);
router.get('/getAllUsers', getUsers);
router.get('/:id', getUserById);
router.put('/:id/university', updateUserUniversity);
// router.put('/:id', updateUser); 
router.post('/favorites/add', addFavorite); 
router.post('/favorites/remove', removeFavorite);
router.get('/:userId/favorites', getFavorites);

export default router; // Exports the router so that it can be used in other files