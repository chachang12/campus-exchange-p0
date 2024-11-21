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

export const getMostRecentMessage = async (req, res) => {
    const { chatId } = req.params;

    try {
        const message = await messageModel.findOne({ chatId }).sort({ createdAt: -1 });

        if (!message) {
            return res.status(200).json({ success: true, data: null });
        }

        res.status(200).json({ success: true, data: message });
    } catch (error) {
        console.error(`Error fetching most recent message: ${error.message}`);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};


export default { createMessage, getMessages, getMostRecentMessage };