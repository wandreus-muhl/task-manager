const express = require('express')
const router = express.Router()

const projectController = require('../controllers/projectController')
const taskController = require('../controllers/taskController')

// Projects routes
router.post('/project', projectController.newProject)
router.get('/project', projectController.listAllProjects)

// Tasks routes
router.get('/project/:projectId', taskController.listAllTasks)
router.get('/project/:projectId/task/:taskId', taskController.listATask)

module.exports = router