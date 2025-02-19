// routes/taskRoutes.js
const express = require('express');
const { Task } = require('../models');
const router = express.Router();

// Get all tasks
router.get('/', async (req, res) => {
    const tasks = await Task.findAll();
    res.json(tasks);
});

// Add a task
router.post('/', async (req, res) => {
    const { userId, name } = req.body;
    const newTask = await Task.create({ userId, name, completed: false });
    res.json(newTask);
});

// Mark task as completed
router.put('/:id', async (req, res) => {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    task.completed = true;
    await task.save();
    res.json(task);
});

module.exports = router;
