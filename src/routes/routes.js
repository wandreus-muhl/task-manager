const express = require('express')
const router = express.Router()

const projectController = require('../controllers/projectController')
const taskController = require('../controllers/taskController')

// Projects routes
router.post('/project', projectController.newProject)
router.get('/project', projectController.listAllProjects)

// Tasks routes
router.post('/project/:projectId/task', taskController.newTask)
router.get('/project/:projectId', taskController.listAllTasks)
router.get('/project/:projectId/task/:taskId', taskController.listATask)
router.delete('/project/:projectId/task/:taskId', taskController.deleteTask)

module.exports = router