import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    members: Array,
    productId: String,
}, {
    timestamps: true,
});

const chatModel = mongoose.model("Chat", chatSchema);

export default chatModel;