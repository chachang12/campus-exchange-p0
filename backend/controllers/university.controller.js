import University from '../models/university.model.js';

export const getUniversities = async (req, res) => {
    try {
        const universities = await University.find();
        res.status(200).json({ success: true, data: universities });
    } catch (error) {
        console.error(`Error fetching universities: ${error.message}`);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};