models = require('../database/models')

exports.listAllTasks = async (req, res) => {
  try {
    models.Project.findOne({
      where: {
        id: req.params.id
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