const express = require('express');
const { Message } = require('../models');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Get all messages (Protected)
router.get('/', authMiddleware, async (req, res) => {
    const messages = await Message.findAll({ where: { receiverId: req.user.id } });
    res.json(messages);
});

// Send a message (Protected)
router.post('/', authMiddleware, async (req, res) => {
    const { receiverId, taskId, message } = req.body;
    if (!receiverId || !message.trim()) {
        return res.status(400).json({ error: 'Invalid message data' });
    }

    const newMessage = await Message.create({ senderId: req.user.id, receiverId, taskId, message });
    res.json(newMessage);
});

module.exports = router;
