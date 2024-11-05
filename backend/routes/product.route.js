import express from 'express';
import { getProducts, createProduct, updateProduct, deleteProduct, getProductsByCreatorId } from '../controllers/product.controller.js';
import { ensureAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router(); // Initializes the express router

router.use(ensureAuthenticated); // Protects the routes below this line

router.get('/', getProducts);

router.post('/', createProduct);

router.put('/:id', updateProduct); // Handles the PUT request to update a product

router.delete('/:id', deleteProduct);

// Route to get all the listings of a specific creator
router.get('/creator/:creatorId', getProductsByCreatorId);

export default router;