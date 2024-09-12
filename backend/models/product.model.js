import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    },
}, {
    timestamps: true // createdAt, updatedAt fields are written to each document
});

const Product = mongoose.model('Product', productSchema); // Creates a model from the schema

export default Product;