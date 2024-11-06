import express from 'express';
import { getCurrentUser, findUser, getUsers, getUserById, updateUserUniversity } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/current', getCurrentUser); 
router.get('/find/:userId', findUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id/university', updateUserUniversity); // Add route to update university

export default router; // Exports the router so that it can be used in other files