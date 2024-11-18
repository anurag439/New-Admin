import express from 'express';
import ToDo from '../model/todo.js';
import authenticateToken from '../middleware/auth.js';
const router = express.Router();

router.get('/todo', authenticateToken, async (req, res) => {
    try {
        const todos = await ToDo.find({ admin: req.admin.id });
        res.render('todo', { todos });
    } catch (error) {
        console.error('Error fetching to-do list:', error);
        res.status(500).send('Server error');
    }
});

router.post('/todo', authenticateToken, async (req, res) => {
    const { task } = req.body;

    try {
        const newToDo = new ToDo({
            task,
            admin: req.admin.id
        });

        await newToDo.save();
        res.redirect('/todo');
    } catch (error) {
        console.error('Error adding task:', error);
        res.status(500).send('Server error');
    }
});

router.post('/todo/:id/complete', authenticateToken, async (req, res) => {
    try {
        await ToDo.findByIdAndUpdate(req.params.id, { completed: true });
        res.redirect('/todo');
    } catch (error) {
        console.error('Error completing task:', error);
        res.status(500).send('Server error');
    }
});

router.post('/todo/:id/delete', authenticateToken, async (req, res) => {
    try {
        await ToDo.findByIdAndDelete(req.params.id);
        res.redirect('/todo');
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).send('Server error');
    }
});
export default router;
