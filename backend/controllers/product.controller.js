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
    const product = req.body; // Retrieves the products from the request body (The user will send this data.)

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success:false, message: 'Please provide name, price and image' }); // Sends an error response if the user did not provide the required fields
    }

    const newProduct = new Product(product) // Creates a new product from the request body

    try {
        await newProduct.save(); // Saves the new product to the database
        return res.status(201).json({ success:true, data: newProduct }); // Sends a success response with the new product
    } catch (error) {
        console.error(`Error in creating products: ${error.message}`);
        res.status(500).json({ success:false, message: 'Server Error' }); // Sends an error response if the server encountered an error
    }
}

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