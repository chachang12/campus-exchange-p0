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
    condition:{
        type: String,
        required: true
    },
    categories:{
        type: [String],
        required: true
    },
    creatorId:{
        type: String,
        required: true
    },
    isSold:{
        type: Boolean,
        default: false
    },
    description:{
        type: String,
        required: true
    },
    universityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'University',
        required: false
    }
}, {
    timestamps: true // createdAt, updatedAt fields are written to each document
});

const Product = mongoose.model('Product', productSchema); // Creates a model from the schema

export default Product;