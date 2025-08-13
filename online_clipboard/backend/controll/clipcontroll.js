const clips = require('../models/clipmodel');

function generateRandomKey() {
    return Math.floor(100000 + Math.random() * 900000); // Ensures 6 digits
}

const createClip = async (req, res) => {
    const { content } = req.body;



    const key = generateRandomKey();

    try {
        const newClip = await clips.create({ key: key, content, createdAt: new Date() });
        res.status(201).json({ message: 'Clip created successfully!', clip: newClip });
    } catch (error) {
        res.status(500).json({ message: 'Error creating clip', error: error.message });
    }
}

const getClip = async (req, res) => {
    const { key } = req.params;

    try {
        const clip = await clips.findOne({ key });
        if (!clip) {
            return res.status(404).json({ message: 'Clip not found' });
        }
        res.status(200).json({ clip });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching clip', error: error.message });
    }
}


module.exports = { createClip , getClip };