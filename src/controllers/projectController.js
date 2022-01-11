models = require('../database/models')

exports.newProject = async (req, res) => {
  try {
    const errors = []
    // Validating entries
    if (!req.body.title || req.body.title.length === 0) {
      errors.push('Title cannot be empty')
    }
    if (!req.body.description || req.body.description.length === 0) {
      errors.push('Description cannot be empty')
    }

    if (errors.length !== 0) {
      res.status(400).send({
        errors: errors
      })
    } else {
      models.Project.create(req.body).then(project => {
        let aux = []
        if (req.body.tasks && req.body.tasks.length !== 0) {
          let tasks = req.body.tasks
          tasks.forEach(task => {
            task.projectId = project.id
            models.Task.create(task)
            aux.push(task)
          })
        }
        project.tasks = aux
        res.status(201).send(project)
      })
    }
  } catch (error) {
    res.status(500).send({
      message: error.message
    })
  }
}