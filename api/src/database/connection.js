const Sequelize = require('sequelize')

require('dotenv').config()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_SERVICE,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT
})
module.exports = sequelize