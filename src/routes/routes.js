const express = require('express')
const router = express.Router()

const projectController = require('../controllers/projectController')
const taskController = require('../controllers/taskController')

// Projects routes
router.get('/project', projectController.listAllProjects)
router.post('/project', projectController.newProject)
router.put('/project/:projectId', projectController.updateProject)
router.delete('/project/:projectId', projectController.deleteProject)

// Tasks routes
router.get('/project/:projectId', taskController.listAllTasks)
router.get('/project/:projectId/task/:taskId', taskController.listATask)
router.post('/project/:projectId/task', taskController.newTask)
router.delete('/project/:projectId/task/:taskId', taskController.deleteTask)

module.exports = router