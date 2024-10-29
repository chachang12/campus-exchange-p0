import chatModel from "../models/chat.model.js";

//createChat
//getUserChats
//findChat

export const createChat = async(req, res) => {
    const {firstId, secondId, productId} = req.body;

    try
    {
        const chat = await chatModel.findOne ({
            members: {$all: [firstId, secondId]}
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
    const {firstId, secondId} = req.params;

    try
    {
        const chat = await chatModel.findOne({
            members: {$all: [firstId, secondId]}
        })
        res.status(200).json(chat);
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json(error);
    }
};