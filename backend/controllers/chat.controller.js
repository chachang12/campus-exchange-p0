import chatModel from "../models/chat.model.js";
import userModel from "../models/user.model.js";
import productModel from "../models/product.model.js";

//createChat
//getUserChats
//findChat

export const createChat = async(req, res) => {
    const {firstId, secondId, productId} = req.body;

    try
    {
        const chat = await chatModel.findOne ({
            members: {$all: [firstId, secondId]},
            productId: productId,
        })

        if(chat) return res.status(200).json(chat);

        const newChat = new chatModel({
            members: [firstId, secondId],
            productId: productId,
        });

        const response = await newChat.save()

        res.status(200).json(response);
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json(error);
    }
};

export const findUserChats = async(req, res) => {
    const userId = req.params.userId

    try
    {
        const chats = await chatModel.find({
            members: {$in: [userId]},
        })
        res.status(200).json(chats);
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json(error);
    }
};

export const findChat = async(req, res) => {
    const {firstId, secondId, productId} = req.params;

    try
    {
        const chat = await chatModel.findOne({
            members: {$all: [firstId, secondId]},
            productId: productId,
        })
        res.status(200).json(chat);
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json(error);
    }
};

export const deleteInvalidChats = async (req, res) => {
    try {
        const chats = await chatModel.find();

        for (const chat of chats) {
            const [firstId, secondId] = chat.members;
            const productId = chat.productId;

            const user1 = await userModel.findById(firstId);
            const user2 = await userModel.findById(secondId);
            const product = await productModel.findById(productId);

            if (!user1 || !user2 || !product) {
                await chatModel.deleteOne({ _id: chat._id });
                console.log(`Deleted chat ${chat._id} due to missing user/product`);
            }
        }

        res.status(200).json({ message: "Invalid chats deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};