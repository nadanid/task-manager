import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

/**
 * @route GET /api/tasks
 * @description Retrieves a list of all tasks from the database, sorted by most recent.
 * @access Public
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>} Responds with an array of task objects or an error message.
 */
router.get('/', async (req, res) => {
    try {
        const tasks = await prisma.task.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        res.json(tasks);
    } catch (error) {
        console.error('Failed to fetch tasks:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * @route POST /api/tasks
 * @description Creates a new task in the database.
 * @access Public
 *
 * @param {Request} req - The Express request object containing `title` (required) and optional `completed` boolean.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>} Responds with the created task or an appropriate error message.
 *
 * @example Request Body:
 * {
 *   "title": "Buy groceries",
 *   "completed": false
 * }
 */
router.post('/', async (req, res) => {
    const { title, completed = false } = req.body;

    if (!title || typeof title !== 'string' || !title.trim()) {
        res.status(400).json({ error: 'Title is required and must be a non-empty string.' });
        return;
    }

    try {
        const newTask = await prisma.task.create({
            data: { title: title.trim(), completed },
        });

        res.status(201).json(newTask);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Failed to create task.' });
    }
});

/**
 * @route PUT /api/tasks/:id
 * @description Updates an existing task with a new title and/or completion status.
 * @access Public
 *
 * @param {Request} req - The Express request object containing task `id` as a URL param and `title`, `completed` in the body.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>} Responds with the updated task or an error message.
 *
 * @example Request Body:
 * {
 *   "title": "Updated task title",
 *   "completed": true
 * }
 */
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;

    try {
        const updated = await prisma.task.update({
            where: { id },
            data: { title, completed },
        });

        res.json(updated);
    } catch (err) {
        console.error('Update failed:', err);
        res.status(500).json({ error: 'Failed to update task' });
    }
});

/**
 * @route DELETE /api/tasks/:id
 * @description Deletes a task from the database by its ID.
 * @access Public
 *
 * @param {Request} req - The Express request object containing the task `id` in the URL params.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>} Responds with a success message and the deleted task, or an appropriate error message.
 *
 * @example Response:
 * {
 *   "message": "Task deleted",
 *   "task": {
 *     "id": "1234-5678",
 *     "title": "Sample Task",
 *     "completed": false,
 *     "createdAt": "2024-04-13T15:00:00.000Z"
 *   }
 * }
 */
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    if (!id || typeof id !== 'string') {
        res.status(400).json({ error: 'Invalid task ID' });
        return;
    }

    try {
        const deletedTask = await prisma.task.delete({
            where: { id },
        });

        res.status(200).json({ message: 'Task deleted', task: deletedTask });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;