import Product from '../models/product.model.js';
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}); // Retrieves all products from the database
        res.status(200).json({ success:true, data: products }); // Sends a success response with the products
    } catch (error) {
        console.error(`Error in getting product(s): ${error.message}`);
        res.status(500).json({ success:false, message: 'Server Error' }); // Sends an error response if the server encountered an error
    }

}

export const createProduct = async (req, res) => {
    const { name, price, image, condition, categories, creatorId } = req.body;
  
    if (!name || !price || !image || !condition || !creatorId) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
  
    try {
      const newProduct = new Product({
        name,
        price,
        image,
        condition,
        categories,
        creatorId,
      });
  
      const savedProduct = await newProduct.save();
      return res.status(201).json({ success: true, message: 'Product created successfully', data: savedProduct });
    } catch (error) {
      console.error('Error creating product:', error);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  };

export const updateProduct = async (req, res) => {
    const { id } = req.params; // Retrieves the product ID from the request parameters
    const product = req.body; // Retrieves the product details from the request body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success:false, message: 'Invalid Product ID' }); // Sends an error response if the product ID is invalid
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true}); // Updates the product in the database, and returns the updated product
        res.status(200).json({ success:true, data: updatedProduct }); // Sends a success response with the updated product
    } catch (error) {
        console.error(`Error in updating product: ${error.message}`);
        res.status(404).json({ success:false, message: 'Product not found' }); // Sends an error response if the product is not found
    }
}

export const deleteProduct = async (req, res) => {
    const {id} = req.params; // Retrieves the product ID from the request parameters

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success:false, message: 'Invalid Product ID' }); // Sends an error response if the product ID is invalid
    }

    try {
        await Product.findByIdAndDelete(id); // Deletes the product from the database
        res.status(200).json({ success:true, message: 'Product is deleted' }); // Sends a success response
    } catch (error) {
        console.log(`Error in deleting product: ${error.message}`);
        res.status(500).json({ success:false, message: 'Server error' }); // Sends an error response if there is a server error.
    }
}

export const getProductsByCreatorId = async (req, res) => {
    const { creatorId } = req.params;
    try {
      const products = await Product.find({ creatorId });
      res.status(200).json({ success: true, data: products });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  };