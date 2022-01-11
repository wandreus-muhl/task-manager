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
    // Verifying if was errors
    if (errors.length !== 0) {
      res.status(400).send({
        errors: errors
      })
    } else {
      // Creating the project on database
      await models.Project.create(req.body).then(project => {
        let aux = []
        // Checking for tasks in request body
        if (req.body.tasks && req.body.tasks.length !== 0) {
          // If has, run all the array, creating one register for each task in it
          let tasks = req.body.tasks
          tasks.forEach(async task => {
            task.projectId = project.id
            await models.Task.create(task)
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

exports.listAllProjects = async (req, res) => {
  try {
    models.Project.findAll({
      include: models.Task
    }).then(projects => {
      if (!projects || projects.length === 0) {
        res.status(400).send({
          message: 'There is no projects in database'
        })
      } else {
        res.status(200).send(projects)
      }
    })
  } catch (error) {
    res.status(500).send({
      message: error.message
    })
  }
}
