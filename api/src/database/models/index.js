const {Sequelize} = require('sequelize')
const connection = require('../connection')

const database = {}
database.Sequelize = Sequelize
database.connection = connection

// Importing models
database.Project = require('./Project')(connection, Sequelize)
database.Task = require('./Task')(connection, Sequelize)

// Defining relations
database.Project.hasMany(database.Task)
database.Task.belongsTo(database.Project)

module.exports = database
