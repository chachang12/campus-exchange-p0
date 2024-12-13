import express from 'express';
import { getProducts, createProduct, updateProduct, deleteProduct, getProductsByCreatorId, getProductById } from '../controllers/product.controller.js';

const router = express.Router(); // Initializes the express router

router.get('/', getProducts);

router.post('/', createProduct);

router.put('/:id', updateProduct); // Handles the PUT request to update a product

router.delete('/:id', deleteProduct);

// Route to get all the listings of a specific creator
router.get('/creator/:creatorId', getProductsByCreatorId); // Add this line

// Route to get a product by ID
router.get('/:id', getProductById);

export default router;