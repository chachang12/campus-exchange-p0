import mongoose from "mongoose";

const universitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true
    }
}, {
    timestamps: true // createdAt, updatedAt fields are written to each document
});

const University = mongoose.model('University', universitySchema);

export default University;