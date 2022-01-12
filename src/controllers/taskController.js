const models = require('../database/models')
const utils = require('../utils')

exports.newTask = async (req, res) => {
  try {
    // Validating entries
    const errors = []
    if (!req.body.title || req.body.title === '') {
      errors.push('Title cannot be empty')
    }
    if (!req.body.taskRelevance || req.body.taskRelevance === '') {
      errors.push('Task relevance cannot be empty')
    }
    if (parseInt(req.body.taskRelevance) < 0 || parseInt(req.body.taskRelevance) > 10) {
      errors.push('Relevance value must be between 0 and 10')
    }

    // Verifying if was errors
    if (errors.length !== 0) {
      return res.status(400).send({
        errors: errors
      })
    } else {
      req.body.projectId = req.params.projectId // Assigning the value of projectId passed in params as foreign key value
      req.body.completed = false // Making sure it's impossible to create a task that's already completed
      await models.Task.create(req.body).then(task => {
        res.status(201).send(task)
      })
    }
  } catch (error) {
    res.status(500).send({
      message: error.message
    })
  }
}

exports.listAllTasks = async (req, res) => {
  try {
    models.Project.findOne({
      where: {
        id: req.params.projectId
      },
      include: models.Task
    }).then(project => {
      if (!project || project.length === 0) {
        res.status(400).send({
          message: 'There is no project with this ID in database'
        })
      } else {
        res.status(200).send(project)
      }
    })
  } catch (error) {
    res.status(500).send({
      message: error.message
    })
  }
}

exports.listATask = async (req, res) => {
  try {
    models.Task.findOne({
      where: {
        id: req.params.taskId,
        projectId: req.params.projectId
      }
    }).then(task => {
      if (!task) {
        res.status(404).send({
          message: 'This project doesn`t contain a task with the given Id'
        })
      } else {
        res.status(200).send(task)
      }
    })
  } catch (error) {
    res.status(500).send({
      message: error.message
    })
  }
}

exports.updateTask = async (req, res) => {
  try {
    // Validating entries
    const errors = []
    if (req.body.title === '') {
      errors.push('Title cannot be empty')
    }
    if (parseInt(req.body.taskRelevance) < 0 || parseInt(req.body.taskRelevance) > 10) {
      errors.push('Relevance value must be between 0 and 10')
    }
    if (utils.objectIsEmpty(req.body)) {
      errors.push('Please provide the data you want to update')
    }
    if(typeof req.body.completed !== 'boolean') {
      errors.push('The "completed" field must be a boolean')
    }

    // Verifying if was errors
    if (errors.length !== 0) {
      return res.status(400).send({
        errors: errors
      })
    } else {
      delete req.body.id // Making sure the ID will not be updated
      delete req.body.projectId // Making sure the Project ID will not be updated

      models.Task.update(req.body, {
        where: {
          id: req.params.taskId,
          projectId: req.params.projectId
        }
      }).then(tasks => {
        if (tasks.includes(0)) {
          res.status(404).send({
            message: 'This project does not have any tasks with the given ID in the database'
          })
        } else {
          res.status(200).send({
            message: 'Task successfully updated'
          })
        }
      })
    }
  } catch (error) {
    res.status(500).send({
      message: error.message
    })
  }
}

exports.deleteTask = async (req, res) => {
  try {
    models.Task.destroy({
      where: {
        id: req.params.taskId,
        projectId: req.params.projectId
      }
    }).then(task => {
      if (!task) {
        res.status(404).send({
          message: 'This project doesn`t contain a task with the given Id'
        })
      } else {
        res.status(204).send({})
      }
    })
  } catch (error) {
    res.status(500).send({
      message: error.message
    })
  }
}