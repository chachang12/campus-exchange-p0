import messageModel from "../models/message.model.js";

export const createMessage = async(req, res) =>{
    const {chatId, senderId, text} = req.body

    const message = new messageModel({
        chatId, senderId, text
    });

    try
    {
        const response = await message.save()
        res.status(200).json(response);
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json(error);
    }
};

export const getMessages = async(req, res)=> {
    const { chatId } = req.params;

    try
    {
        const messages = await messageModel.find({chatId});
        res.status(200).json(messages);
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json(error);
    }
};

export const getMostRecentMessage = async(req, res)=> {
    const {chatId} = req.params;

    try
    {
        const message = await messageModel.find({chatId}).sort({$natural: -1}).limit(1);
        res.status(200).json(message[0]);
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json(error);
    }
};


export default { createMessage, getMessages, getMostRecentMessage }