import express from 'express';

import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js';

import { requireAuth } from '../middleware/requireAuth.js';

const router = express.Router(); // Initializes the express router

// An express router allows us to define all of the endpoints for product routes in this file.

router.use(requireAuth);

router.get('/', getProducts);

router.post('/', createProduct);

router.put('/:id', updateProduct); // Handles the PUT request to update a product

router.delete('/:id', deleteProduct);

export default router;