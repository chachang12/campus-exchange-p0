import express from 'express';
import { createReview, getReviewsByUser, getReviewsByProduct } from '../controllers/review.controller.js';

const router = express.Router();

router.post('/', createReview);
router.get('/user/:userId', getReviewsByUser);
router.get('/product/:productId', getReviewsByProduct);

export default router;