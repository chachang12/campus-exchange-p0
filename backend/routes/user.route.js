import express from 'express';

// import { loginUser, registerUser, getCurrentUser } from '../controllers/user.controller.js';
import { getCurrentUser, findUser, getUsers, getUserById } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/current', getCurrentUser); 

router.get('/find/:userId', findUser);

router.get('/', getUsers);

router.get('/:id', getUserById);

export default router; // Exports the router so that it can be used in other files