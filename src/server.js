// Importing dependecies
const express = require('express')
require('dotenv').config()

// Setting up app
const app = express()
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// Starting up server
const port = process.env.API_PORT || 3000
app.listen(port, () => {
    console.log(`🚀 - Servidor rodando em http://localhost:${port}`)
})

app.get('/', (req, res) => {
    res.send({message: 'API has been initialized'})
})