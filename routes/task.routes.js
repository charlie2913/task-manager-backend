const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

router.post('/', authenticateToken, taskController.createTask);
router.get('/', authenticateToken, taskController.getTasks);
router.get('/:id', authenticateToken, taskController.getTaskById);
router.put('/:id', authenticateToken, taskController.updateTask);
router.delete('/:id', authenticateToken, taskController.deleteTask);

module.exports = router;
