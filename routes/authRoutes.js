// routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const router = express.Router();

// User Signup
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return res.status(400).json({ error: 'User already exists' });

        const newUser = await User.create({ name, email, password });
        res.json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// User Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ error: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;