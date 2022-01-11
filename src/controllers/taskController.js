models = require('../database/models')

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