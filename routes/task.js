const express = require('express');
const router = express.Router();

//accessing task controller
var taskController = require('../controllers/task_controller');

//routes
router.post('/create-task',taskController.createTask);
router.get('/delete/:id',taskController.deleteTask);
router.get('/delete',taskController.delete);


module.exports = router;