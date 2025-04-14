import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/task.js';

// Initialize Express app
const app = express();

// Enable CORS for cross-origin requests
app.use(cors());

// Parse incoming JSON request bodies
app.use(express.json());

// Mount task routes under the /api/tasks endpoint
app.use('/api/tasks', taskRoutes);

// Start the server on the specified port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});