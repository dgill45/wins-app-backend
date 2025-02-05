const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let tasks = []; // In-memory storage for now

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

app.listen(5000, () => {
  console.log('Backend running on http://localhost:5000');
});
