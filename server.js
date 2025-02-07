const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let tasks = []; // In-memory storage for tasks
let messages = []; // In-memory storage for messages

// ==================== TASK ROUTES ====================

// Get all tasks
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// Add a task
app.post('/api/tasks', (req, res) => {
    const newTask = { id: tasks.length + 1, name: req.body.name, completed: false };
    tasks.push(newTask);
    res.json(newTask);
});

// Mark task as completed
app.put('/api/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = true;
        res.json(task);
    } else {
        res.status(404).json({ error: 'Task not found' });
    }
});

// ==================== MESSAGE ROUTES ====================

// Get all messages
app.get('/api/messages', (req, res) => {
    res.json(messages);
});

// Send a message
app.post('/api/messages', (req, res) => {
    const { partner, message } = req.body;
    if (!partner || !message.trim()) {
        return res.status(400).json({ error: 'Invalid message' });
    }

    const newMessage = { partner, message };
    messages.push(newMessage);
    res.json(newMessage);
});

// ==================== SERVER LISTENING ====================
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
