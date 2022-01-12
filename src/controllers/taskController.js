models = require('../database/models')

exports.newTask = async (req, res) => {
  try {
    // Validating entries
    const errors = []
    if (!req.body.title || req.body.title.length === 0) {
      errors.push('Title cannot be empty')
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