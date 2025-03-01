const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const messageRoutes = require('./routes/messageRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/messages', messageRoutes);

// Connect to Database & Start Server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
    (async () => {
        try {
            await connectDB();
            app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
        } catch (error) {
            console.error('❌ Server startup failed due to database error:', error);
            process.exit(1); // Exit the process to prevent running without a database
        }
    })();
});
