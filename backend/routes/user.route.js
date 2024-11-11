import express from 'express';
import { getCurrentUser, findUser, getUsers, getUserById, updateUserUniversity, addFavorite, removeFavorite, getFavorites } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/current', getCurrentUser); 
router.get('/find/:userId', findUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id/university', updateUserUniversity); // Add route to update university
router.post('/favorites/add', addFavorite); // Add route to add favorite
router.post('/favorites/remove', removeFavorite); // Add route to remove favorite
router.get('/:userId/favorites', getFavorites); // Add route to get favorites

export default router; // Exports the router so that it can be used in other files