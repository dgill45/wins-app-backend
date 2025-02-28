const express = require('express');
const { Task } = require('../models');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Get all tasks (Protected)
router.get('/', authMiddleware, async (req, res) => {
    const tasks = await Task.findAll({ where: { userId: req.user.id } });
    res.json(tasks);
});

// Add a task (Protected)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { name } = req.body;
        const newTask = await Task.create({ userId: req.user.id, name, completed: false });
        res.json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Server error: ' + error.message });
    }
});


// Mark task as completed (Protected)
router.put('/:id', authMiddleware, async (req, res) => {
    const task = await Task.findByPk(req.params.id);
    if (!task || task.userId !== req.user.id) return res.status(404).json({ error: 'Task not found' });

    task.completed = true;
    await task.save();
    res.json(task);
});

module.exports = router;
