import express from 'express';
import { createRating, getRatingsByUser, getRatingsByProduct } from '../controllers/rating.controller.js';

const router = express.Router();

router.post('/', createRating);
router.get('/user/:userId', getRatingsByUser);
router.get('/product/:productId', getRatingsByProduct);

export default router;