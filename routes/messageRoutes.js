// routes/messageRoutes.js
const express = require('express');
const { Message } = require('../models');
const router = express.Router();

// Get all messages
router.get('/', async (req, res) => {
    const messages = await Message.findAll();
    res.json(messages);
});

// Send a message
router.post('/', async (req, res) => {
    const { senderId, receiverId, taskId, message } = req.body;
    if (!senderId || !receiverId || !message.trim()) {
        return res.status(400).json({ error: 'Invalid message data' });
    }

    const newMessage = await Message.create({ senderId, receiverId, taskId, message });
    res.json(newMessage);
});

module.exports = router;
