// Importing dependecies
const express = require('express')
require('dotenv').config()

// Setting up app
const app = express()
app.use(express.json())
app.use(express.urlencoded({
	extended: true
}))

// Synchronizing database
const connection = require('./database/connection')
const models = require('./database/models')

connection.sync({
	force: false,
	logging: false
}).then(() => {
	console.log('📇 - Banco de dados sincronizado')
}).then(() => {
	// Starting up server
	const port = process.env.API_PORT || 3000
	app.listen(port, () => {
		console.log(`🚀 - Servidor rodando em http://localhost:${port} \n💻 - Adminer hospedado em http://localhost:8080`)
	})
})

// Importing routes
const router = require('./routes/routes')
app.use('/api', router)

app.get('/', (req, res) => {
	res.send({
		message: 'API has been initialized'
	})
})