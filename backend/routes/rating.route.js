import express from 'express';
import { createRating, getRatingsByUser, getRatingsByProduct } from '../controllers/rating.controller.js';

const router = express.Router();

router.post('/', createRating);
router.get('/user/:userId', getRatingsByUser); // Add this line
router.get('/product/:productId', getRatingsByProduct);

export default router;