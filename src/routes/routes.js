const express = require('express')
const router = express.Router()

const projectController = require('../controllers/projectController')
const taskController = require('../controllers/taskController')

// Projects routes
router.post('/project', projectController.newProject)
router.get('/project', projectController.listAllProjects)

module.exports = router