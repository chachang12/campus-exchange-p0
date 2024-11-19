import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    starCount: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    reviewBody: {
        type: String,
        required: true
    },
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reviewee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;